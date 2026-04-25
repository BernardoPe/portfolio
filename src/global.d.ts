declare module '*.css';

declare module '@streamdown/code' {
  import type { CodeHighlighterPlugin } from 'streamdown';

  export const code: CodeHighlighterPlugin;
  export function createCodePlugin(options?: { themes?: [string, string] }): CodeHighlighterPlugin;
}

/**
 * WebMCP (Web Model Context Protocol) API types
 * @see https://webmachinelearning.github.io/webmcp/
 */
type ToolAnnotations = {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
};

type ToolExecuteCallback = (
  input: Record<string, unknown>,
  client?: ModelContextClient
) => Promise<unknown>;

type ModelContextTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  execute: ToolExecuteCallback;
  annotations?: ToolAnnotations;
};

type ModelContextRegisterToolOptions = {
  signal?: AbortSignal;
};

interface ModelContextClient {
  requestUserInteraction(callback: () => Promise<unknown>): Promise<unknown>;
}

interface ModelContext {
  registerTool(tool: ModelContextTool, options?: ModelContextRegisterToolOptions): void;
}

interface Navigator {
  readonly modelContext: ModelContext;
}
