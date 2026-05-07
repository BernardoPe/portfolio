// via https://github.com/cloudflare/agents-starter/blob/main/src/utils.ts

import type { UIMessage } from 'ai';
import { isStaticToolUIPart } from 'ai';

export function cleanupMessages(messages: UIMessage[]): UIMessage[] {
  return messages.filter((message) => {
    if (!message.parts) return true;

    // Filter out messages with incomplete tool calls
    const hasIncompleteToolCall = message.parts.some((part) => {
      if (!isStaticToolUIPart(part)) return false;
      // Remove tool calls that are still streaming or awaiting input without results
      return (
        part.state === 'input-streaming' ||
        (part.state === 'input-available' && !part.output && !part.errorText)
      );
    });

    return !hasIncompleteToolCall;
  });
}

export function isValid(state: string): boolean {
  return (
    state === 'connecting' ||
    state === 'ready' ||
    state === 'discovering' ||
    state === 'connected' ||
    state === 'ready'
  );
}
