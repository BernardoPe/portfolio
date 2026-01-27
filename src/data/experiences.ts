import skyLogo from '../assets/sky-logo.png';

export interface Experience {
  id: string;
  company: string;
  position: string;
  logoUrl: string;
  start: string;
  end?: string;
  bullets: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: 'sky',
    company: 'Sky Portugal',
    position: 'Apprentice Developer',
    start: 'July 2025',
    end: 'August 2025',
    logoUrl: skyLogo,
    bullets: [
      "Developed and delivered a Lightning.js-based testing tool that streamlined deeplink testing processes, improving testing speed for QA's",
      "Implemented cross-platform and cross-device testing across Sky's streaming ecosystem (Peacock, SkyShowtime, NOW, Showmax) for LG and Samsung devices",
      'Improved technical skills in front-end development while working collaboratively in an agile environment with version control workflows',
    ],
  },
];

export default EXPERIENCES;
