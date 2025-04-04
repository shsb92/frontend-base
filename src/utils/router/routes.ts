import type { RoutesMap } from '@interfaces/router';

/**
 * Defines the application routes.
 * Keys are the route paths, values are RouteDefinition objects.
 */
export const Routes: RoutesMap = {
  '/login': {
    title: 'Login',
    view: () => import('@pages/login'),
    needsLogin: false, 
  },
  '/home': { 
    title: 'Home', 
    view: () => import('@pages/home'),
    needsLogin: true, 
  },
  '/404': {
    title: 'Page Not Found',
    view: () => import('@pages/404'),
    needsLogin: false,
  },
  
};

// Define default routes
export const DefaultRoute = '/home';
export const DefaultLoggedInRoute = '/home';
export const DefaultLoggedOutRoute = '/login';
