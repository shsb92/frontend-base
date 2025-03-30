// src/router/router.ts

import type {
  PageComponent
} from "@interfaces/page"
// Import interfaces
import type {
  RouterSubscriber,
  RouteOptions,
} from '@interfaces/router';
// Import route definitions
import {
  Routes,
  DefaultRoute,
  DefaultLoggedInRoute, 
  DefaultLoggedOutRoute,
} from '@/utils/router/routes';

// --- State Variables ---
let currentPage: PageComponent | null = null;
const subscribers: RouterSubscriber[] = [];
let isAuthenticated = true; // Add authentication state

// --- Helper Functions ---
/** Notifies all subscribers about the current page component and title. */
const notifySubscribers = (
  pageComponent: PageComponent | null,
  title: string,
): void => {
  subscribers.forEach(subscriber => {
    try {
      subscriber(pageComponent, title);
    } catch (error) {
      console.error('Router subscriber failed:', error);
    }
  });
};

/** Allows components to subscribe to router changes. Returns an unsubscribe function. */
const subscribe = (callback: RouterSubscriber): (() => void) => {
  if (typeof callback !== 'function') {
    console.error('Invalid subscriber added to router.');
    return () => {}; // Return no-op function
  }
  subscribers.push(callback);
  // Return an unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

/** Checks URL parameters for a 'token' and sets it in cookies if found. */
const handleURLToken = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');

  if (tokenFromUrl && typeof tokenFromUrl === 'string' && tokenFromUrl.trim() !== '') {

    // Clean the token from the URL
    urlParams.delete('token');
    const remainingURLParams = urlParams.toString();
    const newSearch = remainingURLParams ? `?${remainingURLParams}` : '';
    const newUrl = `${window.location.pathname}${newSearch}${window.location.hash}`; // Keep hash

    // Update URL without reloading page
    window.history.replaceState(window.history.state, '', newUrl);
  }
};

/** Resolves the final route path based on authentication status and requested path */
const resolveRoute = (path: string): string => {
  const requestedPath = path === '/' || path === '' ? DefaultRoute : path;
  
  const route = Routes[requestedPath];
  if (!route || path === '/404') return '/404';
  
  if (route.needsLogin && !isAuthenticated) {
    return DefaultLoggedOutRoute;
  }
  
  if (!route.needsLogin && isAuthenticated) {
    return DefaultLoggedInRoute;
  }
  
  return requestedPath;
};


/** Main router function: resolves route, fetches data, loads component, notifies subs. */
const router = async (): Promise<void> => {
  if (typeof window === 'undefined') return;

  handleURLToken();

  const currentPath = window.location.pathname;
  const targetRouteName = resolveRoute(currentPath); 

  if (targetRouteName !== currentPath) {
    console.log(`Redirecting from ${currentPath} to ${targetRouteName}`);
    await route(targetRouteName, { replace: true });
    return;
  }

  if (currentPage?.dispose) {
    try {
      currentPage.dispose();
    } catch (error) {
      console.error('Error disposing previous page:', error);
    }
  }
  currentPage = null; // Reset current page

   const routeDefinition = Routes[targetRouteName.toLowerCase()] ?? Routes['/404'];

  let pageInstance: PageComponent | null = null;
  let title = routeDefinition.title;

  try {
    const ViewModule = await routeDefinition.view();
    const ViewClass = ViewModule.default; 
    if (typeof ViewClass === 'function') {
        pageInstance = new ViewClass(); 
        currentPage = pageInstance;
    } else {
        throw new Error(`Module for route ${targetRouteName} does not have a default export class.`);
    }

  } catch (error) {
    console.error(`Failed to load page component for ${targetRouteName}:`, error);
    try {
        const NotFoundModule = await Routes['/404'].view();
        const NotFoundClass = NotFoundModule.default;
        if (typeof NotFoundClass === 'function') {
            pageInstance = new NotFoundClass();
            currentPage = pageInstance;
            title = Routes['/404'].title;
        } else {
             console.error('Failed to load even the 404 page component.');
        }

    } catch (notFoundError) {
        console.error('Critical error: Failed to load 404 page component:', notFoundError);
        document.body.innerHTML = '<h1>Error loading page</h1>';
    }
  }

  document.title = title;

  notifySubscribers(pageInstance, title);
};

// --- Public Navigation Function ---
const route = async (
  url: string | URL,
  options: RouteOptions = {},
): Promise<void> => {
  if (typeof window === 'undefined') return;

  const urlString = url instanceof URL ? url.toString() : url;
  const urlObj = new URL(urlString, window.location.origin);

  if (
    urlObj.pathname === window.location.pathname &&
    urlObj.search === window.location.search &&
    !options.replace
  ) {
    console.log('Navigation skipped, URL is the same:', urlString);
    return;
  }

  const historyMethod = options.replace ? 'replaceState' : 'pushState';
  const state = options.state ?? { route: urlObj.pathname }; // Default state

  window.history[historyMethod](state, '', urlObj.toString());

  await router();
};

// --- Initialization ---
// Listen for back/forward navigation
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', (event) => {
    console.log('popstate event triggered', event.state);
    router(); // Re-run the router logic when history changes
  });

  // Initial route handling on page load
  document.addEventListener('DOMContentLoaded', () => {
     console.log('DOM Loaded, running initial router.');
      router();
  });
}

// --- Exports ---
export { route, subscribe };
