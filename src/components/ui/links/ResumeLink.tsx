import React from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function ResumeLink({ children = 'Resume', className = '' }: Props) {
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Resume"
      className={`inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-3 py-2 text-sm font-medium text-white hover:bg-black/10 hover:scale-110 transition-all duration-200 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-white"
        aria-hidden
      >
        <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8.414A2 2 0 0019.414 7L14 1.586A2 2 0 0012.586 1H6zm7 2.5L19.5 9H13a1 1 0 01-1-1V4.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
      </svg>
      <span className="text-white">{children}</span>
    </a>
  );
}
