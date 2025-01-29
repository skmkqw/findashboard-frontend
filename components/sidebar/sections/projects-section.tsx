import React from 'react';
import type { ProjectItem } from '../types';
import type { BaseSectionProps } from '../types';

interface ProjectsSectionProps extends BaseSectionProps<ProjectItem> {}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ items }) => {
  return (
    <>
      {items.map((project) => (
        <a
          href={`/projects/${project.id}`}
          key={project.id}
          className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="font-medium">{project.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{project.description}</div>
        </a>
      ))}
    </>
  );
};