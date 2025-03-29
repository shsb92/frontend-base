# Frontend Base Project

This project serves as a foundational setup for modern frontend applications using Webpack, TypeScript, Tailwind CSS, and an Express server for SPA routing.

## Features

*   **Webpack 5:** Configured for development (`webpack-dev-server` with Hot Module Replacement) and production builds.
*   **TypeScript:** For static typing and improved code quality.
*   **Tailwind CSS:** Utility-first CSS framework configured via PostCSS.
*   **Express Server:** Simple Node.js server to serve the built application and handle Single Page Application (SPA) routing (redirects all non-asset requests to `index.html`).
*   **Basic Structure:** Clear separation of source code (`src`), static assets (`public`), and build output (`dist`).

## Directory Structure

```
frontend-base/
├── dist/                   # Build output directory (generated)
├── node_modules/           # Project dependencies (managed by npm)
├── public/                 # Static assets directory
│   └── index.html          # HTML template used by Webpack
├── src/
│   ├── components/         # Reusable UI components
│   ├── interfaces/         # TypeScript interfaces and types
│   ├── pages/              # Page components and views
│   ├── router/             # Routing configuration and setup
│   ├── states/             # State management (e.g., Redux, Context)
│   ├── styles/             # Global styles and CSS modules
│   ├── utils/              # Utility functions and helpers
│   └── index.ts            # Main TypeScript entry point
├── .gitignore              # Specifies intentionally untracked files
├── LICENSE                 # Project license
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Exact dependency versions
├── postcss.config.mjs      # PostCSS configuration (for Tailwind)
├── server.js               # Express server for SPA routing
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript compiler options
└── webpack.config.js       # Webpack configuration
```

## Available Scripts

In the project directory, you can run:

*   `npm run dev`
    Starts the development server using `webpack serve`.
    Open [http://localhost:3000](http://localhost:3000) (or the configured port) to view it in the browser.
    The page will reload if you make edits.

*   `npm run build`
    Builds the app for production to the `dist` folder.
    It correctly bundles your code in production mode and optimizes the build for the best performance.

*   `npm start`
    Runs the Express server (`server.js`) to serve the production build from the `dist` folder.
    Make sure to run `npm run build` before running this script.
    The server typically runs on [http://localhost:8080](http://localhost:8080) (or the port specified by the `PORT` environment variable).

## Getting Started

1.  Clone the repository (if applicable).
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
