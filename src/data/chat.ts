import type { Metadata } from 'next';

export const CHAT_METADATA: Metadata = {
  title: 'AI Chat - Bernardo Pereira',
  description:
    "Chat with an AI assistant trained on Bernardo Pereira's background, projects, and experience.",
};

export const CHAT_PAGE_CONTENT = {
  headerIndex: '03',
  headerTitle: 'AI Chat',
  headerSubtitle: 'Ask about my background, projects, or experience.',
  preparingText: 'Preparing AI chat...',
  introMessage:
    "Hi! I'm Bernardo's AI assistant. I can help with:\n\n- Projects and tech stack\n- Experience and education background\n- Open-source contributions\n\nTry one of the suggestions below or ask your own question.",
  suggestions: [
    "What's Bernardo working on right now?",
    'Tell me about his projects.',
    'Does he have open-source contributions?',
  ],
  inputPlaceholder: 'Ask something about Bernardo…',
} as const;
