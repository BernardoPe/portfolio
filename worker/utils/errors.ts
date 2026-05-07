export interface ErrorLike {
  name?: string;
  message: string;
  cause?: unknown;
}

export type WorkerErrorKind = 'mcp-timeout' | 'mcp-auth' | 'unexpected';

export interface WorkerErrorDetails {
  kind: WorkerErrorKind;
  message: string;
  cause?: unknown;
}

export interface JsonErrorBody {
  error: string;
  detail?: string;
}

export function isErrorLike(error: unknown): error is ErrorLike {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  );
}

export function getErrorMessage(error: unknown): string {
  if (isErrorLike(error)) {
    return error.message;
  }

  return String(error);
}

export function classifyWorkerError(error: unknown): WorkerErrorDetails {
  const message = getErrorMessage(error);

  if (message.includes('Timeout waiting for MCP connections to be ready')) {
    return {
      kind: 'mcp-timeout',
      message:
        'MCP tools are temporarily unavailable. I will continue without external tools for this response.',
      cause: error,
    };
  }

  if (message.includes('dynamic client registration')) {
    return {
      kind: 'mcp-auth',
      message: 'Authentication failed for MCP server. I will continue without external tools.',
      cause: error,
    };
  }

  return {
    kind: 'unexpected',
    message: 'An unexpected error occurred.',
    cause: error,
  };
}

export function createJsonErrorResponse(body: JsonErrorBody, status = 400): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
