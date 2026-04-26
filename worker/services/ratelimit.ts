import { DurableObject } from 'cloudflare:workers';

export type Rule = {
  key: string;
  windowMs: number;
  maxRequests: number;
};

export type Data = {
  count: number;
  prevCount: number;
  windowStart: number;
};

export type RatelimitResponse = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter: number;
};

export async function checkRateLimit(
  namespace: DurableObjectNamespace<RateLimiterDO>,
  identifier: string,
  rule: Rule,
  increment: boolean = true
): Promise<RatelimitResponse> {
  const id = namespace.idFromName(`${rule.key}:${identifier}`);
  const obj = namespace.get(id);

  const response = await obj.fetch(
    new Request('http://ratelimit/', {
      method: 'POST',
      body: JSON.stringify({ rule, increment }),
    })
  );

  return (await response.json()) as RatelimitResponse;
}

export class RateLimiterDO extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    return this.ctx.blockConcurrencyWhile(async () => {
      const { rule, increment = true } = (await request.json()) as {
        rule: Rule;
        increment?: boolean;
      };
      const now = Date.now();
      const storage = this.ctx.storage;

      const data = (await storage.get<Data>('state')) ?? {
        count: 0,
        prevCount: 0,
        windowStart: now,
      };

      const elapsed = now - data.windowStart;
      if (elapsed >= rule.windowMs) {
        data.prevCount = elapsed >= rule.windowMs * 2 ? 0 : data.count;
        data.count = 0;
        data.windowStart += Math.floor(elapsed / rule.windowMs) * rule.windowMs;
      }

      const weight = 1 - (now - data.windowStart) / rule.windowMs;
      const effectiveCount = data.prevCount * weight + data.count;
      const allowed = effectiveCount < rule.maxRequests;

      if (allowed && increment) data.count++;

      await storage.put('state', data);
      await storage.setAlarm(Date.now() + rule.windowMs * 2);

      const resetTime = data.windowStart + rule.windowMs;

      return new Response(
        JSON.stringify({
          allowed,
          limit: rule.maxRequests,
          remaining: Math.max(0, Math.floor(rule.maxRequests - effectiveCount - (increment && allowed ? 1 : 0))),
          resetTime,
          retryAfter: allowed ? 0 : Math.ceil((resetTime - now) / 1000),
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    });
  }

  async alarm() {
    await this.ctx.storage.deleteAll();
  }
}
