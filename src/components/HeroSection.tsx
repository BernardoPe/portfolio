import heroBg from '../assets/hero-bg.jpg';
import GitHubLink from './ui/links/GithubLink';
import LinkedInLink from './ui/links/LinkedinLink';
import ResumeLink from './ui/links/ResumeLink';
import wavingHand from '../assets/waving-hand.png';

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
        <p className="text-xl md:text-xl color-secondary max-w-6xl">
          Lisbon, Portugal &#8226; MSc student @ Instituto Superior Técnico
        </p>
        <p className="text-xl md:text-xl color-primary max-w-6xl">
          Hi there!
          <img src={wavingHand} alt="Waving Hand" className="inline-block w-8 h-8 mr-2" />
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
