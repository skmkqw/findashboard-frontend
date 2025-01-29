import React from 'react';
import type { ActivityItem } from '../types';
import type { BaseSectionProps } from '../types';

interface ActivitiesSectionProps extends BaseSectionProps<ActivityItem> {}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ items }) => {
  return (
    <>
      {items.map((activity) => (
        <a
          href={`/activities/${activity.id}`}
          key={activity.id}
          className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="font-medium">{activity.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{activity.description}</div>
        </a>
      ))}
    </>
  );
};