import type SectionId from '../types/sections';

export function navigateToSection(section: SectionId): void {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
