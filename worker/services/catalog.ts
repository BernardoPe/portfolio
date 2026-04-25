/**
 * API Catalog Service (RFC 9727)
 * Returns machine-readable API catalog in linkset+json format
 */

interface ApiCatalogEntry {
  anchor: string;
  'service-desc': Array<{
    href: string;
    type: string;
    title: string;
  }>;
  'service-doc': Array<{
    href: string;
    type: string;
    title: string;
  }>;
  status?: Array<{
    href: string;
    type: string;
    title: string;
  }>;
}

interface ApiCatalogResponse {
  linkset: ApiCatalogEntry[];
}

export function buildApiCatalog(siteUrl: string): ApiCatalogResponse {
  return {
    linkset: [
      {
        // Contact API - POST endpoint for contact form submissions
        anchor: `${siteUrl}/api/send`,
        'service-desc': [
          {
            href: `${siteUrl}/api/send/spec.json`,
            type: 'application/json',
            title: 'Contact API OpenAPI Specification',
          },
        ],
        'service-doc': [
          {
            href: `${siteUrl}/contact`,
            type: 'text/html',
            title: 'Contact Page Documentation',
          },
        ],
        status: [
          {
            href: `${siteUrl}/api/health`,
            type: 'application/json',
            title: 'API Health Status',
          },
        ],
      },
    ],
  };
}
