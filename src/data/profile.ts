import { ROUTES } from '@/data/routes';

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
  display: string;
  external: boolean;
}

export const PROFILE = {
  name: 'Bernardo Pereira',
  headline: 'Computer Science Student',
  signatureSrc: '/assets/signature.png',
  resumeUrl: 'https://www.bernardope.com/resume.pdf',
  email: 'bernardo.correia.pereira@gmail.com',
  location: 'Lisbon, Portugal',
  responseTime: '~24h',
  routes: ROUTES,
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/bernardope',
    display: 'github.com/bernardope',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bernardope',
    display: 'linkedin.com/in/bernardope',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${PROFILE.email}`,
    display: PROFILE.email,
    external: false,
  },
];

export const SOCIAL_LINKS_BY_ID: Record<SocialLink['id'], SocialLink> = {
  github: SOCIAL_LINKS[0],
  linkedin: SOCIAL_LINKS[1],
  email: SOCIAL_LINKS[2],
};
