"use client"

import * as React from "react"
import {
  InboxIcon,
  HomeIcon,
  PresentationIcon, 
  ChartBarIcon,
  UserIcon,
  WalletIcon,
  UsersIcon, 
  SlidersHorizontalIcon,
  ArrowUpDownIcon
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Logo from "./common/logo"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

type InboxItem = {
  name: string
  email: string
  date: string
  content: string
}

type ProfileItem = {
  name: string
  netWorth: string
}

type WalletItem = {
  address: string
  totalWorth: string
}

type ProjectItem = {
  name: string
  description: string
}

type TeamItem = {
  name: string,
  id: string
}

type SwitchTeamItem = {
  id: string
  name: string,
  description: string
}

type ActivityItem = {
  name: string,
  projectName: string,
  description: string
}

type SectionData = {
  inbox: InboxItem[]
  profiles: ProfileItem[]
  wallets: WalletItem[]
  projects: ProjectItem[]
  team: TeamItem[]
  activities: ActivityItem[],
  switchTeam: SwitchTeamItem[]
}

const data = {
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()

  const renderSectionContent = () => {
    if (!activeItem.section) return null

    switch (activeItem.section) {
      case "inbox":
        return data.sectionData.inbox.map((mail) => (
          <a
            href="#"
            key={mail.email}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex w-full items-center gap-2">
              <span>{mail.name}</span>
              <span className="ml-auto text-xs">{mail.date}</span>
            </div>
            <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
              {mail.content}
            </span>
          </a>
        ))

      case "profiles":
        return data.sectionData.profiles.map((profile) => (
            <a
            href="#"
            key={profile.name}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
            <div className="flex justify-between w-full">
                <span>{profile.name}</span>
                <span className="font-medium">{profile.netWorth}</span>
            </div>
            </a>
        ))

      case "wallets":
        return data.sectionData.wallets.map((wallet) => (
            <a
            href="#"
            key={wallet.address}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <div className="flex justify-between w-full">
                    <span>{wallet.address}</span>
                    <span className="font-medium">{wallet.totalWorth}</span>
                </div>
            </a>
        ))

      case "projects":
        return data.sectionData.projects.map((project) => (
            <a
            href="#"
            key={project.name}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <div className="font-medium">{project.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{project.description}</div>
            </a>
        ))

      case "activities":
        return data.sectionData.activities.map((activity) => (
            <a
            href="#"
            key={activity.name}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <span className="font-medium">{activity.name}</span>
                <span className="mt-1 text-xs text-muted-foreground">{activity.projectName}</span>
                <span className="mt-1 text-xs text-muted-foreground">{activity.description}</span>
            </a>
        ))

      case "team":
        return data.sectionData.team.map((teamMember) => (
            <a
            href="#"
            key={teamMember.id}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <span className="font-medium">{teamMember.name}</span>
            </a>
        ))

      case "switchTeam":
        return data.sectionData.switchTeam.map((team) => (
            <a
            href="#"
            key={team.id}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <span className="font-medium">{team.name}</span>
                <span className="mt-1 text-xs text-muted-foreground">{team.description}</span>
            </a>
        ))

      default:
        return null
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Logo type="short" className="text-2xl" />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.hasContent ? (
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item)
                          setOpen(true)
                        }}
                        isActive={activeItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                        <SidebarMenuButton
                        asChild
                        tooltip={{
                            children: item.title,
                            hidden: false,
                        }}
                        className="px-2.5 md:px-2"
                        >
                        <a href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                        </a>
                        </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
            <SidebarMenuButton
            asChild
            tooltip={{
                children: "Settings",
                hidden: false,
            }}
            className="px-2.5 md:px-2"
            >
            <a href="/settings">
                <SlidersHorizontalIcon className="size-4" />
                <span>Settings</span>
            </a>
            </SidebarMenuButton>
              </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {activeItem.hasContent && (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
            {activeItem.section === "inbox" && (
                <Label className="flex items-center gap-2 text-sm">
                    <span>Unreads</span>
                    <Switch className="shadow-none" />
                </Label>
            )}
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                {renderSectionContent()}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  )
}