'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { PROFILE, SOCIAL_LINKS_BY_ID } from '../../data/profile';
import { SocialIcon } from './SocialIcon';

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
      className={`h-8 w-8 flex items-center justify-center rounded-sm border transition-colors ${
        bordered ? 'border-border' : 'border-transparent'
      } ${muted ? 'text-muted-foreground' : ''} hover:border-border-strong hover:text-primary`}
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 h-[4.25rem] flex items-center relative">
          <Link href="/" aria-label="Home" className="flex items-center gap-2 group">
            <img
              src={PROFILE.signatureSrc}
              alt={`${PROFILE.name} signature`}
              className="h-6 lg:h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map(item => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`group flex items-center gap-1.5 px-2.5 py-1.5 text-[14px] font-medium rounded-sm transition-colors ${
                    active
                      ? 'text-primary bg-secondary/40'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      active ? 'text-primary' : 'text-border-strong group-hover:text-primary'
                    }`}
                  >
                    {item.code}
                  </span>
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
            className="md:hidden h-8 w-8 ml-auto flex items-center justify-center rounded-sm border border-border text-muted-foreground"
          >
            {open ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden border-t border-border bg-background"
            style={{ animation: 'fade-in 0.2s ease-out' }}
          >
            <nav className="mx-auto max-w-6xl px-5 py-2 flex flex-col">
              {NAV_ITEMS.map(item => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={`flex items-center gap-3 px-2.5 py-2.5 rounded-sm text-[13px] font-medium transition-colors ${
                      active
                        ? 'text-primary bg-secondary/40'
                        : 'text-foreground hover:bg-secondary/40'
                    }`}
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

      <main className="flex-1 flex flex-col 2xl:justify-center [&>*]:w-full">{children}</main>

      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-[12px] text-muted-foreground">
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
      <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-9 pb-5 lg:pt-11 lg:pb-7">
        <div
          className="text-[14px] uppercase tracking-[0.18em] text-primary mb-3"
          style={{ animation: 'fade-in 0.4s ease-out' }}
        >
          {index} - {title}
        </div>
        <h1
          className="font-display text-2xl md:text-3xl lg:text-[1.25rem] xl:text-[1.5rem] font-medium tracking-tight max-w-xl leading-tight"
          style={{ animation: 'reveal-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          {subtitle}
        </h1>
      </div>
    </div>
  );
}
