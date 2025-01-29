import { LucideIcon } from "lucide-react";

export type InboxItem = {
  id: string;
  name: string;
  email: string;
  date: string;
  content: string;
  isUnread: boolean;
}

export type ProfileItem = {
  id: string;
  name: string;
  netWorth: string;
}

export type WalletItem = {
  id: string;
  address: string;
  totalWorth: string;
}

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
}

export type TeamItem = {
  id: string;
  name: string;
}

export type SwitchTeamItem = {
  id: string;
  name: string;
  description: string;
}

export type ActivityItem = {
  id: string;
  name: string;
  projectName: string;
  description: string;
}

export type SectionData = {
  inbox: InboxItem[];
  profiles: ProfileItem[];
  wallets: WalletItem[];
  projects: ProjectItem[];
  team: TeamItem[];
  activities: ActivityItem[];
  switchTeam: SwitchTeamItem[];
}

export type SectionDataKey = keyof SectionData;

export interface BaseSectionProps<T> {
    items: T[];
}

export type NavItem = {
  title: string;
  icon: LucideIcon;
  hasContent: boolean;
  section?: SectionDataKey;
  url?: string;
}