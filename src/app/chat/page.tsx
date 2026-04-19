import type { Metadata } from 'next';
import './chat.css';
import { AIChatPanel } from '@/components/site/AIChatPanel';
import { PageHeader } from '@/components/site/SiteLayout';
import { CHAT_METADATA, CHAT_PAGE_CONTENT } from '@/data/chat';

export const metadata: Metadata = CHAT_METADATA;

export default function AIChatPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        index={CHAT_PAGE_CONTENT.headerIndex}
        title={CHAT_PAGE_CONTENT.headerTitle}
        subtitle={CHAT_PAGE_CONTENT.headerSubtitle}
      />
      <AIChatPanel />
    </>
  );
}
