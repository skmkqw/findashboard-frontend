"use client";

import { Label } from "@/components/ui/label";
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
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { ArrowUpDownIcon, ChartBarIcon, HomeIcon, InboxIcon, PresentationIcon, SlidersHorizontalIcon, UserIcon, UsersIcon, WalletIcon } from 'lucide-react';
import React, { useState } from 'react';
import Logo from "../shared/logo";
import { SectionErrorBoundary } from './section-error-boundary';
import { sectionComponents } from './sections';
import { SidebarItem } from './types';

const sidebarItems: SidebarItem[] = [
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
    section: "teamMembers",
  },
  {
    title: "Switch Team",
    url: "#",
    icon: ArrowUpDownIcon,
    hasContent: true,
    section: "switchTeam",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState(sidebarItems[0]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setOpen } = useSidebar();

  const activeSectionKey = activeItem.section;

  const renderSectionContent = () => {
    if (!activeSectionKey) return null;

    const SectionComponent = sectionComponents[activeSectionKey];
    if (!SectionComponent) return null;

    const sectionProps = {
      searchQuery,
      ...(activeSectionKey === 'inbox' ? { showUnreadOnly } : {})
    };

    return (
      <SectionErrorBoundary>
        <SectionComponent {...sectionProps} />
      </SectionErrorBoundary>
    );
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* Icon sidebar */}
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
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.hasContent ? (
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          setOpen(true);
                        }}
                        isActive={activeItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon className="size-4" />
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
            <SidebarMenuItem>
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Content sidebar */}
      {activeItem.hasContent && (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-base font-medium text-foreground">
                {activeItem.title}
              </div>
              {activeSectionKey === "inbox" && (
                <Label className="flex items-center gap-2 text-sm">
                  <span>Unreads</span>
                  <Switch
                    checked={showUnreadOnly}
                    onCheckedChange={setShowUnreadOnly}
                    className="shadow-none"
                  />
                </Label>
              )}
            </div>
            <SidebarInput
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                {renderSectionContent()}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  );
}