// Partially from https://github.com/cloudflare/agents-starter/blob/main/src/app.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAgent } from 'agents/react';
import { isStaticToolUIPart } from 'ai';
import { useAgentChat } from '@cloudflare/ai-chat/react';
import type { UIMessage } from '@ai-sdk/react';

import Button from './Button';
import Card from './Card';
import Avatar from './Avatar';
import { MemoizedMarkdown } from './MemoizedMarkdown';
import { ToolInvocationCard } from './ToolInvocationCard';
import Textarea from './Textarea';
import TrashIcon from './icons/TrashIcon';
import StopIcon from './icons/StopIcon';
import PaperPlaneTiltIcon from './icons/PaperPlaneTiltIcon';

type ChatProps = {
  embedded?: boolean;
};

export default function Chat({ embedded = false }: ChatProps) {
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [, setIsInView] = useState(false);

  const agent = useAgent({
    agent: 'chat',
  });

  const [agentInput, setAgentInput] = useState('');
  const handleAgentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAgentInput(e.target.value);
  };

  const handleAgentSubmit = async (e: React.FormEvent, extraData: Record<string, unknown> = {}) => {
    e.preventDefault();
    if (!agentInput.trim()) return;

    const message = agentInput;
    setAgentInput('');

    await sendMessage(
      {
        role: 'user',
        parts: [{ type: 'text', text: message }],
      },
      {
        body: extraData,
      }
    );
  };

  const {
    messages: agentMessages,
    addToolOutput,
    clearHistory,
    status,
    sendMessage,
    stop,
  } = useAgentChat<unknown, UIMessage<{ createdAt: string }>>({
    agent,
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      try {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior,
        });
        return;
      } catch {
        // no-op
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (agentMessages.length === 0) return;
    scrollToBottom('smooth');
  }, [agentMessages, scrollToBottom]);

  const outerClass = embedded
    ? 'w-full flex justify-center items-center bg-fixed overflow-hidden'
    : 'h-screen w-full flex justify-center items-center bg-fixed overflow-hidden';

  const innerClass = embedded
    ? 'h-[70vh] md:h-[70vh] w-full flex flex-col shadow-xl rounded-md overflow-hidden relative border border-neutral-300 dark:border-neutral-800 my-8'
    : 'h-[calc(90vh-1rem)] w-full flex flex-col shadow-xl rounded-md overflow-hidden relative border border-neutral-300 dark:border-neutral-800';

  return (
    <div ref={rootRef} className={outerClass}>
      <div className={innerClass}>
        <div className="px-4 py-3 border-b border-neutral-300 dark:border-neutral-800 flex items-center gap-3 sticky top-0 z-10">
          <div className="flex-1">
            <h2 className="font-semibold text-base">AI Chat</h2>
          </div>

          <Button
            variant="ghost"
            size="md"
            shape="square"
            className="rounded-full h-10 w-10"
            onClick={clearHistory}
          >
            <TrashIcon size={24} />
          </Button>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-2 space-y-4 pb-32 max-h-[calc(98vh-12rem)]"
        >
          {agentMessages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <Card className="p-6 max-w-md mx-auto bg-neutral-100 dark:bg-neutral-900">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Start a conversation by asking about:
                  </p>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-[#F48120]">•</span>
                      <span>Projects in the portfolio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F48120]">•</span>
                      <span>My skills and experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#F48120]">•</span>
                      <span>Technologies I work with</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          )}

          {agentMessages.map((m, index) => {
            const isUser = m.role === 'user';
            const showAvatar = index === 0 || agentMessages[index - 1]?.role !== m.role;

            return (
              <div key={m.id}>
                <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`flex gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {showAvatar && !isUser ? (
                      <Avatar username={'AI'} className="shrink-0" />
                    ) : (
                      !isUser && <div className="w-8" />
                    )}

                    <div>
                      <div>
                        {m.parts?.map((part, i) => {
                          if (part.type === 'text') {
                            return (
                              <div key={i}>
                                <Card
                                  className={`p-3 rounded-md bg-neutral-100 dark:bg-neutral-900 ${
                                    isUser
                                      ? 'rounded-br-none'
                                      : 'rounded-bl-none border-assistant-border'
                                  } ${
                                    part.text.startsWith('scheduled message')
                                      ? 'border-accent/50'
                                      : ''
                                  } relative`}
                                >
                                  <MemoizedMarkdown
                                    id={`${m.id}-${i}`}
                                    content={part.text.replace(/^scheduled message: /, '')}
                                  />
                                </Card>
                                <p
                                  className={`text-xs text-muted-foreground mt-1 ${
                                    isUser ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  {formatTime(
                                    m.metadata?.createdAt
                                      ? new Date(m.metadata.createdAt)
                                      : new Date()
                                  )}
                                </p>
                              </div>
                            );
                          }

                          if (isStaticToolUIPart(part) && m.role === 'assistant') {
                            const toolCallId = part.toolCallId;
                            return (
                              <ToolInvocationCard
                                key={`${toolCallId}-${i}`}
                                toolUIPart={part}
                                toolCallId={toolCallId}
                                needsConfirmation={false}
                                onSubmit={({ toolCallId, result }) => {
                                  addToolOutput({
                                    toolName: part.type.replace('tool-', ''),
                                    toolCallId,
                                    output: result,
                                  });
                                }}
                                addToolResult={(toolCallId, result) => {
                                  addToolOutput({
                                    toolName: part.type.replace('tool-', ''),
                                    toolCallId,
                                    output: result,
                                  });
                                }}
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAgentSubmit(e, {
              annotations: {
                hello: 'world',
              },
            });
            setTextareaHeight('auto'); // Reset height after submission
          }}
          className="p-3 bg-neutral-50 absolute bottom-0 left-0 right-0 z-10 border-t border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Textarea
                disabled={status === 'submitted' || status === 'streaming'}
                placeholder={
                  status === 'submitted' || status === 'streaming'
                    ? 'Waiting for response...'
                    : 'Send a message... (e.g. What open source contributions has Bernardo made?)'
                }
                className="flex w-full border border-neutral-200 dark:border-neutral-700 px-3 py-2  ring-offset-background placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl text-base! pb-10 dark:bg-neutral-900"
                value={agentInput}
                onChange={e => {
                  handleAgentInputChange(e);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                  setTextareaHeight(`${e.target.scrollHeight}px`);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    handleAgentSubmit(e as unknown as React.FormEvent);
                    setTextareaHeight('auto');
                  }
                }}
                rows={2}
                style={{ height: textareaHeight }}
              />
              <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
                {status === 'submitted' || status === 'streaming' ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-1.5 h-fit border border-neutral-200 dark:border-neutral-800"
                    aria-label="Stop generation"
                  >
                    <StopIcon size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-1.5 h-fit border border-neutral-200 dark:border-neutral-800"
                    disabled={!agentInput.trim()}
                    aria-label="Send message"
                  >
                    <PaperPlaneTiltIcon size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
