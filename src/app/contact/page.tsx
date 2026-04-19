import type { Metadata } from 'next';
import { PageHeader } from '../../components/site/SiteLayout';
import { ContactPanel } from '../../components/site/ContactPanel';
import { CONTACT_METADATA, CONTACT_PAGE_CONTENT } from '../../data/contact';

export const metadata: Metadata = CONTACT_METADATA;

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        index={CONTACT_PAGE_CONTENT.headerIndex}
        title={CONTACT_PAGE_CONTENT.headerTitle}
        subtitle={CONTACT_PAGE_CONTENT.headerSubtitle}
      />
      <ContactPanel />
    </>
  );
}
