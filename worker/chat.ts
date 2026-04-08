import { AIChatAgent } from '@cloudflare/ai-chat';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type StreamTextOnFinishCallback,
  type UIMessage,
  type UIMessageStreamWriter,
  type ToolSet,
  stepCountIs,
} from 'ai';
import { google, type GoogleLanguageModelOptions } from '@ai-sdk/google';
import { env } from 'cloudflare:workers';
import { SYSTEM_PROMPT } from './prompt';
import { classifyWorkerError } from './errors';
import { cleanupMessages, isValid } from './utils';

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
    const connectionsReady = await this.ensureMcpConnections();
    const tools = connectionsReady ? await this.ensureMCPTools() : undefined;

    if (!connectionsReady) {
      console.warn('[Chat] MCP connections are not ready. Proceeding without MCP tools.');
    }

    const stream = createUIMessageStream({
      onError: (error: unknown) => {
        return classifyWorkerError(error).message;
      },
      execute: async ({ writer }) => {
        const cleanedMessages = cleanupMessages(this.messages);

        try {
          const result = streamText({
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(cleanedMessages),
            model,
            onFinish,
            stopWhen: stepCountIs(10),
            tools,
            abortSignal: options?.abortSignal,
            providerOptions: {
              thinkingConfig: {
                thinkingLevel: 'low',
              },
            } satisfies GoogleLanguageModelOptions,
          });
          writer.merge(result.toUIMessageStream());
        } catch (error) {
          const streamWarning = classifyWorkerError(error).message;
          this.writeWarning(writer, streamWarning, 'Server');
          throw error;
        }
      },
    });

    return createUIMessageStreamResponse({ stream });
  }

  override onError(error: unknown): never {
    console.error('[Chat] Error on server:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }

  async ensureMCPTools(): Promise<ToolSet | undefined> {
    try {
      await this.mcp.ensureJsonSchema();
      return this.mcp.getAITools();
    } catch (error) {
      console.warn('[Chat] Failed to initialize MCP tools. Proceeding without them.', error);
      return undefined;
    }
  }

  async ensureMcpConnections(): Promise<boolean> {
    if (MCP_SERVERS.length === 0) {
      return false;
    }

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

    return this.connectionsReady();
  }

  async connectionsReady(): Promise<boolean> {
    const checkInterval = 1000;
    const timeout = 5000;
    const start = Date.now();

    while (Date.now() - start <= timeout) {
      const connections = this.mcp?.mcpConnections ?? {};
      const connIds = Object.keys(connections);

      const allReady =
        connIds.length > 0 && connIds.every(id => connections[id]?.connectionState === 'ready');
      if (allReady) {
        console.log('All MCP connections are ready.');
        return true;
      }

      const notReadyId = connIds.find(id => connections[id]?.connectionState !== 'ready');
      console.log(
        `MCP connection ${notReadyId ?? 'unknown'} state is ${
          connections[notReadyId ?? '']?.connectionState ?? 'unknown'
        }`
      );

      await this.sleep(checkInterval);
    }

    console.warn('[Chat] Timeout waiting for MCP connections to be ready.');
    return false;
  }

  private writeWarning(
    writer: UIMessageStreamWriter<UIMessage>,
    warning: string,
    heading = 'Warning'
  ): void {
    const textPartId = crypto.randomUUID();
    writer.write({ type: 'text-start', id: textPartId });
    writer.write({ type: 'text-delta', id: textPartId, delta: `${heading}: ${warning}\n\n` });
    writer.write({ type: 'text-end', id: textPartId });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
