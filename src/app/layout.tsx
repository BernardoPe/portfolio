import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SiteLayout } from '../components/site/SiteLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bernardo Pereira - MSc Student & Software Engineer',
  description:
    'Portfolio of Bernardo Pereira - MSc Computer Science & Engineering student at Instituto Superior Técnico. Backend, JVM, and systems engineering.',
  authors: [{ name: 'Bernardo Pereira' }],
  openGraph: {
    title: 'Bernardo Pereira - Software Engineer',
    description: 'MSc student @ Instituto Superior Técnico. Backend, JVM, systems engineering.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
