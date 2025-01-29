"use client";

import React, { useState, useMemo, JSX } from 'react';
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Logo from "../common/logo";
import { InboxSection } from './sections/inbox-section';
import { ProfilesSection } from './sections/profiles-section';
import { SectionErrorBoundary } from './section-error-boundary';
import { useSearch } from './hooks/use-search';
import { useSectionData } from './hooks/use-section-data';
import type { NavItem, SectionData, SectionDataKey } from './types';
import { data } from './data';
import { SlidersHorizontalIcon } from 'lucide-react';

const getSectionSearchFields = (section: SectionDataKey): string[] => {
  const searchFieldsMap: Record<SectionDataKey, string[]> = {
    inbox: ['name', 'content', 'email'],
    profiles: ['name'],
    wallets: ['address'],
    projects: ['name', 'description'],
    team: ['name'],
    activities: ['name', 'projectName', 'description'],
    switchTeam: ['name', 'description'],
  };
  
  return searchFieldsMap[section];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [activeItem, setActiveItem] = useState<NavItem>(data.navMain[0]);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const { setOpen } = useSidebar();
    const { sectionData, updateSection } = useSectionData(data.sectionData);
  
    const { searchQuery, setSearchQuery, filteredItems } = useSearch(
      activeItem.section ? sectionData[activeItem.section] : sectionData.inbox,
      activeItem.section ? getSectionSearchFields(activeItem.section) : []
    );
  
    const renderSectionContent = useMemo(() => {
      if (!activeItem.section) return null;
  
      type SectionComponentsType = {
        [K in SectionDataKey]: (items: SectionData[K]) => JSX.Element;
      };
  
      const sectionComponents: Partial<SectionComponentsType> = {
        inbox: (items: SectionData['inbox']) => (
          <InboxSection items={items} showUnreadOnly={showUnreadOnly} />
        ),
        profiles: (items: SectionData['profiles']) => (
          <ProfilesSection items={items} />
        ),
        // wallets: (items: SectionData['wallets']) => (
        //   <WalletsSection items={items} />
        // ),
        // projects: (items: SectionData['projects']) => (
        //   <ProjectsSection items={items} />
        // ),
        // activities: (items: SectionData['activities']) => (
        //   <ActivitiesSection items={items} />
        // ),
        // team: (items: SectionData['team']) => (
        //   <TeamSection items={items} />
        // ),
        // switchTeam: (items: SectionData['switchTeam']) => (
        //   <SwitchTeamSection items={items} />
        // ),
      };
  
      const SectionComponent = sectionComponents[activeItem.section];
      if (!SectionComponent) return null;
  
      return (
        <SectionErrorBoundary>
          {SectionComponent(filteredItems as any)}
        </SectionErrorBoundary>
      );
    }, [activeItem.section, filteredItems, showUnreadOnly]);

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
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                {renderSectionContent}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  );
}