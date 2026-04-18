import type { Metadata } from 'next';
import { PageHeader } from '../../components/site/SiteLayout';
import { ContactPanel } from '../../components/site/ContactPanel';

export const metadata: Metadata = {
  title: 'Contact - Bernardo Pereira',
  description: 'Get in touch with Bernardo Pereira',
};

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        index="04"
        title="Contact"
        subtitle="Get in touch - Send a message or reach out directly."
      />
      <ContactPanel />
    </>
  );
}
