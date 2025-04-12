import React from 'react';
import { sectionData } from '../data';
import { SectionProps } from '../types';

export const ProjectsSection: React.FC<SectionProps> = ({ searchQuery = "" }) => {
  const items: any[] = sectionData.projects;
  
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
            className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="font-medium">{project.name}</div>
            <div className="text-xs text-muted-foreground">{project.description}</div>
          </a>
        ))
      )}
    </>
  );
};