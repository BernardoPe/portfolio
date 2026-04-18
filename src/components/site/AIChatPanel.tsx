'use client';

import { useAgent } from 'agents/react';
import { useAgentChat } from '@cloudflare/ai-chat/react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Send, Sparkles, Square, Trash2, User } from 'lucide-react';
import type { UIMessage } from '@ai-sdk/react';
import { marked, type Tokens } from 'marked';
import { Streamdown } from 'streamdown';
import { createCodePlugin } from '@streamdown/code';

const codePlugin = createCodePlugin({ themes: ['github-light', 'github-dark'] });

const SUGGESTIONS = [
  "What's Bernardo working on right now?",
  'Tell me about his projects.',
  'Does he have open-source contributions?',
] as const;

const INTRO_MESSAGE =
  "Hi! I'm Bernardo's AI assistant. I can help with:\n\n- Projects and tech stack\n- Experience and education background\n- Open-source contributions\n\nTry one of the suggestions below or ask your own question.";

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

function setStoredId(id: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(CHAT_STORAGE_KEY, id);
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
  const [sessionId, setSessionId] = useState('server-session');

  useEffect(() => {
    setMounted(true);
    setSessionId(getStoredId());
  }, []);

  if (!mounted) {
    return (
      <section className="mx-auto max-w-5xl px-5 lg:px-8 py-8 lg:py-6">
        <div className="border border-border rounded-sm bg-card flex items-center justify-center h-[62vh] min-h-[440px] text-sm text-muted-foreground">
          Preparing AI chat...
        </div>
      </section>
    );
  }

  return (
    <AIChatRuntime
      key={sessionId}
      sessionId={sessionId}
      onClear={() => {
        const nextId = crypto.randomUUID();
        setStoredId(nextId);
        setSessionId(nextId);
      }}
    />
  );
}

interface AIChatRuntimeProps {
  sessionId: string;
  onClear: () => void;
}

function AIChatRuntime({ sessionId, onClear }: AIChatRuntimeProps): React.JSX.Element {
  const [input, setInput] = useState('');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const agent = useAgent({
    agent: 'chat',
    name: sessionId,
  });

  const { messages, sendMessage, status, stop, error } = useAgentChat<
    unknown,
    UIMessage<{ createdAt: string }>
  >({
    agent,
  });

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  const loading = (status === 'submitted' || status === 'streaming') && hasMessages

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
    <section className="mx-auto max-w-5xl px-5 lg:px-8 py-12 lg:py-12">
      <div className="border border-border rounded-sm bg-card flex flex-col h-[62vh] min-h-[440px]">
        <div ref={scrollerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          {!hasMessages && (
            <div
              className="flex gap-3 justify-start"
              style={{ animation: 'fade-in 0.3s ease-out' }}
            >
              <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-primary/15 text-primary">
                <Sparkles size={13} />
              </span>
              <div className="max-w-[80%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed bg-background border border-border text-foreground/90">
                <MarkdownMessage content={INTRO_MESSAGE} id="intro-message" />
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
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
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
                      : 'bg-background border border-border text-foreground/90'
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
            <div className="flex gap-3 justify-start">
              <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm bg-primary/15 text-primary">
                <Sparkles size={13} />
              </span>
              <div className="bg-background border border-border rounded-sm px-3.5 py-2.5 text-sm text-muted-foreground">
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

        <div className="border-t border-border p-3">
          {!hasMessages && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => {
                    void send(s);
                  }}
                  className="hover-lift px-2.5 py-1 border border-border-strong rounded-sm text-[11px] font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
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
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask something about Bernardo…"
              className="flex-1 bg-background border border-border-strong rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            {loading ? (
              <button
                type="button"
                onClick={stop}
                className="hover-lift inline-flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground rounded-sm text-[11px] font-medium uppercase tracking-wider hover:opacity-90"
              >
                <Square size={12} /> Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="hover-lift inline-flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground rounded-sm text-[11px] font-medium uppercase tracking-wider hover:opacity-90 disabled:opacity-50"
              >
                <Send size={12} /> Send
              </button>
            )}

            <button
              type="button"
              disabled={!hasMessages}
              onClick={() => {
                stop();
                onClear();
              }}
              className="hover-lift inline-flex items-center gap-2 px-3 py-2 border border-border-strong rounded-sm text-[11px] font-medium uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-border-strong disabled:hover:text-muted-foreground"
            >
              <Trash2 size={12} /> Clear
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
