import { Hono } from 'hono';
import { routeAgentRequest } from 'agents';
import { apiRoutes } from './routes/api';
import { wellKnownRoutes } from './routes/well-known';
import { maybeConvertHtmlToMarkdown } from './utils/markdown';
import { env } from 'cloudflare:workers';

export { Chat } from './services/chat/chat';

const app = new Hono();

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
