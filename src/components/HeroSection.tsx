import heroBg from '../assets/hero-bg.jpg';
import SectionId from '../types/sections';
import { navigateToSection } from '../utils/navigate';
import GitHubLink from './ui/links/github-link';
import LinkedInLink from './ui/links/linkedin-link';
import ResumeLink from './ui/links/resume-link';

function HeroSection(): React.JSX.Element {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="h-full w-full object-cover blur-[4px] brightness-80"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center gap-5">
        <h1 className="text-5xl md:text-6xl font-bold">Bernardo Pereira</h1>
        <p className="text-xl md:text-xl text-secondary max-w-6xl">
          Lisbon, Portugal &#8226; MSc student @ Instituto Superior Técnico
        </p>
        <p className="text-xl md:text-xl text-primary max-w-6xl">
          Hi there!
          <img
            src="https://em-content.zobj.net/source/microsoft-teams/337/waving-hand_1f44b.png"
            alt="Waving Hand"
            className="inline-block w-8 h-8 mr-2"
          />
          Welcome to my website.
        </p>

        <div className="flex items-center justify-center mt-2 gap-4">
          <GitHubLink />
          <LinkedInLink />
          <ResumeLink />
        </div>
      </div>

      <button
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer bg-transparent border-none"
        onClick={() => navigateToSection(SectionId.About)}
        aria-label="Scroll to About section"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </button>
    </section>
  );
}

export default HeroSection;
