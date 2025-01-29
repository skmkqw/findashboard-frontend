import React from 'react';
import type { TeamItem } from '../types';
import type { BaseSectionProps } from '../types';

interface TeamSectionProps extends BaseSectionProps<TeamItem> {}

export const TeamSection: React.FC<TeamSectionProps> = ({ items }) => {
  return (
    <>
      {items.map((teamMember) => (
        <a
          href={`/teamMember/${teamMember.id}`}
          key={teamMember.id}
          className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
            {teamMember.name}
        </a>
      ))}
    </>
  );
};