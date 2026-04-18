import { routeAgentRequest } from 'agents';
import { handleContactRequest } from './contact';

export { Chat } from './chat';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/send') {
      return handleContactRequest(request);
    }

    const agentResponse = await routeAgentRequest(request, env);
    if (agentResponse) {
      return agentResponse;
    }

    return env.ASSETS.fetch(request);
  },
};
