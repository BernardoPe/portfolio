# Copilot Instructions for TypeScript Coding Conventions

This document outlines the coding conventions and best practices for this React + TypeScript + Tailwind CSS portfolio website project.

## TypeScript Conventions

- Use TypeScript strict mode enabled in `tsconfig.json`.
- Prefer `interface` over `type` for object shapes.
- Use `const` for variables that don't change, `let` for those that do. Avoid `var`.
- Use arrow functions for callbacks and anonymous functions.
- Use type annotations for function parameters and return types where not inferred.
- Avoid `any`; use `unknown` if the type is truly unknown.
- Use union types for variables that can have multiple types.
- Use optional properties with `?` for optional object properties.
- Use `as const` for literal types to make them readonly.
- Functional Components: Use functional components. Define props interface and use `React.FC<Props>` or destructured props with type annotation `({ prop }: Props) => ...`.

## Naming Conventions

- Components: PascalCase (e.g., `PortfolioSection`)
- Variables and functions: camelCase (e.g., `userName`, `handleClick`)
- Types and interfaces: PascalCase (e.g., `UserProfile`)
- Files: PascalCase for components (e.g., `Header.tsx`), camelCase for utilities (e.g., `utils.ts`)
- CSS classes: kebab-case (e.g., `portfolio-section`)

## File Structure

- `src/components/`: Reusable components
- `src/pages/`: Page components
- `src/hooks/`: Custom hooks
- `src/utils/`: Utility functions
- `src/types/`: Type definitions
- `src/assets/`: Images, icons, etc.

## React Best Practices

- Use functional components with hooks.
- Use `useState` for local state, `useContext` for global state.
- Avoid prop drilling; use context or state management if needed.
- Use `useEffect` sparingly; prefer derived state.
- Memoize expensive computations with `useMemo`.
- Optimize re-renders with `React.memo` or `useCallback` if necessary.
- Components should be declared using function methods, not arrow functions.

## Tailwind CSS

- Use utility-first approach.
- Create custom classes in `src/index.css` if needed.
- Use responsive prefixes (`sm:`, `md:`, `lg:`) for mobile-first design.
- Group related utilities with square brackets for arbitrary values.
- Use variants separately from components for better readability.

## Imports

- Use absolute imports from `src/` (configure in `vite.config.ts` or `tsconfig`).
- Group imports: React, third-party libraries, local components/utilities.
- Use barrel exports (`index.ts`) for cleaner imports.

## Error Handling

- Use try-catch for async operations.
- Handle loading and error states in components.
- Use TypeScript's non-null assertion (`!`) sparingly.

## Performance

- Lazy load components with `React.lazy`.
- Use `React.Suspense` for loading fallbacks.
- Optimize images and assets.

## Deployment

- Build with `npm run build` for production.
- Deploy to Cloudflare Pages.
- Use environment variables for sensitive data.

## Project Overview

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **Deployment**: Cloudflare Pages
- **Package Manager**: npm

## General Coding Conventions

- **Naming**:
  - Components: PascalCase (e.g., `HeroSection.tsx`)
  - Hooks: camelCase with `use` prefix (e.g., `useScroll.ts`)
  - Utils: camelCase (e.g., `formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE
- **Exports**: Use named exports for components and utilities to ensure consistent naming on import.
- **Comments**: Write TSDoc comments for complex functions and types. Comments should explain why/how, not what and only be used for complex logic.
- **Format**: Use Prettier for consistent code formatting. Configure Prettier to work with TypeScript and Tailwind CSS. Line length should be max 120 characters. Use 2 spaces for indentation. If a tailwind class list exceeds 120 characters, break it into multiple lines for readability.

## Initial Project Structure

The project usually follows the standard Vite + Cloudflare Pages structure:

```
 public/              # Static assets (favicon, robots.txt)
 src/
    assets/          # Imported assets (images, fonts)
    components/      # Reusable UI components
       ui/          # Basic UI elements (buttons, inputs)
       layout/      # Layout components (Header, Footer)
    pages/           # Page components (if using routing)
    hooks/           # Custom React hooks
    utils/           # Helper functions
    types/           # Shared TypeScript interfaces/types
    App.tsx          # Main application component
    main.tsx         # Entry point
    index.css        # Global styles and Tailwind directives
 functions/           # Cloudflare Pages Functions (backend logic)
 vite.config.ts       # Vite configuration
 tailwind.config.js   # Tailwind configuration
 tsconfig.json        # TypeScript configuration
 package.json         # Dependencies and scripts (c3-generated)
 wrangler.toml        # Cloudflare configuration
```

## Deployment

- Deployment target is **Cloudflare Pages**.
- Ensure `wrangler.toml` is configured correctly.
- Build command: `npm run build`
- Output directory: `dist`
