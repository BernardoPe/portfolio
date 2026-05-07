import { ROUTES } from '@/data/routes';

export interface NavigationItem {
  to: string;
  code: string;
  label: string;
  description?: string;
}

export const NAV_ITEMS: NavigationItem[] = [
  { to: ROUTES.home, label: 'Home', code: '00' },
  {
    to: ROUTES.experience,
    label: 'Experience',
    code: '01',
    description: 'My experience, education and skills',
  },
  {
    to: ROUTES.projects,
    label: 'Projects',
    code: '02',
    description: "Things I've worked on",
  },
  {
    to: ROUTES.aiChat,
    label: 'AI Chat',
    code: '03',
    description: 'Ask me anything',
  },
  {
    to: ROUTES.contact,
    label: 'Contact',
    code: '04',
    description: 'Get in touch',
  },
];

export const HOME_NAV_CARDS: NavigationItem[] = NAV_ITEMS.filter((item) => item.description);
