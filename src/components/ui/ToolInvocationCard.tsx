import { useState } from 'react';
import type { ToolUIPart } from 'ai';
import Card from './Card';
import { LoadingSpinner } from './LoadingSpinner';

interface ToolResultWithContent {
  content: Array<{ type: string; text: string }>;
}

function isToolResultWithContent(result: unknown): result is ToolResultWithContent {
  return (
    typeof result === 'object' &&
    result !== null &&
    'content' in result &&
    Array.isArray((result as ToolResultWithContent).content)
  );
}

interface ToolInvocationCardProps {
  toolUIPart: ToolUIPart;
  toolCallId: string;
  needsConfirmation: boolean;
  onSubmit: ({ toolCallId, result }: { toolCallId: string; result: string }) => void;
  addToolResult: (toolCallId: string, result: string) => void;
}

export function ToolInvocationCard({ toolUIPart }: ToolInvocationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toolName = toolUIPart.type.replace(/^([^_]*_){2}/, '').trim();
  return (
    <Card className="p-4 my-3 w-full max-w-[21.875rem] rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 cursor-pointer"
      >
        <div className={` p-1.5 rounded-full shrink-0`}></div>
        <h4 className="font-medium flex items-center gap-2 flex-1 text-left">
          {toolName}
          {toolUIPart.state === 'output-available' && (
            <span className="text-xs text-[#F48120]/70">✓ Completed</span>
          )}
          {toolUIPart.state !== 'output-available' && toolUIPart.state !== 'output-error' && (
            <span className="text-xs text-muted-foreground capitalize">
              <LoadingSpinner /> Working...
            </span>
          )}
          {toolUIPart.state === 'output-error' && (
            <span className="text-xs text-red-500">Error</span>
          )}
        </h4>
      </button>

      <div
        className={`transition-all duration-200 ${isExpanded ? 'max-h-[12.5rem] opacity-100 mt-3' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="overflow-y-auto" style={{ maxHeight: isExpanded ? '11.25rem' : '0px' }}>
          <div className="mb-3">
            <h5 className="text-xs font-medium mb-1 text-muted-foreground">Arguments:</h5>
            <pre className="bg-background/80 p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap wrap-break-word max-w-[28.125rem]">
              {JSON.stringify(toolUIPart.input, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {toolUIPart.state === 'output-available' && (
        <div className={`mt-3 border-t border-[#F48120]/10 pt-2 ${isExpanded ? '' : 'hidden'}`}>
          <h5 className="text-xs font-medium mb-1 text-muted-foreground">Result:</h5>
          <pre className="bg-background/80 p-1 rounded-md text-xs overflow-auto whitespace-pre-wrap wrap-break-word max-w-[28.125rem]">
            {(() => {
              const result = toolUIPart.output;
              if (isToolResultWithContent(result)) {
                return result.content
                  .map((item: { type: string; text: string }) => {
                    if (item.type === 'text' && item.text.startsWith('\n~ Page URL:')) {
                      const lines = item.text.split('\n').filter(Boolean);
                      return lines
                        .map((line: string) => `- ${line.replace('\n~ ', '')}`)
                        .join('\n');
                    }
                    return item.text;
                  })
                  .join('\n');
              }
              return JSON.stringify(result, null, 2);
            })()}
          </pre>
        </div>
      )}
    </Card>
  );
}
