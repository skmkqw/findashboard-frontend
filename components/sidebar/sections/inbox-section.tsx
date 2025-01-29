import React from 'react';
import type { BaseSectionProps, InboxItem } from '../types';

interface InboxSectionProps extends BaseSectionProps<InboxItem> {
  items: InboxItem[];
  showUnreadOnly: boolean;
}

export const InboxSection: React.FC<InboxSectionProps> = ({ items, showUnreadOnly }) => {
  const filteredItems = showUnreadOnly ? items.filter(item => item.isUnread) : items;

  return (
    <>
      {filteredItems.map((mail) => (
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
      ))}
    </>
  );
};