export interface AppRoute {
  label: string;
  path: string;
}

export const NAV_ROUTES: AppRoute[] = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'AI Chat', path: '/chat' },
  { label: 'Contact', path: '/contact' },
];
