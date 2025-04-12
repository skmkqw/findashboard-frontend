import { Team, TeamBase, TeamMember, useTeamStore } from '@/stores/team-store';
import React, { useEffect } from 'react';
import { filterItems, sectionSearchFields } from '../utils/filter-items';
import { SectionProps } from '../types';

const TeamMemberItem: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <a
      className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
    >
      <div className="font-medium">{member.fullName}</div>
      <div className="mt-1 text-xs text-muted-foreground">{member.email}</div>
    </a>
  );
};

const isTeam = (team: TeamBase): team is Team => {
  return 'members' in team;
};

export const TeamSection: React.FC<SectionProps> = ({ searchQuery = "" }) => {
  const { activeTeam, getTeams } = useTeamStore();

  useEffect(() => {
    getTeams().catch(console.error);
  }, [getTeams]);

  if (!activeTeam) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No team selected
      </div>
    );
  }

  if (!isTeam(activeTeam)) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        This is your personal space. It doesn't have team members.
      </div>
    );
  }

  const filteredMembers = filterItems(
    activeTeam.members,
    searchQuery,
    sectionSearchFields.teamMembers
  );

  return (
    <div className="flex flex-col gap-2">
      {filteredMembers.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No team members found
        </div>
      ) : (
        filteredMembers.map((member) => (
          <TeamMemberItem key={member.id} member={member} />
        ))
      )}
    </div>
  );
};