import React from 'react';
import Section from './ui/Section';
import SectionId from '../types/sections';
import PROJECTS from '../data/projects';
import ProjectCard from './ui/ProjectCard';

export default function ProjectsSection(): React.JSX.Element {
  return (
    <Section id={SectionId.Projects} title="Things I've Built" subtitle="Projects.">
      <div className="w-full relative px-4 pt-8">
        <div className="flex flex-col gap-8 items-center">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
