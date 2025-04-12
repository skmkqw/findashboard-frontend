import React from 'react';
import type { InboxItem } from '../types';
import { data } from '../data';

interface InboxSectionProps {
  searchQuery?: string;
  showUnreadOnly?: boolean;
}

export const InboxSection: React.FC<InboxSectionProps> = ({ 
  searchQuery = "", 
  showUnreadOnly = false 
}) => {
  // For now, we're using mock data from data.ts
  // In the future, this will be replaced with real data from an API
  const items = data.sectionData.inbox;
  
  // First filter by unread if needed
  const unreadFilteredItems = showUnreadOnly ? items.filter(item => item.isUnread) : items;
  
  // Then filter by search query if provided
  const filteredItems = searchQuery
    ? unreadFilteredItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : unreadFilteredItems;

  return (
    <>
      {filteredItems.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No messages found
        </div>
      ) : (
        filteredItems.map((mail) => (
          <a
            href={`/inbox/${mail.id}`}
            key={mail.id}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex w-full items-center gap-2">
              <span className={mail.isUnread ? "font-bold" : ""}>{mail.name}</span>
              <span className="ml-auto text-xs">{mail.date}</span>
            </div>
            <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
              {mail.content}
            </span>
          </a>
        ))
      )}
    </>
  );
};