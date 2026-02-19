import React from 'react';
import type { EducationEntry } from '../../types/education';

interface Props {
  entry: EducationEntry;
}

export default function EducationCard({ entry }: Props): React.JSX.Element {
  return (
    <div className="bg-secondary rounded-xl px-7 py-5 shadow-lg w-full max-w-[44rem] mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-5">
        {entry.logo && (
          <img
            src={entry.logo}
            alt={entry.institution}
            className="w-20 h-20 object-contain rounded-md flex-shrink-0"
          />
        )}
        <div className="flex-1 md:mt-4 mt-0 text-center md:text-left">
          <h4 className="text-lg md:text-2xl font-semibold color-primary ">{entry.title}</h4>
          <div className="flex gap-3 flex-wrap py-2 items-center justify-center md:justify-start">
            {entry.institutionUrl ? (
              <a
                href={entry.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base color-secondary"
              >
                {entry.institution}
              </a>
            ) : (
              <span className="color-secondary text-sm md:text-base">{entry.institution}</span>
            )}
            {entry.grade && (
              <span className="text-sm bg-emerald-800 color-primary rounded-full px-3 py-1">
                {entry.grade}
              </span>
            )}
          </div>
          {entry.bullets && entry.bullets.length > 0 && (
            <p className="color-tertiary text-sm md:text-base">{entry.bullets[0]}</p>
          )}
        </div>
      </div>

      {entry.finalProject && (
        <div className="border-t border-white/10 pt-4 mb-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <h5 className="color-secondary text-sm uppercase tracking-wide mb-1">
                Final Project
              </h5>
              <div className="color-primary text-lg font-semibold mb-1">
                {entry.finalProject.title}
              </div>
              {entry.finalProject.description && (
                <p className="text-sm md:text-base color-tertiary">
                  {entry.finalProject.description}
                </p>
              )}
            </div>
            {entry.finalProject.grade && (
              <span className="text-sm bg-slate-700 color-primary rounded-full px-3 py-1 flex-shrink-0">
                {entry.finalProject.grade}
              </span>
            )}
          </div>
        </div>
      )}

      {entry.achievements && entry.achievements.length > 0 && (
        <div className="border-t border-white/10 pt-4 mb-4">
          <h5 className="color-secondary text-sm uppercase tracking-wide mb-2">Achievements</h5>
          <p className="text-sm md:text-base color-tertiary">{entry.achievements.join(' • ')}</p>
        </div>
      )}
    </div>
  );
}
