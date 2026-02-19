import React from 'react';
import type { SkillCategory } from '../../types/skills';
import SkillBadge from './SkillBadge';

interface Props {
  category: SkillCategory;
}

export default function SkillCategory({ category }: Props): React.JSX.Element {
  return (
    <div className="bg-secondary rounded-xl px-7 py-5 shadow-lg">
      <h4 className="text-lg md:text-xl font-semibold color-primary">{category.title}</h4>
      <div className="grid grid-cols-2 md:flex gap-2 pt-2">
        {category.skills.map((s, i) => (
          <SkillBadge key={i} skill={s} />
        ))}
      </div>
    </div>
  );
}
