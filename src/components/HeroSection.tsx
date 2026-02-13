import { useState } from 'react';
import heroBg from '../assets/hero-bg.jpg';
import GitHubLink from './ui/links/GithubLink';
import LinkedInLink from './ui/links/LinkedinLink';
import ResumeLink from './ui/links/ResumeLink';
import wavingHand from '../assets/waving-hand.png';

function HeroSection(): React.JSX.Element {
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 bg-[#050816]">
        <img
          src={heroBg}
          alt="Hero Background"
          onLoad={() => setIsBgLoaded(true)}
          className={`h-full w-full object-cover blur-[4px] brightness-80 transition-opacity duration-1000 ${
            isBgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center gap-5">
        <h1 className="text-5xl md:text-6xl 3xl:text-7xl font-bold tracking-tight">
          Bernardo Pereira
        </h1>
        <p className="text-xl md:text-xl 3xl:text-2xl color-secondary max-w-6xl">
          MSc student @ Instituto Superior Técnico
        </p>
        <p className="text-xl md:text-xl 3xl:text-2xl color-primary max-w-6xl">
          Hi there!
          <img
            src={wavingHand}
            alt="Waving Hand"
            className="inline-block w-8 h-8 3xl:w-10 3xl:h-10 mr-2"
          />
          Welcome to my website.
        </p>

        <div className="flex items-center justify-center mt-2 gap-4">
          <GitHubLink />
          <LinkedInLink />
          <ResumeLink />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
