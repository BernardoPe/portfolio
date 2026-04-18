import React from 'react';
import { withBasePath } from '../utils/routing';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-primary text-white p-6 pt-28">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 — Not Found</h1>
        <p className="mb-6 color-secondary">The page you requested does not exist.</p>
        <a
          href={withBasePath('/')}
          className="inline-block bg-[#f48120] hover:opacity-90 color-primary rounded-lg px-6 py-3 text-base font-medium transition-opacity duration-200"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
