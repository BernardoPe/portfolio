export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  start: string;
  end?: string;
  bullets: string[];
  logo?: string;
}

const EDUCATION: EducationEntry[] = [
  {
    id: 'testuni',
    title: 'Bachelor of Software Engineering',
    institution: 'Test University',
    start: '2022',
    end: 'Present',
    bullets: ['GPA: 3.8/4.0', 'Relevant Courses: Data Structures, Algorithms, Web Development'],
    logo: undefined,
  },
  {
    id: 'testuni2',
    title: 'Bachelor of Computer Science',
    institution: 'Test University',
    start: '2018',
    end: '2022',
    bullets: ['GPA: 3.7/4.0', 'Relevant Courses: Operating Systems, Database Systems, Networking'],
    logo: undefined,
  },
];

export default EDUCATION;
