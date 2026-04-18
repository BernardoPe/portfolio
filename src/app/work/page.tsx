import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/site/SiteLayout';
import { Reveal } from '../../components/site/Reveal';

export const metadata: Metadata = {
  title: 'Experience - Bernardo Pereira',
  description: 'Experience, education, and technical skills of Bernardo Pereira',
};

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const devIcon = (slug: string, variant: string = 'original'): string =>
  `${DEVICON_BASE}/${slug}/${slug}-${variant}.svg`;

const ICONS: Record<string, string> = {
  java: devIcon('java'),
  kotlin: devIcon('kotlin'),
  typescript: devIcon('typescript'),
  javascript: devIcon('javascript'),
  go: devIcon('go'),
  nodedotjs: devIcon('nodejs'),
  quarkus: devIcon('quarkus'),
  spring: devIcon('spring'),
  postgresql: devIcon('postgresql'),
  mongodb: devIcon('mongodb'),
  firebase: devIcon('firebase', 'plain'),
  prisma: devIcon('prisma'),
  express: devIcon('express'),
  react: devIcon('react'),
  tailwindcss: devIcon('tailwindcss'),
  android: devIcon('android'),
  webpack: devIcon('webpack'),
  vite: devIcon('vitejs'),
  docker: devIcon('docker'),
  apachejmeter: devIcon('apache'),
  nginx: devIcon('nginx'),
  googlecloud: devIcon('googlecloud'),
  githubactions: devIcon('githubactions'),
  git: devIcon('git'),
};

const icon = (slug: keyof typeof ICONS): string => ICONS[slug];

const SKILLS = [
  {
    group: 'Languages',
    items: [
      { name: 'Java', icon: icon('java') },
      { name: 'Kotlin', icon: icon('kotlin') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'JavaScript', icon: icon('javascript') },
      { name: 'Go', icon: icon('go') },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Node.js', icon: icon('nodedotjs') },
      { name: 'Quarkus', icon: icon('quarkus') },
      { name: 'Spring', icon: icon('spring') },
      { name: 'PostgreSQL', icon: icon('postgresql') },
      { name: 'MongoDB', icon: icon('mongodb') },
      { name: 'Firebase', icon: icon('firebase') },
      { name: 'Prisma', icon: icon('prisma') },
      { name: 'Express', icon: icon('express') },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', icon: icon('react') },
      { name: 'Tailwind CSS', icon: icon('tailwindcss') },
      { name: 'Android', icon: icon('android') },
      { name: 'Webpack', icon: icon('webpack') },
      { name: 'Vite', icon: icon('vite') },
    ],
  },
  {
    group: 'Cloud / DevOps',
    items: [
      { name: 'Docker', icon: icon('docker') },
      { name: 'JMeter', icon: icon('apachejmeter') },
      { name: 'Nginx', icon: icon('nginx') },
      { name: 'GCP', icon: icon('googlecloud') },
      { name: 'GitHub Actions', icon: icon('githubactions') },
      { name: 'Git', icon: icon('git') },
    ],
  },
];

function LogoBadge({ name, src }: { name: string; src: string }): React.JSX.Element {
  return (
    <img
      src={src}
      alt={`${name} logo`}
      className="shrink-0 h-7 w-10 lg:h-10 lg:w-16 object-contain"
      loading="lazy"
    />
  );
}

interface SectionProps {
  code: string;
  title: string;
  children: React.ReactNode;
}

function Section({ code, title, children }: SectionProps): React.JSX.Element {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-8 lg:py-6 grid lg:grid-cols-12 gap-8">
        <Reveal className="lg:col-span-3">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-6 bg-primary/60" />
            {code}
          </div>
          <h2 className="font-display text-2xl font-medium tracking-tight mt-2">{title}</h2>
        </Reveal>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function WorkPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        index="01"
        title="Experience / Education / Skills"
        subtitle="My experience, education, and technical skills"
      />

      <Section code="01.01" title="Experience">
        <Reveal>
          <article className="hover-lift border border-border rounded-sm bg-card hover:border-primary/60 overflow-hidden">
            <header className="flex items-center gap-4 p-5 lg:p-6 border-b border-border">
              <LogoBadge name="Sky Portugal" src="/assets/sky-logo.png" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg lg:text-xl font-medium leading-tight">
                  Apprentice Developer
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-primary font-medium">Sky Portugal</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Jul 2025 - Aug 2025
                  </span>
                </div>
              </div>
            </header>
            <ul className="p-5 lg:p-6 space-y-3 text-[14px] lg:text-[15px] leading-relaxed text-foreground/85">
              {[
                'Developed and delivered a Lightning.js-based testing tool that streamlined deeplink testing, improving QA testing speed.',
                "Implemented cross-platform and cross-device testing across Sky's streaming ecosystem (Peacock, SkyShowtime, NOW, Showmax) for LG and Samsung devices.",
                'Improved technical skills in front-end development, working in an agile environment with version control workflows.',
              ].map(b => (
                <li key={b} className="flex gap-3">
                  <span className="text-primary mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </Section>

      <Section code="01.02" title="Education">
        <div className="space-y-4">
          {[
            {
              degree: 'MSc in Computer Science & Engineering',
              school: 'Instituto Superior Técnico',
              url: 'https://tecnico.ulisboa.pt/',
              logo: '/assets/ist-logo.svg',
              grade: '17/20',
            },
            {
              degree: 'BSc in Computer Science & Engineering',
              school: 'Instituto Superior de Engenharia de Lisboa',
              url: 'https://www.isel.pt/',
              logo: '/assets/isel-logo.svg',
              grade: '17/20',
              project: {
                title: 'Non-Blocking Progressive SSR Benchmark',
                grade: '20/20',
                body: 'Benchmarked reactive, coroutine, and virtual thread approaches to HTML rendering to evaluate viability of virtual threads for non-blocking PSSR with most external DSL engines.',
              },
              achievement:
                'Merit award for academic excellence, academic years 2022/2023 and 2024/2025.',
            },
          ].map((e, i) => (
            <Reveal key={e.degree} delay={i * 80}>
              <article className="hover-lift border border-border rounded-sm p-5 lg:p-6 bg-card hover:border-primary/60 space-y-5">
                <div className="flex items-center gap-4">
                  <LogoBadge name={e.school} src={e.logo} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg lg:text-xl font-medium leading-tight">
                      {e.degree}
                    </h3>
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 mt-1 text-[13px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {e.school} <ExternalLink size={11} />
                    </a>
                  </div>
                  <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-primary border border-border-strong rounded-sm px-2.5 py-1.5">
                    {e.grade}
                  </span>
                </div>

                {e.project ? (
                  <div className="border-t border-border pt-4">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <div className="text-[11px] font-medium uppercase tracking-wider text-primary">
                        Final Project
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-primary border border-border-strong rounded-sm px-2 py-0.5">
                        {e.project.grade}
                      </span>
                    </div>
                    <h4 className="font-display text-base lg:text-lg font-medium leading-tight">
                      {e.project.title}
                    </h4>
                    <p className="mt-2 text-[14px] lg:text-[15px] leading-relaxed text-foreground/80">
                      {e.project.body}
                    </p>
                  </div>
                ) : null}

                {e.achievement && (
                  <div className="border-t border-border pt-4">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-primary mb-2">
                      Achievement
                    </div>
                    <p className="text-[14px] lg:text-[15px] leading-relaxed text-foreground/85">
                      {e.achievement}
                    </p>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section code="01.03" title="Skills">
        <div className="grid sm:grid-cols-2 gap-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 80}>
              <div className="hover-lift border border-border rounded-sm p-5 bg-card hover:border-primary/60 h-full">
                <div className="text-[13px] font-medium uppercase tracking-wider text-primary mb-3">
                  {s.group}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map(it => (
                    <li
                      key={it.name}
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-border-strong rounded-sm text-[13px] font-medium text-foreground/90 transition-colors hover:border-primary/60 hover:text-foreground"
                    >
                      <img
                        src={it.icon}
                        alt=""
                        width={16}
                        height={16}
                        loading="lazy"
                        className="h-4 w-4"
                      />
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
