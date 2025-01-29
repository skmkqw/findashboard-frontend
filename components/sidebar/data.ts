import { 
    InboxIcon, 
    HomeIcon,
    PresentationIcon,
    ChartBarIcon,
    UserIcon,
    WalletIcon,
    UsersIcon,
    ArrowUpDownIcon 
} from "lucide-react";
import type { NavItem, SectionData } from "./types";

export const data: {
    navMain: NavItem[];
    sectionData: SectionData;
} = {
    navMain: [
      {
        title: "Inbox",
        url: "#",
        icon: InboxIcon,
        hasContent: true,
        section: "inbox",
      },
      {
        title: "Home",
        url: "/home",
        icon: HomeIcon,
        hasContent: false,
      },
      {
        title: "Projects",
        url: "#",
        icon: PresentationIcon,
        hasContent: true,
        section: "projects",
      },
      {
        title: "Activities",
        url: "#",
        icon: ChartBarIcon,
        hasContent: true,
        section: "activities",
      },
      {
        title: "Profiles",
        url: "#",
        icon: UserIcon,
        hasContent: true,
        section: "profiles",
      },
      {
        title: "Wallets",
        url: "#",
        icon: WalletIcon,
        hasContent: true,
        section: "wallets",
      },
      {
        title: "Team Members",
        url: "#",
        icon: UsersIcon,
        hasContent: true,
        section: "team",
      },
      {
        title: "Switch Team",
        url: "#",
        icon: ArrowUpDownIcon,
        hasContent: true,
        section: "switchTeam",
      },
    ],
    sectionData: {
      inbox: [
        {
          id: "1",
          name: "William Smith",
          email: "williamsmith@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
          isUnread: true
        },
        {
          id: "2",
          name: "William Smith",
          email: "williamsmit1h@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
          isUnread: false
        },
        {
          id: "3",
          name: "William Smith",
          email: "williamsmit2h@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
          isUnread: true
        },    
        {
          id: "4",
          name: "William Smith",
          email: "williamsmit3h@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
          isUnread: false
        },
      ],
      profiles: [
        {
          id: "1",
          name: "Profile 1",
          netWorth: "$1.5M"
        },
        {
          id: "2",
          name: "Profile 2",
          netWorth: "$2.8M"
        },
        {
          id: "3",
          name: "Profile 3",
          netWorth: "$2.8M"
        },
        {
          id: "4",
          name: "Profile 4",
          netWorth: "$2.8M"
        },
        {
          id: "5",
          name: "Profile 5",
          netWorth: "$2.8M"
        },
        {
          id: "6",
          name: "Profile 6",
          netWorth: "$2.8M"
        },
      ],
      wallets: [
        {
          id: "1",
          address: "0x1234...5670",
          totalWorth: "$50,000"
        },
        {
          id: "2",
          address: "0x8765...4320",
          totalWorth: "$75,000"
        },
        {
          id: "3",
          address: "0x1234...5679",
          totalWorth: "$50,000"
        },
        // ... other wallets with same structure
      ],
      projects: [
        {
          id: "1",
          name: "Project Alpha",
          description: "A revolutionary blockchain platform"
        },
        {
          id: "2",
          name: "Project Beta",
          description: "Next-generation DeFi protocol"
        },
      ],
      activities: [
        {
          id: "1",
          name: "Create new account",
          projectName: "Project Alpha",
          description: "Create new account for user"
        },
        {
          id: "2",
          name: "Make 5 transactions",
          projectName: "Project Alpha",
          description: "Make 5 transactions for user"
        }
      ],
      team: [
        {
          id: "1",
          name: "Alice Johnson",
        },
        {
          id: "2",
          name: "Bob Wilson",
        },
      ],
      switchTeam: [
        {
          id: "1",
          name: "Team 1",
          description: "Team 1 description"
        },
        {
          id: "2",
          name: "Team 2",
          description: "Team 2 description"
        }
      ]
    }
};