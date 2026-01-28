import discordIcon from '../assets/tech/discord.svg';
import dockerIcon from '../assets/tech/docker.svg';
import javaIcon from '../assets/tech/java.svg';
import jmeterIcon from '../assets/tech/jmeter.svg';
import kotlinIcon from '../assets/tech/kotlin.svg';
import postgresqlIcon from '../assets/tech/postgresql.svg';
import reactIcon from '../assets/tech/react.svg';
import springIcon from '../assets/tech/spring.svg';
import tailwindIcon from '../assets/tech/tailwind.svg';
import typescriptIcon from '../assets/tech/typescript.svg';
import nodejsIcon from '../assets/tech/nodejs.svg';
import androidIcon from '../assets/tech/android.svg';
import quarkusIcon from '../assets/tech/quarkus.svg';

import type { Project } from '../types/projects';

const PROJECTS: Project[] = [
  {
    id: 'HtmlFlow',
    title: 'HtmlFlow',
    subtitle: 'Java/Kotlin DSL for typesafe HTML generation',
    description:
      'Maintainer of HtmlFlow, a Java/Kotlin DSL library for typesafe HTML generation. ' +
      'HtmlFlow features support for declaring HTML 5.2 compliant templates in code with ' +
      'compile-time safety, supports synchronous and asynchronous rendering, and is also ' +
      'one of the most performant HTML generation libraries in the JVM ecosystem.',
    technologies: [
      { name: 'Java', icon: javaIcon },
      { name: 'Kotlin', icon: kotlinIcon },
    ],
    githubUrl: 'https://github.com/xmlet/HtmlFlow',
  },
  {
    id: 'PSSRBenchmark',
    title: 'Non-Blocking Progressive SSR Benchmark',
    subtitle: 'Benchmarking non-blocking PSSR techniques in Java',
    description:
      'Developed a benchmark to evaluate the performance of different non-blocking Progressive Server-Side Rendering (PSSR) techniques in Java and Kotlin ' +
      'including reactive programming, coroutines, and virtual threads. The benchmark assesses server throughputand resource utilization, ' +
      'providing insights into the viability of virtual threads for non-blocking PSSR with various external DSL engines, most of which block during rendering.',
    technologies: [
      { name: 'Java', icon: javaIcon },
      { name: 'Kotlin', icon: kotlinIcon },
      { name: 'Spring MVC & WebFlux', icon: springIcon },
      { name: 'Quarkus', icon: quarkusIcon },
      { name: 'JMeter', icon: jmeterIcon },
      { name: 'JMH' },
      { name: 'Apache Bench' },
    ],
    githubUrl: 'https://github.com/xmlet/comparing-non-blocking-progressive-ssr',
  },
  {
    id: 'Musyk',
    title: 'Musyk',
    subtitle: 'A discord bot for music playback',
    description:
      'Developed Musyk, a feature-rich Discord bot that enables high-quality music playback in voice channels. ' +
      'Musyk supports various music sources, including YouTube and Spotify, and offers features like playlists, ' +
      'search functionality, and user-friendly playback controls.',
    technologies: [
      { name: 'Node.js', icon: nodejsIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'Discord.js', icon: discordIcon },
    ],
    githubUrl: 'https://github.com/BernardoPe/musyk',
  },
  {
    id: 'InstantMessaging',
    title: 'Instant Messaging',
    subtitle: 'A real-time instant messaging web application',
    description:
      'Created a real-time instant messaging web application using Server-Sent Events (SSE) for live message updates. ' +
      'The application features user authentication, chat rooms, and a responsive design for seamless communication across devices. ' +
      'It features a Kotlin backend with Spring Boot, and both a web and Android client.',
    technologies: [
      { name: 'Kotlin', icon: kotlinIcon },
      { name: 'Spring MVC', icon: springIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'PostgreSQL', icon: postgresqlIcon },
      { name: 'React', icon: reactIcon },
      { name: 'Docker', icon: dockerIcon },
      { name: 'Android', icon: androidIcon },
    ],
    githubUrl: 'https://github.com/BernardoPe/instant-messaging',
  },
  {
    id: 'PersonalWebsite',
    title: 'Personal Website',
    subtitle: 'My personal portfolio website',
    description:
      'This very website you are browsing! Built with React and TypeScript, styled with Tailwind CSS, ' +
      'and deployed using Cloudflare Workers.',
    technologies: [
      { name: 'React', icon: reactIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'Tailwind CSS', icon: tailwindIcon },
    ],
    githubUrl: 'https://github.com/BernardoPe/portfolio',
    liveUrl: 'https://bernardope.com',
  },
];

export default PROJECTS;
