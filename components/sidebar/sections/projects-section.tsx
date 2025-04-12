import React from 'react';
import type { ProjectItem } from '../types';
import { data } from '../data';

interface ProjectsSectionProps {
  searchQuery?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ searchQuery = "" }) => {
  // For now, we're using mock data from data.ts
  // In the future, this will be replaced with real data from an API
  const items = data.sectionData.projects;
  
  const filteredItems = searchQuery
    ? items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  return (
    <>
      {filteredItems.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No projects found
        </div>
      ) : (
        filteredItems.map((project) => (
          <a
            href={`/projects/${project.id}`}
            key={project.id}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="font-medium">{project.name}</div>
            <div className="text-xs text-muted-foreground">{project.description}</div>
          </a>
        ))
      )}
    </>
  );
};