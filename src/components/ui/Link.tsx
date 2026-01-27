import React from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { navigateToSection } from '../../utils/navigate';
import type SectionId from '../../types/sections';
import { ALL_SECTIONS } from '../../types/sections';

interface LinkProps {
  id: SectionId;
  children: React.ReactNode;
}

function Link({ id, children }: LinkProps): React.JSX.Element {
  const active = useActiveSection(ALL_SECTIONS);
  const isActive = active === id;

  return (
    <li onClick={() => navigateToSection(id)} className="cursor-pointer">
      <a
        className={`inline-flex items-center justify-center rounded-md min-w-[90px] px-4 py-2 text-[16px] font-medium
            transition-colors duration-300 ease-in-out border border-transparent
            ${isActive ? 'bg-black/20 text-white border-white/20' : 'text-white/70 hover:bg-black/40 hover:text-white hover:border-white/20'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </a>
    </li>
  );
}

export default Link;
