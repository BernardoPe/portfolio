import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import { HOME_CONTENT, HOME_METADATA, type RichTextBlock } from '@/data/home';
import { HOME_NAV_CARDS } from '@/data/navigation';
import { PROFILE } from '@/data/profile';

export const metadata: Metadata = HOME_METADATA;

function renderText(block: RichTextBlock): React.JSX.Element {
  return (
    <>
      {block.map((segment, index) => {
        if (segment.type === 'strong') {
          return (
            <span key={`${segment.type}-${index}`} className="text-foreground font-medium">
              {segment.text}
            </span>
          );
        }

        if (segment.type === 'link' && segment.href) {
          return (
            <a
              key={`${segment.type}-${index}`}
              href={segment.href}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              {segment.text}
            </a>
          );
        }

        return <span key={`${segment.type}-${index}`}>{segment.text}</span>;
      })}
    </>
  );
}

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <section>
        <div className="layout-container pt-8 pb-8 lg:pt-12 lg:pb-12">
          <div
            className="max-w-3xl"
            style={{ animation: 'reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both' }}
          >
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-primary mb-4">
              {HOME_CONTENT.heroCode}
            </div>

            <h1 className="font-display text-[2.4rem] sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
              {PROFILE.name}
              <span className="block text-muted-foreground mt-3 text-2xl sm:text-3xl lg:text-4xl">
                {PROFILE.headline}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {renderText(HOME_CONTENT.subtitleSegments)}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link href={HOME_CONTENT.primaryCta.href} className="group hover-lift btn-primary-sm">
                {HOME_CONTENT.primaryCta.label} <ArrowUpRight size={13} className="arrow-shift" />
              </Link>
              <Link href={HOME_CONTENT.secondaryCta.href} className="hover-lift btn-outline-sm">
                {HOME_CONTENT.secondaryCta.label}
              </Link>
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="hover-lift btn-outline-sm"
              >
                <FileText size={13} /> {HOME_CONTENT.resumeLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="layout-container py-10 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-3">
            <div className="text-sm uppercase tracking-[0.18em] text-primary mb-3 font-medium">
              {HOME_CONTENT.aboutCode}
            </div>
          </Reveal>

          <div className="lg:col-span-9 space-y-6 text-base lg:text-md leading-relaxed text-foreground/85">
            <Reveal delay={80}>
              <p>{renderText(HOME_CONTENT.aboutParagraphs[0])}</p>
            </Reveal>

            <Reveal delay={140}>
              <p>{renderText(HOME_CONTENT.aboutParagraphs[1])}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="layout-container py-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOME_NAV_CARDS.map((card, i) => (
            <Link
              key={card.code}
              href={card.to}
              className="group panel-card panel-hover p-7"
              style={{
                animation: `reveal-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms both`,
              }}
            >
              <div className="text-sm font-medium text-primary mb-3">{card.code}</div>
              <div className="text-2xl font-medium flex items-center justify-between gap-2">
                {card.label}
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
              <div className="text-sm text-muted-foreground mt-2">{card.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
