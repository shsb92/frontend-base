export interface PageComponent {
    /** Optional method to clean up resources (event listeners, etc.) when navigating away */
    dispose?(): void;
    /** Optional method called after the component is rendered/mounted */
    // mount?(): void; // Add if your components need an explicit mount step
    // Add other methods/properties if your components share a common interface
  }
  