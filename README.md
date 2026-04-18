# Portfolio Website

My portfolio website built with Next.js, TypeScript, and Tailwind CSS. It is deployed to Cloudflare Workers with static export assets.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons/UI**: Lucide React + custom components
- **AI Chat**: Cloudflare Agents + `@cloudflare/ai-chat/react` + AI SDK
- **Markdown Rendering**: marked + streamdown
- **Deployment Runtime**: Cloudflare Workers

## Getting Started

```bash
npm install
npm run dev      # Start development server
npm run build    # Build + export static site to out/
npm run preview  # Build + run with Wrangler locally
```

View the live site [here](https://bernardope.com).

## Deployment

This project deploys the static Next.js export with Wrangler:

```bash
npm run deploy   # next build (static export) + wrangler deploy
```

GitHub Actions workflow: see [.github/workflows/deploy.yml](./.github/workflows/deploy.yml).

## AI Chat Agent

The project uses Cloudflare Workers + Cloudflare Agents API to run conversational AI logic about my portfolio.
Users can ask about my background, experience, projects, and skills from the site.

Worker entry file: [worker/entry.ts](./worker/entry.ts).
Chat agent implementation: [worker/chat.ts](./worker/chat.ts).

The implementation was partially taken from [Cloudflare Agents Starter](https://github.com/cloudflare/agents-starter).
