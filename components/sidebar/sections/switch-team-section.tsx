import { useTeamStore } from '@/stores/team-store';
import React from 'react';

export const SwitchTeamSection: React.FC = () => {
  const { teams, activeTeam, switchTeam } = useTeamStore();

  return (
    <>
      {teams.map((team) => {
        const isActive = activeTeam?.id === team.id;

        return (
          <a
            key={team.id}
            onClick={() => switchTeam(team)}
            className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer
              ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
            `}
          >
            <div className="font-medium">{team.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{team.description}</div>
          </a>
        );
      })}
    </>
  );
};