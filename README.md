# Frontend Base Project

This project serves as a foundational setup for modern frontend applications using Vite, TypeScript, Tailwind CSS, and a custom router implementation.

## Features

*   **Vite:** Fast development server with Hot Module Replacement and optimized production builds.
*   **TypeScript:** For static typing and improved code quality.
*   **Tailwind CSS:** Utility-first CSS framework.
*   **Custom Router:** Lightweight client-side routing implementation.
*   **DOM Utilities:** Custom DOM manipulation utilities for better TypeScript support.
*   **API Client:** Type-safe API client with error handling and timeout support.

## Directory Structure

```
frontend-base/
├── dist/                   # Build output directory (generated)
├── node_modules/           # Project dependencies
├── public/                 # Static assets directory
│   └── index.html          # HTML template
├── src/
│   ├── api/               # API client and endpoints
│   │   ├── _api.ts        # Core API implementation
│   │   ├── index.ts       # API exports
│   │   └── sample.ts      # Sample API endpoints
│   ├── interfaces/        # TypeScript interfaces
│   │   ├── api.ts         # API related interfaces
│   │   ├── page.ts        # Page component interfaces
│   │   └── router.ts      # Router interfaces
│   ├── pages/             # Page components
│   │   ├── home/          # Home page
│   │   ├── login/         # Login page
│   │   └── 404/           # 404 page
│   ├── utils/             # Utility functions
│   │   ├── domElement/    # DOM manipulation utilities
│   │   └── router/        # Router implementation
│   ├── test/              # Test setup and utilities
│   └── index.ts           # Application entry point
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata and dependencies
├── pnpm-lock.yaml         # PNPM lock file
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

In the project directory, you can run:

*   `pnpm dev`
    Starts the development server.
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
    The page will reload if you make edits.

*   `pnpm build`
    Builds the app for production to the `dist` folder.

*   `pnpm preview`
    Locally preview the production build.

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://your-api-url
```

## API Client Usage

```typescript
import { api } from '@/api';

// GET request
const response = await api.get('/endpoint');

// POST request with data
const response = await api.post('/endpoint', { data: 'value' });

// FormData upload
const formData = new FormData();
formData.append('file', file);
const response = await api.formData('/upload', formData);
```

## Router Usage

```typescript
import { route } from '@/utils/router';

// Navigate to a route
route('/home');

// Create a page component
const MyPage: PageComponent = {
  render: async () => {
    // Return DOM element
  },
  destroy: () => {
    // Cleanup
  }
};
```

## DOM Utilities

```typescript
import { DOMElement } from '@/utils/domElement';

const element = new DOMElement(document.createElement('div'))
  .setClass('my-class')
  .setId('my-id')
  .setTextContent('Hello World');
```
