export enum SectionId {
  Home = 'home',
  About = 'about',
  Education = 'education',
  Experience = 'experience',
  Projects = 'projects',
  Skills = 'skills',
  Chat = 'AI Chat',
  Contact = 'contact',
}

export const ALL_SECTIONS: SectionId[] = [
  SectionId.Home,
  SectionId.About,
  SectionId.Experience,
  SectionId.Education,
  SectionId.Projects,
  SectionId.Skills,
  SectionId.Chat,
  SectionId.Contact,
];

export default SectionId;
