'use client';

import { useAgent } from 'agents/react';
import { useAgentChat } from '@cloudflare/ai-chat/react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Send, Sparkles, Square, Trash2, User } from 'lucide-react';
import type { UIMessage } from '@ai-sdk/react';
import { marked, type Tokens } from 'marked';
import { Streamdown } from 'streamdown';
import { createCodePlugin } from '@streamdown/code';
import { CHAT_PAGE_CONTENT } from '@/data/chat';

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
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('\n')
    .trim();
}

function splitMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown) as Array<Tokens.Generic & { raw: string }>;
  const blocks = tokens.map(token => token.raw);
  return blocks.length > 0 ? blocks : [markdown];
}

const MarkdownBlock = memo(function MarkdownBlock({
  content,
}: {
  content: string;
}): React.JSX.Element {
  return (
    <div className="markdown-body">
      <Streamdown plugins={{ code: codePlugin }} linkSafety={{ enabled: false }}>
        {content}
      </Streamdown>
    </div>
  );
});

function MarkdownMessage({ content, id }: { content: string; id: string }): React.JSX.Element {
  const blocks = useMemo(() => splitMarkdownIntoBlocks(content), [content]);
  return (
    <>
      {blocks.map((block, index) => (
        <MarkdownBlock key={`${id}-block-${index}`} content={block} />
      ))}
    </>
  );
}

export function AIChatPanel(): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const sessionId = useMemo(() => getStoredId(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="layout-container py-12">
        <div className="panel-card flex items-center justify-center h-[68vh] min-h-[500px] text-sm text-muted-foreground">
          {CHAT_PAGE_CONTENT.preparingText}
        </div>
      </section>
    );
  }

  return <AIChatRuntime key={sessionId} sessionId={sessionId} />;
}

interface AIChatRuntimeProps {
  sessionId: string;
}

function AIChatRuntime({ sessionId }: AIChatRuntimeProps): React.JSX.Element {
  const [input, setInput] = useState('');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const agent = useAgent({
    agent: 'chat',
    name: sessionId,
  });

  const { messages, sendMessage, clearHistory, status, stop, error } = useAgentChat<
    unknown,
    UIMessage<{ createdAt: string }>
  >({
    agent,
  });

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  const loading = (status === 'submitted' || status === 'streaming') && hasMessages;

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) {
      return;
    }

    setInput('');

    await sendMessage({
      role: 'user',
      parts: [{ type: 'text', text }],
    });
  };

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

          {messages.map(m => {
            const text = getMessageText(m);
            if (!text) {
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
                  className={`max-w-[80%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-primary text-primary-foreground whitespace-pre-wrap'
                      : 'bg-background border text-foreground/90'
                  }`}
                >
                  {isUser ? text : <MarkdownMessage content={text} id={m.id} />}
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

          {error && (
            <div className="text-sm text-red-400 border border-red-400/40 rounded-sm px-3 py-2">
              Could not reach the AI backend.
            </div>
          )}
        </div>

        <div className="border-t p-3">
          {!hasMessages && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {CHAT_PAGE_CONTENT.suggestions.map(s => (
                <button
                  key={s}
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
            onSubmit={e => {
              e.preventDefault();
              void send(input);
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={CHAT_PAGE_CONTENT.inputPlaceholder}
              className="flex-1 bg-background border-strong rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <div className="flex items-center gap-2 sm:flex-none">
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
                  disabled={!input.trim()}
                  className="btn-primary-sm shrink-0 uppercase tracking-wider text-[11px] disabled:opacity-50"
                >
                  <Send size={12} /> Send
                </button>
              )}

              <button
                type="button"
                disabled={!hasMessages}
                onClick={() => {
                  stop();
                  setInput('');
                  clearHistory();
                }}
                className="btn-outline-sm shrink-0 px-2.5 sm:px-3 uppercase tracking-wider text-[11px] disabled:opacity-50 disabled:hover-strong disabled:hover:text-muted-foreground"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 size={12} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
