import { Hono } from 'hono';
import { env } from 'cloudflare:workers';
import { submitContact } from '../services/contact';
import { getContactApiSpec } from '../services/openapi';
import { checkRateLimit } from '../services/ratelimit';

export const apiRoutes = new Hono();

export const chatRule = {
  key: 'chat',
  windowMs: 60 * 60 * 1000,
  maxRequests: 10,
};

export const contactRule = {
  key: 'contact',
  windowMs: 60 * 60 * 1000,
  maxRequests: 3,
};

apiRoutes.get('/quota', async (c) => {
  const identifier = c.req.header('cf-connecting-ip') || 'unknown';
  const status = await checkRateLimit(env.RateLimiter, identifier, chatRule, false);
  return c.json({
    allowed: status.allowed,
    limit: status.limit,
    remaining: status.remaining,
    resetTime: status.resetTime,
    retryAfter: status.retryAfter,
  });
});

apiRoutes.post('/send', async (c) => {
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

apiRoutes.get('/health', (c) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
  return c.json(health);
});

apiRoutes.get('/send/spec.json', (c) => {
  const spec = getContactApiSpec();

  return c.json(spec, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  });
});
