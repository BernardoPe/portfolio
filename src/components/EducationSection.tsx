import React from 'react';
import Section from './ui/Section';
import SectionId from '../types/sections';
import EDUCATION from '../data/education';
import EducationCard from './ui/EducationCard';

export default function EducationSection(): React.JSX.Element {
  return (
    <Section id={SectionId.Education} title="What I have studied so far" subtitle="Education.">
      <div className="w-full relative px-4 pt-8">
        <div className="flex flex-col gap-8">
          {EDUCATION.map(item => (
            <EducationCard key={item.id} entry={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
