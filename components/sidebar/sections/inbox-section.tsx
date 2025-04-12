import React from 'react';
import { sectionData } from '../data';
import type { SectionProps } from '../types';
import { filterItems, sectionSearchFields } from '../utils/filter-items';

interface InboxSectionProps extends SectionProps {
  showUnreadOnly: boolean;
}

export const InboxSection: React.FC<InboxSectionProps> = ({ 
  searchQuery = "", 
  showUnreadOnly = false 
}) => {
  const items: any[] = sectionData.inbox;
  
  const unreadFilteredItems = showUnreadOnly ? items.filter(item => item.isUnread) : items;
  
  const filteredItems = filterItems(
    unreadFilteredItems,
    searchQuery,
    sectionSearchFields.inbox
  );

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
            className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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