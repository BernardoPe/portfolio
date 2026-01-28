export interface FinalProject {
  title: string;
  grade?: string;
  description?: string;
  link?: string;
}

export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  institutionUrl?: string;
  grade?: string;
  start: string;
  end?: string;
  bullets?: string[];
  logo?: string;
  achievements?: string[];
  finalProject?: FinalProject;
}
