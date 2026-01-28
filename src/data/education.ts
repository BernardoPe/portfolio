import iselLogo from '../assets/isel-logo.svg';
import istLogo from '../assets/ist-logo.svg';

import type { EducationEntry } from '../types/education';

const EDUCATION: EducationEntry[] = [
  {
    id: 'ist',
    title: 'MSc in Computer Science & Engineering',
    institution: 'Instituto Superior Técnico',
    institutionUrl: 'https://tecnico.ulisboa.pt/',
    grade: '17/20',
    start: '2025',
    end: 'Present',
    logo: istLogo,
  },
  {
    id: 'isel',
    title: 'BSc in Computer Science & Engineering',
    institution: 'Instituto Superior de Engenharia de Lisboa',
    institutionUrl: 'https://www.isel.pt/',
    grade: '17/20',
    start: '2022',
    end: '2025',
    logo: iselLogo,
    achievements: [
      'Received a merit award for academic excellence for the 2022/2023 & 2024/2025 academic years',
    ],
    finalProject: {
      title: 'Non-Blocking Progressive SSR Benchmark',
      grade: '20/20',
      description:
        'Benchmarked reactive, coroutine, and virtual thread approaches to HTML rendering to evaluate viability of virtual threads for non-blocking PSSR with most external DSL engines.',
    },
  },
];

export default EDUCATION;
