const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

function devIcon(slug: string, variant: string = 'original'): string {
  return `${DEVICON_BASE}/${slug}/${slug}-${variant}.svg`;
}

export const DEV_ICONS = {
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
  discord: devIcon('discordjs'),
  cloudflareworkers: devIcon('cloudflareworkers'),
} as const;

export type DevIconSlug = keyof typeof DEV_ICONS;

export function getDevIcon(slug: DevIconSlug): string {
  return DEV_ICONS[slug];
}
