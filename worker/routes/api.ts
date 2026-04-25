import { Hono } from 'hono';
import { submitContact } from '../services/contact';
import { getContactApiSpec } from '../services/openapi';

export const apiRoutes = new Hono();

apiRoutes.post('/send', async c => {
  try {
    const body = await c.req.json();
    const response = await submitContact(body);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

apiRoutes.get('/health', c => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
  return c.json(health);
});

apiRoutes.get('/send/spec.json', c => {
  const spec = getContactApiSpec();

  return c.json(spec, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  });
});
