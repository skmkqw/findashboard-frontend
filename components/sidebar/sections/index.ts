import { SectionDataKey, SectionProps } from '../types';
import { ActivitiesSection } from './activities-section';
import { InboxSection } from './inbox-section';
import { ProfilesSection } from './profiles-section';
import { ProjectsSection } from './projects-section';
import { SwitchTeamSection } from './switch-team-section';
import { TeamSection } from './team-section';
import { WalletsSection } from './wallets-section';

export const sectionComponents: Record<SectionDataKey, React.ComponentType<SectionProps>> = {
  inbox: InboxSection,
  profiles: ProfilesSection,
  wallets: WalletsSection,
  projects: ProjectsSection,
  activities: ActivitiesSection,
  teamMembers: TeamSection,
  switchTeam: SwitchTeamSection,
};

export const getSectionSearchFields = (section: SectionDataKey): string[] => {
  const searchFieldsMap: Record<SectionDataKey, string[]> = {
    inbox: ['name', 'content', 'email'],
    profiles: ['name'],
    wallets: ['address'],
    projects: ['name', 'description'],
    teamMembers: ['name'],
    activities: ['name', 'projectName', 'description'],
    switchTeam: ['name', 'description'],
  };
  
  return searchFieldsMap[section];
};