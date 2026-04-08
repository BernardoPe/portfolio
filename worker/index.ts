import { routeAgentRequest } from 'agents';
import { handleContactRequest } from './contact';

export { Chat } from './chat';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/send') {
      return (await routeAgentRequest(request, env)) || new Response('Not found', { status: 404 });
    }

    return handleContactRequest(request);
  },
};
