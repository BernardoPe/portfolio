import React from 'react';

interface RoundedIconProps {
  href: string;
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export default function RoundedIcon({
  href,
  ariaLabel,
  children,
  className = '',
}: RoundedIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`w-9 h-9 rounded-full flex items-center justify-center
         bg-transparent hover:bg-black/10 transition-all duration-200
         hover:scale-110
         ${className}`}
    >
      {children}
    </a>
  );
}
