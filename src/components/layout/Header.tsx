import React, { useEffect } from 'react';
import Link from '../ui/Link';
import signature from '../../assets/signature.png';
import { ALL_SECTIONS } from '../../types/sections';
import { capitalize } from '../../utils/strings';

function Header(): React.JSX.Element {
  const [bgTransparent, setBgTransparent] = React.useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgTransparent(scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bgTransparent]);

  return (
    <header
      className={`sm:px-16 px-6 w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${bgTransparent ? 'bg-transparent' : 'bg-primary shadow-md'}`}
    >
      <div className="w-full flex justify-between items-center max-w-6xl mx-auto">
        <span
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {'</'}
          <img src={signature} alt="Signature" className="inline-block w-20 h-10  -mr-4" />
          {'>'}
        </span>
        <nav>
          <ul className="list-none hidden sm:flex flex-row gap-2">
            {ALL_SECTIONS.map((sectionId, i) => (
              <Link key={i} id={sectionId}>
                {capitalize(sectionId)}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
