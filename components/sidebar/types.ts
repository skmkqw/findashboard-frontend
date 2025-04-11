import { Team, TeamMember } from "@/stores/team-store";
import { LucideIcon } from "lucide-react";

export { TeamSchema } from "@/stores/team-store";
export type { Team, TeamMember } from "@/stores/team-store";

interface BaseItem {
  id: string;
}

export interface InboxItem extends BaseItem {
  name: string;
  email: string;
  date: string;
  content: string;
  isUnread: boolean;
}

export interface ProfileItem extends BaseItem {
  name: string;
  netWorth: string;
}

export interface WalletItem extends BaseItem {
  address: string;
  totalWorth: string;
}

export interface ProjectItem extends BaseItem {
  name: string;
  description: string;
}

export interface TeamItem extends BaseItem {
  name: string;
}

export interface ActivityItem extends BaseItem {
  name: string;
  projectName: string;
  description: string;
}

export interface SectionData {
  inbox: InboxItem[];
  profiles: ProfileItem[];
  wallets: WalletItem[];
  projects: ProjectItem[];
  teamMembers: TeamMember[];
  activities: ActivityItem[];
  switchTeam: Team[];
}

export type SectionDataKey = keyof SectionData;

export interface NavItem {
  title: string;
  icon: LucideIcon;
  hasContent: boolean;
  section?: SectionDataKey;
  url?: string;
}