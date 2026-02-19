import React from 'react';
import Section from './ui/Section';
import SectionId from '../types/sections';
import SKILL_CATEGORIES from '../data/skills';
import SkillCategory from './ui/SkillCategory';

export default function SkillsSection(): React.JSX.Element {
  return (
    <Section id={SectionId.Skills} title="My Toolbox" subtitle="Skills & Technologies.">
      <div className="w-full relative px-4 pt-6">
        <div className="flex flex-col gap-6">
          {SKILL_CATEGORIES.map(cat => (
            <SkillCategory key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
