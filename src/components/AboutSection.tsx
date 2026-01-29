import me from '../assets/me.jpg';
import Section from './ui/Section';
import GitHubLink from './ui/links/GithubLink';
import LinkedInLink from './ui/links/LinkedinLink';
import ResumeLink from './ui/links/ResumeLink';
import SteamLink from './ui/links/SteamLink';
import SectionId from '../types/sections';

function AboutSection(): React.JSX.Element {
  return (
    <Section id={SectionId.About} title="Introduction" subtitle="Who am I?">
      <div className="w-full flex flex-col md:flex-row h-full gap-10 mb-16 pt-8">
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <img
            src={me}
            alt="My Photo"
            className="w-75 h-75 rounded-full object-cover ring-4 ring-white/20 shadow-lg"
          />

          <div className="mt-4 flex items-center gap-3">
            <GitHubLink />
            <LinkedInLink />
            <SteamLink />
            <ResumeLink>CV</ResumeLink>
          </div>
        </div>

        <div className="md:w-2/3">
          <ul className="mt-4 max-w-3xl space-y-6 list-none color-tertiary text-lg">
            <li className="flex items-start">
              <span className="mr-3">🎓</span>
              I'm a student currently working towards my Master's degree in Computer Science at
              Instituto Superior Técnico. Currently, I hold a bachelor's degree from Instituto
              Superior de Engenharia de Lisboa.
            </li>
            <li className="flex items-start">
              <span className="mr-3">💼</span>
              I'm interested in pursuing a career in software engineering at tech companies with
              impactful products.
            </li>
            <li className="flex items-start">
              <span className="mr-3">🔭</span>
              My main areas of interest are Distributed Systems and Cloud Computing.
            </li>
            <li className="flex items-start">
              <span className="mr-3">🧑‍💻</span>I am familiar with various programming languages,
              including Kotlin, Java, JavaScript, TypeScript and Go.
            </li>
            <li className="flex items-start">
              <span className="mr-3">☁️</span>I have experience with cloud platforms such as AWS and
              GCP.
            </li>
            <li className="flex items-start">
              <span className="mr-3">🎮</span>
              Aside from coding, I enjoy playing games with friends, playing the piano, and watching
              anime. I'm currently playing Kingdom Come: Deliverance II 🛡️⚔️ and Balatro 🃏 in my
              free time!
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default AboutSection;
