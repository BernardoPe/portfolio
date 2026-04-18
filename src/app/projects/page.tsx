import type { Metadata } from 'next';
import { Github } from 'lucide-react';
import { PageHeader } from '../../components/site/SiteLayout';
import { Reveal } from '../../components/site/Reveal';

export const metadata: Metadata = {
  title: 'Projects - Bernardo Pereira',
  description:
    'Selected projects: HtmlFlow, Non-Blocking Progressive SSR Benchmark, Musyk Discord bot, Instant Messaging app, and more.',
};

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const devIcon = (slug: string, variant: string = 'original'): string =>
  `${DEVICON_BASE}/${slug}/${slug}-${variant}.svg`;

const ICONS: Record<string, string> = {
  java: devIcon('java'),
  kotlin: devIcon('kotlin'),
  spring: devIcon('spring'),
  quarkus: devIcon('quarkus'),
  apachejmeter: devIcon('apache'),
  nodedotjs: devIcon('nodejs'),
  typescript: devIcon('typescript'),
  discord: devIcon('discordjs'),
  postgresql: devIcon('postgresql'),
  react: devIcon('react'),
  docker: devIcon('docker'),
  android: devIcon('android'),
  tailwindcss: devIcon('tailwindcss'),
  cloudflareworkers: devIcon('cloudflareworkers'),
};

const icon = (slug: keyof typeof ICONS): string => ICONS[slug];

const PROJECTS = [
  {
    code: 'P01',
    name: 'HtmlFlow',
    tagline: 'Java/Kotlin DSL for typesafe HTML generation',
    body: 'Maintainer of HtmlFlow, a Java/Kotlin DSL library for typesafe HTML generation. HtmlFlow features support for declaring HTML 5.2 compliant templates in code with compile-time safety, supports synchronous and asynchronous rendering, and is also one of the most performant HTML generation libraries in the JVM ecosystem.',
    stack: [
      { name: 'Java', icon: icon('java') },
      { name: 'Kotlin', icon: icon('kotlin') },
    ],
    url: 'https://github.com/xmlet/HtmlFlow',
  },
  {
    code: 'P02',
    name: 'Non-Blocking Progressive SSR Benchmark',
    tagline: 'Benchmarking non-blocking PSSR techniques in Java',
    body: 'Developed a benchmark to evaluate the performance of different non-blocking Progressive Server-Side Rendering (PSSR) techniques in Java and Kotlin including reactive programming, coroutines, and virtual threads.',
    stack: [
      { name: 'Java', icon: icon('java') },
      { name: 'Kotlin', icon: icon('kotlin') },
      { name: 'Spring', icon: icon('spring') },
      { name: 'Quarkus', icon: icon('quarkus') },
      { name: 'JMeter', icon: icon('apachejmeter') },
    ],
    url: 'https://github.com/xmlet/comparing-non-blocking-progressive-ssr',
  },
  {
    code: 'P03',
    name: 'Musyk',
    tagline: 'A Discord bot for music playback',
    body: 'Feature-rich Discord bot enabling high-quality music playback in voice channels. Supports YouTube, Spotify, playlists, search, and friendly playback controls.',
    stack: [
      { name: 'Node.js', icon: icon('nodedotjs') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'Discord.js', icon: icon('discord') },
    ],
    url: 'https://github.com/BernardoPe/musyk',
  },
  {
    code: 'P04',
    name: 'Instant Messaging',
    tagline: 'Real-time instant messaging web application',
    body: 'Real-time messaging app using Server-Sent Events for live updates with a typed Kotlin/Spring backend and React/Android clients.',
    stack: [
      { name: 'Kotlin', icon: icon('kotlin') },
      { name: 'Spring', icon: icon('spring') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'PostgreSQL', icon: icon('postgresql') },
      { name: 'React', icon: icon('react') },
      { name: 'Docker', icon: icon('docker') },
      { name: 'Android', icon: icon('android') },
    ],
    url: 'https://github.com/BernardoPe/instant-messaging',
  },
  {
    code: 'P05',
    name: 'Personal Website',
    tagline: 'This portfolio',
    body: "The site you're reading. Built with React + TypeScript, styled with Tailwind, deployed on Cloudflare Workers.",
    stack: [
      { name: 'React', icon: icon('react') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'Tailwind CSS', icon: icon('tailwindcss') },
      { name: 'Cloudflare Workers', icon: icon('cloudflareworkers') },
    ],
    url: 'https://github.com/BernardoPe/portfolio',
  },
];

export default function ProjectsPage(): React.JSX.Element {
  return (
    <>
      <PageHeader index="02" title="Projects" subtitle="Things I've built or contributed to." />

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
                    <Github size={13} /> repo
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
                      <img
                        src={s.icon}
                        alt=""
                        width={16}
                        height={16}
                        loading="lazy"
                        className="h-4 w-4"
                      />
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
