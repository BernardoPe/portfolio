import type { Metadata } from 'next';
import './globals.css';
import { SiteLayout } from '@/components/site/SiteLayout';
import { ROOT_METADATA } from '@/data/siteMetadata';

export const metadata: Metadata = ROOT_METADATA;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className="dark">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
