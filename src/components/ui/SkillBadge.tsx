import React from 'react';
import type { Skill } from '../../types/skills';

interface Props {
  skill: Skill;
}

export default function SkillBadge({ skill }: Props): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-2 w-28">
      <div className="w-14 h-14 flex items-center justify-center bg-slate-700/10 rounded-full">
        {skill.icon ? (
          <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-sm font-semibold color-primary">{skill.name.charAt(0)}</span>
        )}
      </div>
      <div className="text-sm color-secondary text-center break-words">{skill.name}</div>
    </div>
  );
}
