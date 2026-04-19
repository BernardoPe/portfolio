import type { Metadata } from 'next';

export interface RichTextSegment {
  type: 'text' | 'strong' | 'link';
  text: string;
  href?: string;
}

export type RichTextBlock = RichTextSegment[];

export const HOME_METADATA: Metadata = {
  title: 'Bernardo Pereira - Software Engineer & MSc Student',
  description:
    'MSc Computer Science student at Instituto Superior Técnico. Building backend systems, JVM tooling, and developer experiences.',
};

export const HOME_CONTENT = {
  heroCode: '00 - Hello',
  subtitleSegments: [
    { type: 'text', text: 'MSc student in Computer Science & Engineering at ' },
    { type: 'strong', text: 'Instituto Superior Técnico' },
    { type: 'text', text: ' & Contributor to ' },
    { type: 'strong', text: 'HtmlFlow' },
    { type: 'text', text: '.' },
  ] as RichTextBlock,
  aboutCode: '00.01 - About',
  aboutParagraphs: [
    [
      {
        type: 'text',
        text: "Hi there! I'm a Lisbon-based computer science student, currently finishing my MSc in Computer Science & Engineering at ",
      },
      { type: 'strong', text: 'Instituto Superior Técnico' },
      { type: 'text', text: ". I hold a bachelor's degree from " },
      { type: 'strong', text: 'Instituto Superior de Engenharia de Lisboa' },
      { type: 'text', text: ', and my main interests are distributed systems and cybersecurity.' },
    ],
    [
      { type: 'text', text: "I'm also a maintainer of " },
      { type: 'link', text: 'HtmlFlow', href: 'https://github.com/xmlet/HtmlFlow' },
      {
        type: 'text',
        text: ', a Java/Kotlin DSL for type-safe HTML generation. Most recently I was an Apprentice Developer at ',
      },
      { type: 'strong', text: 'Sky Portugal' },
      {
        type: 'text',
        text: ', where I built a Lightning.js tool that streamlined deeplink QA across Peacock, SkyShowtime, NOW, and Showmax on LG and Samsung TVs.',
      },
    ],
  ] as RichTextBlock[],
  primaryCta: {
    label: 'View projects',
    href: '/projects',
  },
  secondaryCta: {
    label: 'Contact',
    href: '/contact',
  },
  resumeLabel: 'Resume',
} as const;
