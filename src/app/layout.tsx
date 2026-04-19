import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteLayout } from '../components/site/SiteLayout';
import { ROOT_METADATA } from '../data/siteMetadata';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = ROOT_METADATA;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
