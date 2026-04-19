'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { SocialIcon } from '@/components/site/SocialIcon';
import { NAV_ITEMS } from '@/data/navigation';
import { PROFILE, SOCIAL_LINKS_BY_ID } from '@/data/profile';

interface SiteLayoutProps {
  children: React.ReactNode;
}

type SocialType = 'github' | 'linkedin' | 'email';

const HEADER_SOCIALS: SocialType[] = ['github', 'linkedin'];
const FOOTER_SOCIALS: SocialType[] = ['github', 'linkedin', 'email'];

interface SocialLinkButtonProps {
  type: SocialType;
  bordered?: boolean;
  muted?: boolean;
}

function SocialLinkButton({
  type,
  bordered = false,
  muted = false,
}: SocialLinkButtonProps): React.JSX.Element {
  const link = SOCIAL_LINKS_BY_ID[type];

  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noreferrer' : undefined}
      aria-label={link.label}
      className={`social-link-btn ${bordered ? 'social-link-btn--bordered' : ''} ${muted ? 'social-link-btn--muted' : ''}`}
    >
      {type === 'email' ? (
        <Mail size={14} />
      ) : (
        <SocialIcon brand={type} size={16} className="opacity-90" />
      )}
    </a>
  );
}

export function SiteLayout({ children }: SiteLayoutProps): React.JSX.Element {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className=" border-b">
        <div className="layout-container h-[4.25rem] flex items-center relative">
          <Link href="/" aria-label="Home" className="flex items-center gap-2 group">
            <Image
              src={PROFILE.signatureSrc}
              alt={`${PROFILE.name} signature`}
              width={228}
              height={84}
              priority
              fetchPriority="high"
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map(item => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`nav-link ${active ? 'nav-link--active' : ''}`}
                >
                  <span className="nav-link-code">{item.code}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2 ml-auto">
            {HEADER_SOCIALS.map(type => (
              <SocialLinkButton key={type} type={type} muted />
            ))}
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
            className="md:hidden h-8 w-8 ml-auto flex items-center justify-center rounded-sm border text-muted-foreground"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden border-t bg-background"
            style={{ animation: 'fade-in 0.2s ease-out' }}
          >
            <nav className="layout-container py-2 flex flex-col">
              {NAV_ITEMS.map(item => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={`mobile-nav-link ${active ? 'mobile-nav-link--active' : ''}`}
                  >
                    <span className="text-border-strong">{item.code}</span>
                    {item.label}
                  </Link>
                );
              })}

              <div className="flex items-center gap-2 px-2.5 py-2">
                {HEADER_SOCIALS.map(type => (
                  <SocialLinkButton key={type} type={type} bordered muted />
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t mt-16">
        <div className="layout-container py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <span>
            © {year} - {PROFILE.name}
          </span>
          <div className="flex items-center gap-1">
            {FOOTER_SOCIALS.map(type => (
              <SocialLinkButton key={type} type={type} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

interface PageHeaderProps {
  index: string;
  title: string;
  subtitle: string;
}

export function PageHeader({ index, title, subtitle }: PageHeaderProps): React.JSX.Element {
  return (
    <div>
      <div className="layout-container pt-9 pb-5">
        <div
          className="text-sm uppercase tracking-[0.18em] text-primary mb-3"
          style={{ animation: 'fade-in 0.4s ease-out' }}
        >
          {index} - {title}
        </div>
        <h1
          className="font-display text-2xl lg:text-2xl font-medium"
          style={{ animation: 'reveal-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          {subtitle}
        </h1>
      </div>
    </div>
  );
}
