import { env } from 'cloudflare:workers';
import { createJsonErrorResponse } from '../utils/errors';

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function submitContact(body: unknown): Promise<Response> {
  if (!body || typeof body !== 'object') {
    return createJsonErrorResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!('name' in body) || !('email' in body) || !('message' in body)) {
    return createJsonErrorResponse({ error: 'Missing fields' }, 400);
  }

  const { name, email, subject, message } = body as ContactRequestBody;

  if (!name || !email || !message) {
    return createJsonErrorResponse({ error: 'Missing fields' }, 400);
  }

  const FORM_ENDPOINT = env.FORM_ENDPOINT as string | undefined;
  const FORMSPREE_FORM_ID = env.FORMSPREE_FORM_ID as string | undefined;

  let endpoint = '';
  if (FORM_ENDPOINT) endpoint = FORM_ENDPOINT;
  else if (FORMSPREE_FORM_ID) endpoint = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
  else {
    return createJsonErrorResponse({ error: 'There was an error.' }, 500);
  }

  const payload = {
    name,
    email,
    subject: subject || 'Contact from portfolio',
    message,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const detail = await response.text();
    return createJsonErrorResponse({ error: 'Provider error', detail }, 502);
  } catch (err) {
    return createJsonErrorResponse({ error: 'Invalid request', detail: String(err) }, 400);
  }
}
