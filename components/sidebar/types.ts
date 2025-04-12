import { LucideIcon } from "lucide-react";

export type SectionDataKey = "inbox"
  | "profiles"
  | "wallets"
  | "projects"
  | "teamMembers"
  | "activities"
  | "switchTeam";

export interface SidebarItem {
  title: string;
  icon: LucideIcon;
  hasContent: boolean;
  section?: SectionDataKey;
  url?: string;
}

export interface SectionProps {
  searchQuery?: string;
}