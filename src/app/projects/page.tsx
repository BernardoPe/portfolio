import type { Metadata } from 'next';
import { Github } from 'lucide-react';
import { DevIcon } from '@/components/site/DevIcon';
import { Reveal } from '@/components/site/Reveal';
import { PageHeader } from '@/components/site/SiteLayout';
import { PROJECTS, PROJECTS_METADATA, PROJECTS_PAGE_CONTENT } from '@/data/projects';

export const metadata: Metadata = PROJECTS_METADATA;

export default function ProjectsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        index={PROJECTS_PAGE_CONTENT.headerIndex}
        title={PROJECTS_PAGE_CONTENT.headerTitle}
        subtitle={PROJECTS_PAGE_CONTENT.headerSubtitle}
      />

      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-8 lg:py-6">
        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.code} as="article" delay={i * 80}>
              <div className="group hover-lift border border-border rounded-sm bg-card p-6 hover:border-primary/60 hover:shadow-[0_8px_30px_-12px_oklch(0.78_0.16_55_/_0.25)] flex flex-col h-full">
                <div className="flex items-baseline justify-between mb-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} repository`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={13} /> {PROJECTS_PAGE_CONTENT.repoLabel}
                  </a>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tight">{p.name}</h3>
                <p className="text-[13px] font-medium text-muted-foreground mt-1">{p.tagline}</p>
                <p className="mt-3 text-[15px] text-foreground/80 leading-relaxed flex-1">
                  {p.body}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map(s => (
                    <li
                      key={s.name}
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-border-strong rounded-sm text-[12px] font-medium text-foreground/80 transition-colors hover:border-primary/60 hover:text-foreground"
                    >
                      <DevIcon slug={s.icon} size={16} className="h-4 w-4" />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
