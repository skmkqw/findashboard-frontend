import React from 'react';
import type { SwitchTeamItem } from '../types';
import type { BaseSectionProps } from '../types';

interface SwitchTeamSectionProps extends BaseSectionProps<SwitchTeamItem> {}

export const SwitchTeamSection: React.FC<SwitchTeamSectionProps> = ({ items }) => {
  return (
    <>
      {items.map((team) => (
        <a
          href={`/activities/${team.id}`}
          key={team.id}
          className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="font-medium">{team.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{team.description}</div>
        </a>
      ))}
    </>
  );
};