import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/app/router';
import { AppProviders } from '@/app/providers';
import '@/app/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root DOM element #root not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
