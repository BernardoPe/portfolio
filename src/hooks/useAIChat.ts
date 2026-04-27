import { useAgent } from 'agents/react';
import { useAgentChat } from '@cloudflare/ai-chat/react';
import { useMemo, useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { UIMessage } from '@ai-sdk/react';

export interface UseAIChatOptions {
  sessionId: string;
}

export interface QuotaInfo {
  remaining: number;
  resetTime: number;
  limit: number;
}

export interface UseAIChatResult {
  messages: UIMessage<{ createdAt: string }>[];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: string;
  error: unknown;
  isRateLimited: boolean;
  quota: QuotaInfo | null | undefined;
  hasMessages: boolean;
  loading: boolean;
  ready: boolean;
  send: (text?: string) => Promise<void>;
  stop: () => void;
  handleClear: () => void;
}

export function useAIChat({ sessionId }: UseAIChatOptions): UseAIChatResult {
  const [input, setInput] = useState('');
  const [quota, setQuota] = useState<QuotaInfo | null | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/quota', { signal: controller.signal })
      .then(res => res.json() as Promise<QuotaInfo>)
      .then(data => {
        if (!controller.signal.aborted) {
          setQuota({ remaining: data.remaining, resetTime: data.resetTime, limit: data.limit });
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
          if (!controller.signal.aborted) {
            setQuota(null);
          }
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

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

  const ready = quota !== undefined;

  const isRateLimited = useMemo(() => {
    return quota?.remaining === 0;
  }, [quota]);

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  const loading = (status === 'submitted' || status === 'streaming') && hasMessages;

  const send = async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim() || loading) {
      return;
    }

    if (quota !== null) {
      setQuota(prev => (prev ? { ...prev, remaining: Math.max(0, prev.remaining - 1) } : null));
    }

    if (!text) {
      setInput('');
    }

    await sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: messageText }],
    });
  };

  const handleClear = () => {
    stop();
    setInput('');
    clearHistory();
  };

  return {
    messages,
    input,
    setInput,
    status,
    error,
    isRateLimited,
    quota,
    hasMessages,
    loading,
    ready,
    send,
    stop,
    handleClear,
  };
}
