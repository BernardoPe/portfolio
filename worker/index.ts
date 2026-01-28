export default {
  async fetch(request: Request, env: Record<string, string>): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/send' && request.method === 'POST') {
      try {
        const body = await request.json();

        if (!body || typeof body !== 'object') {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (!('name' in body) || !('email' in body) || !('message' in body)) {
          return new Response(JSON.stringify({ error: 'Missing fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const { name, email, subject, message } = body as {
          name: string;
          email: string;
          subject?: string;
          message: string;
        };

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: 'Missing fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const FORM_ENDPOINT = env.FORM_ENDPOINT as string | undefined;
        const FORMSPREE_FORM_ID = env.FORMSPREE_FORM_ID as string | undefined;

        let endpoint = '';
        if (FORM_ENDPOINT) endpoint = FORM_ENDPOINT;
        else if (FORMSPREE_FORM_ID) endpoint = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
        else {
          return new Response(
            JSON.stringify({
              error: 'No form endpoint configured. Set FORM_ENDPOINT or FORMSPREE_FORM_ID.',
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }

        const payload = {
          name,
          email,
          subject: subject || 'Contact from portfolio',
          message,
        };

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (resp.ok) {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const txt = await resp.text();
        return new Response(JSON.stringify({ error: 'Provider error', detail: txt }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid request', detail: String(err) }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(null, { status: 404 });
  },
};
