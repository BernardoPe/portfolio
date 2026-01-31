# Portfolio Website

My portfolio website built with React, TypeScript, and Tailwind CSS. Deployed on Cloudflare Pages for fast, reliable hosting.

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **Deployment**: Cloudflare Pages

## Getting Started

```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
```

View the live site [here](https://bernardope.com).

## AI Chat Agent

The project uses Cloudflare Workers and the Cloudflare Agents API to run conversational AI logic about my portfolio, allowing users to interact with an AI assistant that can answer questions about my work and projects.

Entry file: see [worker/index.ts](./worker/index.ts). It registers MCP servers and initializes the Chat agent.

The implementation was partially taken from [Cloudflare Agents Starter](https://github.com/cloudflare/agents-starter).
