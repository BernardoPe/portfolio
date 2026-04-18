import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Reveal } from '../components/site/Reveal';

export const metadata: Metadata = {
  title: 'Bernardo Pereira - Software Engineer & MSc Student',
  description:
    'MSc Computer Science student at Instituto Superior Técnico. Building backend systems, JVM tooling, and developer experiences.',
};

const NAV_CARDS = [
  ['01', 'Experience', 'My experience, education and skills', '/work'],
  ['02', 'Projects', "Things I've worked on", '/projects'],
  ['03', 'AI Chat', 'Ask me anything', '/ai-chat'],
  ['04', 'Contact', 'Get in touch', '/contact'],
] as const;

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-8 pb-8 lg:pt-12 lg:pb-12">
          <div
            className="max-w-3xl"
            style={{ animation: 'reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both' }}
          >
            <div className="text-[16px] font-medium uppercase tracking-[0.18em] text-primary mb-4">
              00 - Index / Hello
            </div>

            <h1 className="font-display text-[2.4rem] sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
              Bernardo Pereira
              <span className="block text-muted-foreground mt-3 text-2xl sm:text-3xl lg:text-4xl">
                Computer Science Student
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              MSc student in Computer Science & Engineering at{' '}
              <span className="text-foreground">Instituto Superior Técnico</span> & Contributor to{' '}
              <span className="text-foreground">HtmlFlow</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/projects"
                className="group hover-lift inline-flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground rounded-sm text-[12px] font-medium hover:bg-primary/90 transition-colors"
              >
                View projects <ArrowUpRight size={13} className="arrow-shift" />
              </Link>
              <Link
                href="/contact"
                className="hover-lift inline-flex items-center gap-2 px-3.5 py-2 border border-border-strong rounded-sm text-[12px] font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <a
                href="https://www.bernardope.com/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hover-lift inline-flex items-center gap-2 px-3.5 py-2 border border-border-strong rounded-sm text-[12px] font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <FileText size={13} /> Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-8 lg:py-6 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <Reveal className="lg:col-span-3">
            <div className="flex items-center gap-2 text-[12px] font-medium uppercase text-primary">
              <span className="h-px w-6 bg-primary/60" />
              00.01 - About
            </div>
          </Reveal>

          <div className="lg:col-span-9 space-y-5 text-base lg:text-[17px] leading-relaxed text-foreground/85">
            <Reveal delay={80}>
              <p>
                Hi there! I&apos;m a Lisbon-based computer science student, currently finishing my
                MSc in Computer Science & Engineering at{' '}
                <span className="text-foreground font-medium">Instituto Superior Técnico</span>. I
                hold a bachelor&apos;s degree from{' '}
                <span className="text-foreground font-medium">
                  Instituto Superior de Engenharia de Lisboa
                </span>
                , and my main interests are distributed systems and cybersecurity.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p>
                I&apos;m also a maintainer of{' '}
                <a
                  href="https://github.com/xmlet/HtmlFlow"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline underline-offset-4"
                >
                  HtmlFlow
                </a>
                , a Java/Kotlin DSL for type-safe HTML generation. Most recently I was an Apprentice
                Developer at <span className="text-foreground">Sky Portugal</span>, where I built a
                Lightning.js tool that streamlined deeplink QA across Peacock, SkyShowtime, NOW, and
                Showmax on LG and Samsung TVs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-8 lg:py-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {NAV_CARDS.map(([code, title, desc, to], i) => (
            <Link
              key={code}
              href={to}
              className="group hover-lift border border-border rounded-sm bg-card p-6 lg:p-7 hover:border-primary/60 hover:shadow-[0_8px_30px_-12px_oklch(0.78_0.16_55_/_0.25)]"
              style={{
                animation: `reveal-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms both`,
              }}
            >
              <div className="text-[13px] font-medium text-primary mb-3">{code}</div>
              <div className="font-display text-2xl xl:text-[1.65rem] font-medium flex items-center justify-between gap-2">
                {title}
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
              <div className="text-sm text-muted-foreground mt-2">{desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
