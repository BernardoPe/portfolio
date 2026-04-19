import type { Metadata } from 'next';
import type { DevIconSlug } from '@/data/devIcons';

export interface SkillItem {
  name: string;
  icon: DevIconSlug;
}

export interface SkillGroup {
  group: string;
  items: SkillItem[];
}

export interface EducationProject {
  title: string;
  grade: string;
  body: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  url: string;
  logo: string;
  grade: string;
  project?: EducationProject;
  achievement?: string;
}

export const EXPERIENCE_METADATA: Metadata = {
  title: 'Experience - Bernardo Pereira',
  description: 'Experience, education, and technical skills of Bernardo Pereira',
};

export const EXPERIENCE_PAGE_CONTENT = {
  headerIndex: '01',
  headerTitle: 'Experience / Education / Skills',
  headerSubtitle: 'My experience, education, and technical skills',
  sectionExperienceCode: '01.01',
  sectionEducationCode: '01.02',
  sectionSkillsCode: '01.03',
} as const;

export const EXPERIENCE_ENTRY = {
  role: 'Apprentice Developer',
  company: 'Sky Portugal',
  period: 'Jul 2025 - Aug 2025',
  logo: '/assets/sky-logo.png',
  bullets: [
    'Developed and delivered a Lightning.js-based testing tool that streamlined deeplink testing, improving QA testing speed.',
    "Implemented cross-platform and cross-device testing across Sky's streaming ecosystem (Peacock, SkyShowtime, NOW, Showmax) for LG and Samsung devices.",
    'Improved technical skills in front-end development, working in an agile environment with version control workflows.',
  ],
} as const;

export const EDUCATION: EducationItem[] = [
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
    achievement: 'Merit award for academic excellence, academic years 2022/2023 and 2024/2025.',
  },
];

export const SKILLS: SkillGroup[] = [
  {
    group: 'Languages',
    items: [
      { name: 'Java', icon: 'java' },
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Go', icon: 'go' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Quarkus', icon: 'quarkus' },
      { name: 'Spring', icon: 'spring' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'Express', icon: 'express' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Android', icon: 'android' },
      { name: 'Webpack', icon: 'webpack' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    group: 'Cloud / DevOps',
    items: [
      { name: 'Docker', icon: 'docker' },
      { name: 'JMeter', icon: 'apachejmeter' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'GCP', icon: 'googlecloud' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Git', icon: 'git' },
    ],
  },
];
