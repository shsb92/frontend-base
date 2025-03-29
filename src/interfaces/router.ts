// src/interfaces/router.ts
import { PageComponent } from "@interfaces/page";


/**
 * Interface that page components loaded by the router must implement.
 */


/**
 * Interface for the module dynamically imported by the router.
 * Expects a default export which is a constructor for a PageComponent.
 */
export interface PageComponentModule {
  default: new (...args: any[]) => PageComponent; // Constructor signature
}

/**
 * Defines the structure for a single route definition.
 */
export interface RouteDefinition {
  /** Function that dynamically imports the page component module. */
  view: () => Promise<PageComponentModule>;
  /** Title for the document/browser tab. */
  title: string;
  /** Does this route require the user to be logged in? */
  needsLogin?: boolean;
  /** Does this route require the user to be an admin? (Implies needsLogin) */
  needsAdmin?: boolean;
}

/**
 * Type definition for the map of route paths to their definitions.
 */
export type RoutesMap = {
  [path: string]: RouteDefinition;
};

/**
 * Type definition for the callback function used by subscribers.
 */
export type RouterSubscriber = (
  pageComponent: PageComponent | null,
  title: string
) => void;

/**
 * Type definition for the options passed to the public `route` function.
 */
export interface RouteOptions {
  /** If true, replaces the current history entry instead of pushing a new one. */
  replace?: boolean;
  /** Optional state object to associate with the history entry. */
  state?: any;
} 