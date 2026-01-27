import React from 'react';
import RoundedIcon from '../RoundedIcon';

export default function LinkedInLink(): React.JSX.Element {
  return (
    <RoundedIcon
      href="https://www.linkedin.com/in/bernardope"
      ariaLabel="LinkedIn"
      className={'w-11 h-11 border-2 border-blue-700 hover:bg-black/10'}
    >
      <svg
        className="w-5 h-5 text-[#0A66C2]"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8h4.5V24h-4.5zM9 8h4.32v2.16h.06c.6-1.14 2.06-2.34 4.24-2.34C23.28 7.82 24 11.06 24 14.58V24h-4.5v-8.4c0-2.01-.04-4.6-2.8-4.6-2.8 0-3.23 2.2-3.23 4.46V24H9z" />
      </svg>
    </RoundedIcon>
  );
}
