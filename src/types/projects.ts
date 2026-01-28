export interface Technology {
  name: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  technologies: Technology[];
  githubUrl: string;
  liveUrl?: string;
}
