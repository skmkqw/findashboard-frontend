"use client";

import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Logo from "../common/logo";
import { SlidersHorizontalIcon } from 'lucide-react';
import { useTeamStore } from '@/stores/team-store';
import { data } from './data';
import { useSearch } from './hooks/use-search';
import { sectionComponents, getSectionSearchFields } from './sections';
import { SectionErrorBoundary } from './section-error-boundary';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState(data.navMain[0]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const { setOpen } = useSidebar();
  const { getTeams } = useTeamStore();

  const activeSectionKey = activeItem.section;

  useEffect(() => {
    if (activeSectionKey === "switchTeam" || activeSectionKey === "teamMembers") {
      getTeams().catch(console.error);
    }
  }, [activeSectionKey, getTeams]);

  const { searchQuery, setSearchQuery, filteredItems } = useSearch(
    activeSectionKey ? data.sectionData[activeSectionKey] : [],
    activeSectionKey ? getSectionSearchFields(activeSectionKey) : []
  );

  const renderSectionContent = () => {
    if (!activeSectionKey) return null;

    const SectionComponent = sectionComponents[activeSectionKey];
    if (!SectionComponent) return null;

    const sectionProps = {
      items: filteredItems,
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