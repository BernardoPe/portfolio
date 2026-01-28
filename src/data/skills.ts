import typescriptIcon from '../assets/tech/typescript.svg';
import javascriptIcon from '../assets/tech/javascript.svg';
import javaIcon from '../assets/tech/java.svg';
import kotlinIcon from '../assets/tech/kotlin.svg';
import nodejsIcon from '../assets/tech/nodejs.svg';
import quarkusIcon from '../assets/tech/quarkus.svg';
import springIcon from '../assets/tech/spring.svg';
import dockerIcon from '../assets/tech/docker.svg';
import postgresqlIcon from '../assets/tech/postgresql.svg';
import reactIcon from '../assets/tech/react.svg';
import tailwindIcon from '../assets/tech/tailwind.svg';
import androidIcon from '../assets/tech/android.svg';
import jmeterIcon from '../assets/tech/jmeter.svg';
import goIcon from '../assets/tech/go.svg';
import gitIcon from '../assets/tech/git.svg';
import mongodbIcon from '../assets/tech/mongodb.svg';
import firestoreIcon from '../assets/tech/firestore.svg';
import prismaIcon from '../assets/tech/prisma.svg';
import expressIcon from '../assets/tech/express.svg';
import webpackIcon from '../assets/tech/webpack.svg';
import viteIcon from '../assets/tech/vite.svg';
import nginxIcon from '../assets/tech/nginx.svg';
import gcpIcon from '../assets/tech/gcp.svg';
import githubActionsIcon from '../assets/tech/github-actions.svg';

import type { SkillCategory } from '../types/skills';

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    skills: [
      { name: 'Java', icon: javaIcon },
      { name: 'Kotlin', icon: kotlinIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'JavaScript', icon: javascriptIcon },
      { name: 'Go', icon: goIcon },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: nodejsIcon },
      { name: 'Quarkus', icon: quarkusIcon },
      { name: 'Spring', icon: springIcon },
      { name: 'PostgreSQL', icon: postgresqlIcon },
      { name: 'MongoDB', icon: mongodbIcon },
      { name: 'Firestore', icon: firestoreIcon },
      { name: 'Prisma', icon: prismaIcon },
      { name: 'Express.js', icon: expressIcon },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { name: 'React', icon: reactIcon },
      { name: 'Tailwind CSS', icon: tailwindIcon },
      { name: 'Android', icon: androidIcon },
      { name: 'Webpack', icon: webpackIcon },
      { name: 'Vite', icon: viteIcon },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure & DevOps',
    skills: [
      { name: 'Docker', icon: dockerIcon },
      { name: 'JMeter', icon: jmeterIcon },
      { name: 'Nginx', icon: nginxIcon },
      { name: 'GCP', icon: gcpIcon },
      { name: 'GitHub Actions', icon: githubActionsIcon },
      { name: 'Git', icon: gitIcon },
    ],
  },
];

export default SKILL_CATEGORIES;
