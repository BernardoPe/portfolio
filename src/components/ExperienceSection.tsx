import React, { useState } from 'react';
import Section from './ui/Section';
import SectionId from '../types/sections';
import EXPERIENCES from '../data/experiences';
import ExperienceItem from './ui/ExperienceItem';

export default function ExperienceSection(): React.JSX.Element {
  const [selected, setSelected] = useState(0);
  const exp = EXPERIENCES[selected];

  return (
    <Section id={SectionId.Experience} title="My Professional Journey" subtitle="Work Experience.">
      <div className="w-full flex flex-col md:flex-row h-full gap-10 mb-16 pt-8">
        <div className="md:w-1/3">
          {EXPERIENCES.map((e, idx) => (
            <ExperienceItem
              key={e.id}
              company={e.company}
              position={e.position}
              active={idx === selected}
              logoUrl={e.logoUrl}
              onClick={() => setSelected(idx)}
            />
          ))}
        </div>

        <div className="md:w-2/3 bg-secondary rounded-xl p-8 shadow-lg min-h-45">
          <h3 className="text-2xl font-semibold mb-2">{exp.position}</h3>
          <div className="text-lg color-secondary mb-2">{exp.company}</div>
          <div className="text-lg color-secondary mb-4">
            {exp.start} {exp.end ? ` - ${exp.end}` : ''}
          </div>

          <ul className="list-disc pl-5 space-y-2 color-tertiary text-sm md:text-base">
            {exp.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
