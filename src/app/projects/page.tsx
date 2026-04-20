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

      <section className="layout-container py-6">
        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.code} as="article" delay={i * 80}>
              <div className="group panel-card panel-hover p-6 flex flex-col h-full">
                <div className="flex justify-between mb-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} repository`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-muted-foreground transition-colors"
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
                    <li key={s.name} className="chip">
                      <DevIcon slug={s.icon} size={16} className="h-5 w-5" />
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
