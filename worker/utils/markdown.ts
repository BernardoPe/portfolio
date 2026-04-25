const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';

function acceptsMarkdown(request: Request): boolean {
  return request.headers.get('Accept')?.toLowerCase().includes('text/markdown') ?? false;
}

function isHtml(response: Response): boolean {
  return response.headers.get('Content-Type')?.toLowerCase().includes('text/html') ?? false;
}

function createMarkdownHeaders(sourceHeaders: Headers, tokenCount?: number): Headers {
  const headers = new Headers(sourceHeaders);
  headers.set('Content-Type', MARKDOWN_CONTENT_TYPE);
  headers.append('Vary', 'Accept');
  headers.delete('Content-Length');

  if (typeof tokenCount === 'number') {
    headers.set('x-markdown-tokens', String(tokenCount));
  }

  return headers;
}

function getMarkdownSourceName(pathname: string): string {
  const normalized = pathname.replace(/^\/+|\/+$/g, '');
  if (!normalized) return 'index.html';
  return normalized.endsWith('.html') ? normalized : `${normalized}.html`;
}

export async function maybeConvertHtmlToMarkdown(
  request: Request,
  response: Response,
  env: Env
): Promise<Response> {
  if (!acceptsMarkdown(request) || !isHtml(response)) {
    return response;
  }

  if (request.method.toUpperCase() === 'HEAD') {
    return new Response(null, {
      status: response.status,
      statusText: response.statusText,
      headers: createMarkdownHeaders(response.headers),
    });
  }

  try {
    const html = await response.clone().text();
    const pathname = new URL(request.url).pathname;
    const sourceName = getMarkdownSourceName(pathname);

    const result = await env.AI.toMarkdown({
      name: sourceName,
      blob: new Blob([html], { type: 'text/html' }),
    });

    if (result.format === 'error') {
      console.error('Failed to convert HTML to Markdown:', result.error);
      return response;
    }

    const markdown = result.data;
    const tokenCount = result.tokens;

    return new Response(markdown, {
      status: response.status,
      statusText: response.statusText,
      headers: createMarkdownHeaders(response.headers, tokenCount),
    });
  } catch (error) {
    console.error('Failed to convert HTML to Markdown:', error);
    return response;
  }
}
