import { Hono } from 'hono';
import { routeAgentRequest } from 'agents';
import { apiRoutes } from './routes/api';
import { wellKnownRoutes } from './routes/well-known';
import { maybeConvertHtmlToMarkdown } from './utils/markdown';
import { env } from 'cloudflare:workers';
import { registerMiddlewares } from './middlewares';

export { Chat } from './services/chat/chat';
export { RateLimiterDO as RateLimiter } from './services/ratelimit';

const app = new Hono();

registerMiddlewares(app);

app.route('/.well-known', wellKnownRoutes);
app.route('/api', apiRoutes);

app.all('*', async c => {
  const request = c.req.raw;

  const agentResponse = await routeAgentRequest(request, env);
  if (agentResponse) {
    return await maybeConvertHtmlToMarkdown(request, agentResponse, env);
  }

  const assetResponse = await env.ASSETS.fetch(request);
  return await maybeConvertHtmlToMarkdown(request, assetResponse, env);
});

export default app;
