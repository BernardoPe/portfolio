import { routeAgentRequest } from 'agents';
import { AIChatAgent } from '@cloudflare/ai-chat';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type StreamTextOnFinishCallback,
  type ToolSet,
} from 'ai';
import { env } from 'cloudflare:workers';
import { cleanupMessages, isValid } from './utils';
import { google } from '@ai-sdk/google';
import { SYSTEM_PROMPT } from './prompt';

const model = google('gemini-3-flash-preview');

interface MCPServerInfo {
  id: string;
  url: string;
  transport?: {
    headers?: Record<string, string>;
  };
}

const MCP_SERVERS: MCPServerInfo[] = [
  {
    id: 'Github',
    url: 'https://api.githubcopilot.com/mcp',
    transport: {
      headers: {
        Authorization: `Bearer ${env.GITHUB_PAT}`,
        'X-MCP-Readonly': 'true',
      },
    },
  },
];

export class Chat extends AIChatAgent<Env> {
  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    options?: { abortSignal?: AbortSignal }
  ) {
    await this.ensureMcpConnections();
    const tools = await this.ensureMCPTools();

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        const cleanedMessages = cleanupMessages(this.messages);

        const result = streamText({
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(cleanedMessages),
          model,
          onFinish: onFinish,
          stopWhen: stepCountIs(10),
          tools,
          abortSignal: options?.abortSignal,
        });

        writer.merge(result.toUIMessageStream());
      },
    });

    return createUIMessageStreamResponse({ stream });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ensureMCPTools(): Promise<ToolSet | undefined> {
    const maxRetries = 5;
    const retryDelayMs = 2000;

    for (let attempt = 0; attempt < maxRetries && MCP_SERVERS.length > 0; attempt++) {
      try {
        const tools = this.mcp.getAITools();
        if (tools) return tools;
      } catch {
        const servers = this.getMcpServers().servers;
        for (const id of Object.keys(servers)) {
          this.removeMcpServer(id);
        }
        await this.ensureMcpConnections();
      }

      await this.sleep(retryDelayMs);
    }

    return undefined;
  }

  async ensureMcpConnections(): Promise<void> {
    for (const serverInfo of MCP_SERVERS) {
      const existingServers = this.getMcpServers().servers;
      const serverEntry = Object.values(existingServers).find(
        entry => entry.name === serverInfo.id
      );

      if (serverEntry?.name === serverInfo.id && isValid(serverEntry.state)) {
        continue;
      }

      console.log(`Registering MCP server ${serverInfo.id} at ${serverInfo.url}...`);
      try {
        const options = { transport: { headers: serverInfo.transport?.headers } };
        await this.addMcpServer(serverInfo.id, serverInfo.url, serverInfo.url, undefined, options);
      } catch (err) {
        console.error(`Failed to register MCP server ${serverInfo.id}:`, err);
      }
    }

    await this.connectionsReady();
  }

  async connectionsReady(): Promise<void> {
    const checkInterval = 1000;
    const timeout = 10000;
    const start = Date.now();

    while (Date.now() - start <= timeout) {
      const connections = this.mcp?.mcpConnections ?? {};
      const connIds = Object.keys(connections);

      const allReady =
        connIds.length > 0 && connIds.every(id => connections[id]?.connectionState === 'ready');
      if (allReady) {
        console.log('All MCP connections are ready.');
        return;
      }

      const notReadyId = connIds.find(id => connections[id]?.connectionState !== 'ready');
      console.log(
        `MCP connection ${notReadyId ?? 'unknown'} state is ${
          connections[notReadyId ?? '']?.connectionState ?? 'unknown'
        }`
      );

      await this.sleep(checkInterval);
    }

    throw new Error('Timeout waiting for MCP connections to be ready.');
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/api/send') {
      return (await routeAgentRequest(request, env)) || new Response('Not found', { status: 404 });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
            error: 'There was an error.',
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
  },
};
