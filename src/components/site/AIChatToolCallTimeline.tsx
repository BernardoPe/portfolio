import {
  getToolCallId,
  getToolInput,
  getToolOutput,
  getToolPartState,
} from '@cloudflare/ai-chat/react';
import type { UIMessage } from '@ai-sdk/react';
import { isToolUIPart } from 'ai';

export interface ToolCallProgress {
  id: string;
  name: string;
  state:
    | 'loading'
    | 'streaming'
    | 'waiting-approval'
    | 'approved'
    | 'complete'
    | 'error'
    | 'denied';
  input?: string;
  output?: string;
  error?: string;
}

function getToolName(partType: string): string {
  return partType.startsWith('tool-') ? partType.slice(5) : partType;
}

function formatPreview(value: unknown, maxLength = 140): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const raw =
    typeof value === 'string'
      ? value
      : (() => {
          try {
            return JSON.stringify(value);
          } catch {
            return String(value);
          }
        })();

  if (!raw) {
    return undefined;
  }

  return raw.length > maxLength ? `${raw.slice(0, maxLength)}…` : raw;
}

export function getToolCallProgress(message: UIMessage<{ createdAt: string }>): ToolCallProgress[] {
  return message.parts
    .filter(part => isToolUIPart(part))
    .map(part => {
      const state = getToolPartState(part);
      return {
        id: getToolCallId(part),
        name: getToolName(part.type),
        state,
        input: formatPreview(getToolInput(part)),
        output: formatPreview(getToolOutput(part)),
        error:
          'errorText' in part && typeof part.errorText === 'string' ? part.errorText : undefined,
      };
    });
}

function getToolStateLabel(state: ToolCallProgress['state']): string {
  switch (state) {
    case 'loading':
      return 'Queued';
    case 'streaming':
      return 'Calling';
    case 'waiting-approval':
      return 'Awaiting approval';
    case 'approved':
      return 'Approved';
    case 'complete':
      return 'Complete';
    case 'error':
      return 'Failed';
    case 'denied':
      return 'Denied';
    default:
      return 'Running';
  }
}

function getToolStateClassName(state: ToolCallProgress['state']): string {
  switch (state) {
    case 'complete':
      return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
    case 'error':
    case 'denied':
      return 'text-red-300 border-red-300/30 bg-red-400/10';
    default:
      return 'text-primary border-primary/30 bg-primary/10';
  }
}

interface AIChatToolCallTimelineProps {
  calls: ToolCallProgress[];
}

export function AIChatToolCallTimeline({ calls }: AIChatToolCallTimelineProps): React.JSX.Element {
  return (
    <div className="mt-2 space-y-2">
      {calls.map(call => (
        <div key={call.id} className="rounded-sm border border-border/60 px-2.5 py-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wide uppercase text-foreground/90">
              {call.name}
            </span>
            <span
              className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getToolStateClassName(call.state)}`}
            >
              {getToolStateLabel(call.state)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
