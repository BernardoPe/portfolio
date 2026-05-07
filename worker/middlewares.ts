import type { Hono, Context, Next } from 'hono';
import { env } from 'cloudflare:workers';
import { type Rule, checkRateLimit } from './services/ratelimit';
import { contactRule } from './routes/api';

export const rateLimiterMiddleware = (rule: Rule) => {
  return async (c: Context, next: Next) => {
    const identifier = c.req.header('cf-connecting-ip') || 'unknown';

    const status = await checkRateLimit(env.RateLimiter, identifier, rule);

    c.header('X-RateLimit-Limit', status.limit.toString());
    c.header('X-RateLimit-Remaining', status.remaining.toString());
    c.header('X-RateLimit-Reset', Math.ceil(status.resetTime / 1000).toString());

    if (!status.allowed) {
      c.header('Retry-After', status.retryAfter.toString());
      return c.json({ error: 'Rate limit exceeded. Please try again later.' }, 429);
    }

    await next();
  };
};

export const registerMiddlewares = (app: Hono) => {
  app.use('/api/send', rateLimiterMiddleware(contactRule));
};
