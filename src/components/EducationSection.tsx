import React from 'react';
import Section from './ui/Section';
import SectionId from '../types/sections';
import EDUCATION from '../data/education';
import EducationNode from './ui/EducationNode';

export default function EducationSection(): React.JSX.Element {
  return (
    <Section id={SectionId.Education} title="What I have studied so far" subtitle="Education.">
      <div className="w-full relative px-4 pt-4">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-4 bottom-0 w-[4px] bg-white/90" />
        <div className="space-y-12">
          {EDUCATION.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={item.id} className="grid md:grid-cols-3 items-center">
                <div>
                  {isLeft && (
                    <div className="relative">
                      <div className="bg-secondary rounded-xl p-8 shadow-lg w-[500px]">
                        <h4 className="text-2xl font-semibold text-white mb-2">{item.title}</h4>
                        <div className="text-sm text-gray-400 mb-4">{item.institution}</div>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300">
                          {item.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-1 flex justify-center z-20">
                  <EducationNode logo={item.logo} label={item.institution} />
                </div>

                {!isLeft && (
                  <div className="relative">
                    <div className="bg-secondary rounded-xl p-8 shadow-lg w-[500px]">
                      <h4 className="text-2xl font-semibold text-white mb-2">{item.title}</h4>
                      <div className="text-sm text-gray-400 mb-4">{item.institution}</div>
                      <ul className="list-disc pl-5 space-y-2 text-gray-300">
                        {item.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
