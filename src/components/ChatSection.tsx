import Section from './ui/Section';
import SectionId from '../types/sections';
import Chat from './ui/Chat';

function ChatSection(): React.JSX.Element {
  return (
    <Section id={SectionId.Chat} title="AI Chat" subtitle="Ask about me." className="mb-1">
      <div className="max-w-5xl mx-auto">
        <Chat embedded />
      </div>
    </Section>
  );
}

export default ChatSection;
