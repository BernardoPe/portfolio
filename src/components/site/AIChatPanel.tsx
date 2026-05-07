'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Send, Sparkles, Square, Trash2, User } from 'lucide-react';
import type { UIMessage } from '@ai-sdk/react';
import { Streamdown } from 'streamdown';
import { createCodePlugin } from '@streamdown/code';
import { CHAT_PAGE_CONTENT } from '@/data/chat';
import {
  AIChatToolCallTimeline,
  getToolCallProgress,
} from '@/components/site/AIChatToolCallTimeline';
import { useAIChat } from '@/hooks/useAIChat';
import { FORM_LIMITS } from '@/data/config';

const codePlugin = createCodePlugin({ themes: ['github-light', 'github-dark'] });

const CHAT_STORAGE_KEY = 'chat-uuid';

function getStoredId(): string {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  let id = localStorage.getItem(CHAT_STORAGE_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CHAT_STORAGE_KEY, id);
  }

  return id;
}

function getMessageText(message: UIMessage<{ createdAt: string }>): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim();
}

const MarkdownBlock = memo(function MarkdownBlock({
  content,
}: {
  content: string;
}): React.JSX.Element {
  return (
    <div className="markdown-body list-disc">
      <Streamdown plugins={{ code: codePlugin }} linkSafety={{ enabled: false }}>
        {content}
      </Streamdown>
    </div>
  );
});

function MarkdownMessage({ content, id }: { content: string; id: string }): React.JSX.Element {
  return <MarkdownBlock key={id} content={content} />;
}

function AIChatLoadingState(): React.JSX.Element {
  return (
    <section className="layout-container py-12">
      <div className="panel-card flex items-center justify-center h-[68vh] min-h-[500px] text-sm text-muted-foreground">
        {CHAT_PAGE_CONTENT.preparingText}
      </div>
    </section>
  );
}

export function AIChatPanel(): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const sessionId = useMemo(() => getStoredId(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <AIChatLoadingState />;
  }

  return <AIChatRuntime sessionId={sessionId} />;
}

interface AIChatRuntimeProps {
  sessionId: string;
}

function AIChatRuntime({ sessionId }: AIChatRuntimeProps): React.JSX.Element {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    setInput,
    error,
    isRateLimited,
    quota,
    hasMessages,
    loading,
    ready,
    send,
    stop,
    handleClear,
  } = useAIChat({
    sessionId,
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  if (!ready) {
    return <AIChatLoadingState />;
  }

  const quotaInfo = quota ?? null;
  const hasError = error !== null && error !== undefined;

  return (
    <section className="layout-container py-12">
      <div className="panel-card flex flex-col h-[68vh] min-h-[500px]">
        <div ref={scrollerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          {!hasMessages && (
            <div className="flex gap-3" style={{ animation: 'fade-in 0.3s ease-out' }}>
              <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-primary/15 text-primary">
                <Sparkles size={13} />
              </span>
              <div className="max-w-[80%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed bg-background border text-foreground/90">
                <MarkdownMessage content={CHAT_PAGE_CONTENT.introMessage} id="intro-message" />
              </div>
            </div>
          )}

          {messages.map((m: UIMessage<{ createdAt: string }>) => {
            const text = getMessageText(m);
            const toolCalls = getToolCallProgress(m);
            if (!text && toolCalls.length === 0) {
              return null;
            }

            const isUser = m.role === 'user';

            return (
              <div
                key={m.id}
                className={isUser ? 'flex gap-3 justify-end' : 'flex gap-3'}
                style={{ animation: 'fade-in 0.3s ease-out' }}
              >
                {!isUser && (
                  <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-primary/15 text-primary">
                    <Sparkles size={13} />
                  </span>
                )}
                <div
                  className={`max-w-[80%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed break-words ${
                    isUser
                      ? 'bg-primary text-primary-foreground whitespace-pre-wrap'
                      : 'bg-background border text-foreground/90'
                  }`}
                >
                  {!isUser && toolCalls.length > 0 && (
                    <div className="mb-3">
                      <AIChatToolCallTimeline calls={toolCalls} />
                    </div>
                  )}
                  {isUser ? text : text ? <MarkdownMessage content={text} id={m.id} /> : null}
                </div>
                {isUser && (
                  <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-secondary text-muted-foreground">
                    <User size={13} />
                  </span>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-primary/15 text-primary">
                <Sparkles size={13} />
              </span>
              <div className="bg-background border rounded-sm px-3.5 py-2.5 text-sm text-muted-foreground">
                Thinking<span className="animate-pulse">…</span>
              </div>
            </div>
          )}

          {hasError && (
            <div className="text-sm text-red-400 border border-red-400/40 rounded-sm px-3 py-2">
              {isRateLimited
                ? 'You have hit your request quota. Please come back later.'
                : 'Could not reach the AI backend.'}
            </div>
          )}
        </div>

        <div className="border-t p-3">
          {!hasMessages && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {CHAT_PAGE_CONTENT.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={isRateLimited}
                  onClick={() => {
                    void send(s);
                  }}
                  className="chip text-[11px]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="flex flex-col gap-2"
          >
            <div className="relative flex flex-col sm:flex-row gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                disabled={isRateLimited}
                placeholder={
                  isRateLimited
                    ? 'You have hit your request quota. Please come back later.'
                    : CHAT_PAGE_CONTENT.inputPlaceholder
                }
                className="flex-1 bg-background border-strong rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary disabled:opacity-50 resize-none overflow-y-auto min-h-[40px] max-h-[200px]"
              />
              <div className="flex items-center gap-2 sm:flex-none self-end sm:self-center">
                {loading ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="btn-primary-sm shrink-0 uppercase tracking-wider text-[11px]"
                  >
                    <Square size={12} /> Stop
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={
                      !input.trim() ||
                      input.length > FORM_LIMITS.chat.maxInputLength ||
                      isRateLimited
                    }
                    className="btn-primary-sm shrink-0 uppercase tracking-wider text-[11px] disabled:opacity-50"
                  >
                    <Send size={12} /> Send
                  </button>
                )}

                <button
                  type="button"
                  disabled={!hasMessages}
                  onClick={handleClear}
                  className="btn-outline-sm shrink-0 px-2.5 sm:px-3 uppercase tracking-wider text-[11px] disabled:opacity-50 disabled:hover-strong disabled:hover:text-muted-foreground"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <Trash2 size={12} />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center mt-1.5 px-1 gap-3">
            {quotaInfo !== null && (
              <div className="text-[10px] text-muted-foreground text-left">
                Requests remaining: {quotaInfo.remaining}/{quotaInfo.limit}
                {quotaInfo.remaining === 0 && quotaInfo.resetTime && (
                  <span className="ml-1">
                    (Resets at {new Date(quotaInfo.resetTime).toLocaleTimeString()})
                  </span>
                )}
              </div>
            )}

            {input.length > 0 && (
              <div
                className={`text-[10px] ${
                  input.length > FORM_LIMITS.chat.maxInputLength
                    ? 'text-red-500 font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {input.length} / {FORM_LIMITS.chat.maxInputLength} characters
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
