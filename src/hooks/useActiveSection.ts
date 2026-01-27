import { useEffect, useState } from 'react';
import { SectionId } from '../types/sections';

export function useActiveSection(sectionIds: SectionId[]) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    let ticking = false;

    const computeActive = () => {
      const viewportHeight = window.innerHeight;

      let bestId: SectionId | null = null;
      let bestVisible = 0;

      for (const id of sectionIds) {
        const el = document.getElementById(String(id));
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > bestVisible) {
          bestVisible = visibleHeight;
          bestId = id;
        }
      }

      setActive(prev => (bestId !== prev ? bestId : prev));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    computeActive();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  return active;
}

export default useActiveSection;
