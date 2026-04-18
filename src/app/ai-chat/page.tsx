import type { Metadata } from 'next';
import { AIChatPanel } from '../../components/site/AIChatPanel';
import { PageHeader } from '../../components/site/SiteLayout';

export const metadata: Metadata = {
  title: 'AI Chat - Bernardo Pereira',
  description:
    "Chat with an AI assistant trained on Bernardo Pereira's background, projects, and experience.",
};

export default function AIChatPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        index="03"
        title="AI Chat"
        subtitle="Ask anything about my background, projects, or experience."
      />
      <AIChatPanel />
    </>
  );
}
