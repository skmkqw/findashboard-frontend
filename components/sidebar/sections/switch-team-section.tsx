import { Button } from '@/components/ui/button';
import { PersonalSpace, Team, useTeamStore } from '@/stores/team-store';
import React, { useEffect, useState } from 'react';
import { CreatePersonalSpaceDialog } from './create-personal-space-dialog';
import { CreateTeamDialog } from './create-team-dialog';

interface TeamCardProps {
  team: Team | PersonalSpace;
  isActive: boolean;
  handleClick: (team: Team | PersonalSpace) => void;
}

interface SwitchTeamSectionProps {
  searchQuery?: string;
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

export const SwitchTeamSection: React.FC<SwitchTeamSectionProps> = ({ searchQuery = "" }) => {
  const { personalSpace, teams, activeTeam, switchTeam, getTeams } = useTeamStore();
  const [isCreatePersonalSpaceDialogOpen, setIsCreatePersonalSpaceDialogOpen] = useState(false);
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);

  useEffect(() => {
    getTeams().catch(console.error);
  }, [getTeams]);

  const filteredTeams = searchQuery
    ? teams.filter(team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : teams;

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
      <div className="px-4 py-2 font-bold border-b text-lg">
        Personal Space
      </div>
      {personalSpace !== null ? (
        <TeamCard
          team={personalSpace}
          isActive={activeTeam?.id === personalSpace.id}
          handleClick={switchTeam}
        />
      ) : (
        <div className="p-4 flex flex-col items-center gap-3 text-center text-sm border-b">
          <p>You don't have a personal space!</p>
          <Button
            className="w-full text-xs"
            onClick={() => setIsCreatePersonalSpaceDialogOpen(true)}
          >
            Create
          </Button>
        </div>
      )}
      <div className="px-4 py-2 font-bold border-b text-lg">
        Teams
      </div>
      {teams.length === 0 ? (
        <div className="p-4 flex flex-col items-center gap-3 text-center text-sm border-b">
          <p>You don't have any teams!</p>
          <Button
            className="w-full text-xs"
            onClick={() => setIsCreateTeamDialogOpen(true)}
          >
            Create
          </Button>
        </div>
      ) : (
        <>
          {filteredTeams.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No teams found
            </div>
          ) : (
            filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                isActive={activeTeam?.id === team.id}
                handleClick={switchTeam}
              />
            ))
          )}
        </>
      )}
    </>
  );
};