export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}
