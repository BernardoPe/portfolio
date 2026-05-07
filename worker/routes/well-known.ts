import { Hono } from 'hono';
import { buildApiCatalog } from '../services/catalog';

export const wellKnownRoutes = new Hono();

wellKnownRoutes.get('/api-catalog', (c) => {
  const siteUrl = `${c.req.header('x-forwarded-proto') || 'https'}://${c.req.header('host')}`;
  const catalog = buildApiCatalog(siteUrl);

  return c.json(catalog, {
    headers: {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
});
