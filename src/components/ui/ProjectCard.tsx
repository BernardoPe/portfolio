import React from 'react';
import type { Project } from '../../types/projects';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props): React.JSX.Element {
  return (
    <div className="bg-secondary rounded-xl p-8 shadow-lg w-full h-full flex flex-col max-w-5xl">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-3xl font-bold color-primary">{project.title}</h3>
          {(project.startDate || project.endDate) && (
            <div className="flex items-center gap-2 text-sm color-secondary whitespace-nowrap ml-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {project.startDate} {project.endDate ? `- ${project.endDate}` : ''}
              </span>
            </div>
          )}
        </div>

        <p className="color-secondary text-md md:text-lg font-medium mb-4">{project.subtitle}</p>

        {project.role && (
          <div className="inline-block mb-5">
            <span className="bg-slate-700/70 color-primary px-4 py-1.5 rounded text-sm">
              {project.role}
            </span>
          </div>
        )}

        <p className="text-base color-tertiary mb-8 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>
        <div className="mb-8">
          <h4 className="color-primary text-base font-semibold mb-4">Technology Stack</h4>
          <div
            className="
              grid grid-cols-2 
              gap-x-6 gap-y-6 
              sm:flex sm:flex-wrap sm:gap-6
            "
          >
            {project.technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center bg-slate-700/10 rounded-full">
                  {tech.icon ? (
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold color-primary">
                      {tech.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-sm color-secondary text-center max-w-[5.5rem] break-words">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 
            color-primary rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 
              0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 
              1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 
              0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 
              2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 
              4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 
              12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          View Repository
        </a>
      </div>
    </div>
  );
}
