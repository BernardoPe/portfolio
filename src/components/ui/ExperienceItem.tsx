import React from 'react';

interface Props {
  company: string;
  position: string;
  logoUrl: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ExperienceItem({
  company,
  position,
  active = false,
  logoUrl = '/default-company-logo.png',
  onClick,
}: Props): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 pl-6 rounded-xl text-left transition-all duration-200 border-none cursor-pointer ${
        active ? 'bg-secondary ring-1 ring-white/10' : 'bg-transparent'
      }`}
    >
      <img src={logoUrl} alt={`${company} logo`} className="w-16 h-16 object-contain rounded-md" />
      <div>
        <div className="font-semibold text-white">{position}</div>
        <div className="text-sm text-tertiary">{company}</div>
      </div>
    </button>
  );
}
