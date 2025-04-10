import { Button } from '@/components/ui/button';
import { Team, useTeamStore } from '@/stores/team-store';
import React, { useState } from 'react';
import { CreatePersonalSpaceDialog } from './create-personal-space-dialog';
import { CreateTeamDialog } from './create-team-dialog';

interface TeamCardProps {
  team: Team;
  isActive: boolean;
  handleClick: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isActive, handleClick }) => {
  return (
    <a
      onClick={() => handleClick(team)}
      className={`flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer
      ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
    `}
    >
      <div className="font-medium">{team.name}</div>
      <div className="mt-1 text-xs text-muted-foreground">{team.description}</div>
    </a>
  );
}

export const SwitchTeamSection: React.FC = () => {
  const { personalSpace, teams, activeTeam, switchTeam } = useTeamStore();
  const [isCreatePersonalSpaceDialogOpen, setIsCreatePersonalSpaceDialogOpen] = useState(false);
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);

  return (
    <>
      <CreatePersonalSpaceDialog
        open={isCreatePersonalSpaceDialogOpen}
        onOpenChange={setIsCreatePersonalSpaceDialogOpen}
      />
      <CreateTeamDialog
        open={isCreateTeamDialogOpen}
        onOpenChange={setIsCreateTeamDialogOpen}
      />
      {personalSpace !== null ?
        <TeamCard
          team={personalSpace}
          isActive={activeTeam?.id === personalSpace.id}
          handleClick={switchTeam}
        />
        :
        <div className="p-4 flex flex-col items-center gap-3 text-center text-sm border-b">
          <p>You don't have a personal space!</p>
          <Button 
            className="w-full text-xs"
            onClick={() => setIsCreatePersonalSpaceDialogOpen(true)}
          >
            Create
          </Button>
        </div>
      }
      {teams.length === 0 ?
        <div className="p-4 flex flex-col items-center gap-3 text-center text-sm border-b">
          <p>You don't have any teams!</p>
          <Button 
            className="w-full text-xs"
            onClick={() => setIsCreateTeamDialogOpen(true)}
          >
            Create
          </Button>
        </div>
        :
        teams.map((team) => {
          return (
            <TeamCard
              key={team.id}
              team={team}
              isActive={activeTeam?.id === team.id}
              handleClick={switchTeam}
            />
          );
        })}
    </>
  );
};