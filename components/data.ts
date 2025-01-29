import { 
    InboxIcon, 
    HomeIcon,
    PresentationIcon,
    ChartBarIcon,
    UserIcon,
    WalletIcon,
    UsersIcon,
    ArrowUpDownIcon } from "lucide-react";
import { SectionData } from "./app-sidebar";

export const data = {
    navMain: [
      {
        title: "Inbox",
        url: "#",
        icon: InboxIcon,
        isActive: true,
        hasContent: true,
        section: "inbox" as const,
      },
      {
        title: "Home",
        url: "/home",
        icon: HomeIcon,
        isActive: false,
        hasContent: false,
      },
      {
        title: "Projects",
        url: "#",
        icon: PresentationIcon,
        isActive: false,
        hasContent: true,
        section: "projects" as const,
      },
      {
        title: "Activities",
        url: "#",
        icon: ChartBarIcon,
        isActive: false,
        hasContent: true,
        section: "activities" as const,
      },
      {
        title: "Profiles",
        url: "#",
        icon: UserIcon,
        isActive: false,
        hasContent: true,
        section: "profiles" as const,
      },
      {
        title: "Wallets",
        url: "#",
        icon: WalletIcon,
        isActive: false,
        hasContent: true,
        section: "wallets" as const,
      },
      {
        title: "Team",
        url: "#",
        icon: UsersIcon,
        isActive: false,
        hasContent: true,
        section: "team" as const,
      },
      {
          title: "Switch Team",
          url: "#",
          icon: ArrowUpDownIcon,
          isActive: false,
          hasContent: true,
          section: "switchTeam" as const,
        },
    ],
    sectionData: {
      inbox: [
        {
          name: "William Smith",
          email: "williamsmith@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },
        {
          name: "William Smith",
          email: "williamsmit1h@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },
        {
          name: "William Smith",
          email: "williamsmit2h@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },    
        {
          name: "William Smith",
          email: "williamsmit3h@example.com",
          date: "09:34 AM",
          content: "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },
      ],
      profiles: [
        {
          name: "Profile 1",
          netWorth: "$1.5M"
        },
        {
          name: "Profile 2",
          netWorth: "$2.8M"
        },
        {
          name: "Profile 3",
          netWorth: "$2.8M"
        },
        {
          name: "Profile 4",
          netWorth: "$2.8M"
        },
        {
          name: "Profile 5",
          netWorth: "$2.8M"
        },
        {
          name: "Profile 6",
          netWorth: "$2.8M"
        },
      ],
      wallets: [
        {
          address: "0x1234...5670",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4320",
          totalWorth: "$75,000"
        },
        {
          address: "0x1234...5679",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4321",
          totalWorth: "$75,000"
        },
        {
          address: "0x1234...5678",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4322",
          totalWorth: "$75,000"
        },
        {
          address: "0x1234...5672",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4323",
          totalWorth: "$75,000"
        },
        {
          address: "0x1234...5673",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4324",
          totalWorth: "$75,000"
        },
        {
          address: "0x1234...5674",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4325",
          totalWorth: "$75,000"
        },
        {
          address: "0x1234...5675",
          totalWorth: "$50,000"
        },
        {
          address: "0x8765...4326",
          totalWorth: "$75,000"
        },
        {
          address: "0x8765...4316",
          totalWorth: "$75,000"
        },
        {
          address: "0x8765...11346",
          totalWorth: "$75,000"
        },
        {
          address: "0x8765...1366",
          totalWorth: "$75,000"
        },
        {
          address: "0x8765...2316",
          totalWorth: "$75,000"
        },
        
      ],
      projects: [
        {
          name: "Project Alpha",
          description: "A revolutionary blockchain platform"
        },
        {
          name: "Project Beta",
          description: "Next-generation DeFi protocol"
        },
      ],
      activities: [
          {
              name: "Create new account",
              projectName: "Project Alpha",
              description: "Create new account for user"
          },
          {
              name: "Make 5 transactions",
              projectName: "Project Alpha",
              description: "Make 5 transactions for user"
          }
      ],
      team: [
        {
          name: "Alice Johnson",
          id: "1"
        },
        {
          name: "Bob Wilson",
          id: "2"
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
    } as SectionData
}