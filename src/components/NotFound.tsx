import React from 'react';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 — Not Found</h1>
        <p className="mb-6 color-secondary">The page you requested does not exist.</p>
        <a
          href="/"
          className="inline-block bg-blue-900 hover:bg-blue-800 color-primary rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
