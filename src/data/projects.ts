import type { Metadata } from 'next';
import type { DevIconSlug } from './devIcons';

export interface ProjectStackItem {
  name: string;
  icon: DevIconSlug;
}

export interface ProjectItem {
  code: string;
  name: string;
  tagline: string;
  body: string;
  stack: ProjectStackItem[];
  url: string;
}

export const PROJECTS_METADATA: Metadata = {
  title: 'Projects - Bernardo Pereira',
  description:
    'Selected projects: HtmlFlow, Non-Blocking Progressive SSR Benchmark, Musyk Discord bot, Instant Messaging app, and more.',
};

export const PROJECTS_PAGE_CONTENT = {
  headerIndex: '02',
  headerTitle: 'Projects',
  headerSubtitle: "Things I've built or contributed to.",
  repoLabel: 'repo',
} as const;

export const PROJECTS: ProjectItem[] = [
  {
    code: 'P01',
    name: 'HtmlFlow',
    tagline: 'Java/Kotlin DSL for typesafe HTML generation',
    body: 'Maintainer of HtmlFlow, a Java/Kotlin DSL library for typesafe HTML generation. HtmlFlow features support for declaring HTML 5.2 compliant templates in code with compile-time safety, supports synchronous and asynchronous rendering, and is also one of the most performant HTML generation libraries in the JVM ecosystem.',
    stack: [
      { name: 'Java', icon: 'java' },
      { name: 'Kotlin', icon: 'kotlin' },
    ],
    url: 'https://github.com/xmlet/HtmlFlow',
  },
  {
    code: 'P02',
    name: 'Non-Blocking Progressive SSR Benchmark',
    tagline: 'Benchmarking non-blocking PSSR techniques in Java',
    body: 'Developed a benchmark to evaluate the performance of different non-blocking Progressive Server-Side Rendering (PSSR) techniques in Java and Kotlin including reactive programming, coroutines, and virtual threads.',
    stack: [
      { name: 'Java', icon: 'java' },
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Spring', icon: 'spring' },
      { name: 'Quarkus', icon: 'quarkus' },
      { name: 'JMeter', icon: 'apachejmeter' },
    ],
    url: 'https://github.com/xmlet/comparing-non-blocking-progressive-ssr',
  },
  {
    code: 'P03',
    name: 'Musyk',
    tagline: 'A Discord bot for music playback',
    body: 'Feature-rich Discord bot enabling high-quality music playback in voice channels. Supports YouTube, Spotify, playlists, search, and friendly playback controls.',
    stack: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Discord.js', icon: 'discord' },
    ],
    url: 'https://github.com/BernardoPe/musyk',
  },
  {
    code: 'P04',
    name: 'Instant Messaging',
    tagline: 'Real-time instant messaging web application',
    body: 'Real-time messaging app using Server-Sent Events for live updates with a typed Kotlin/Spring backend and React/Android clients.',
    stack: [
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Spring', icon: 'spring' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'React', icon: 'react' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Android', icon: 'android' },
    ],
    url: 'https://github.com/BernardoPe/instant-messaging',
  },
  {
    code: 'P05',
    name: 'Personal Website',
    tagline: 'This portfolio',
    body: "The site you're reading. Built with React + TypeScript, styled with Tailwind, deployed on Cloudflare Workers.",
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Cloudflare Workers', icon: 'cloudflareworkers' },
    ],
    url: 'https://github.com/BernardoPe/portfolio',
  },
];
