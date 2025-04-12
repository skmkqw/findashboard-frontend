import React from 'react';
import type { ActivityItem } from '../types';
import { data } from '../data';

interface ActivitiesSectionProps {
  searchQuery?: string;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ searchQuery = "" }) => {
  // For now, we're using mock data from data.ts
  // In the future, this will be replaced with real data from an API
  const items = data.sectionData.activities;
  
  const filteredItems = searchQuery
    ? items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  return (
    <>
      {filteredItems.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No activities found
        </div>
      ) : (
        filteredItems.map((activity) => (
          <a
            href={`/activities/${activity.id}`}
            key={activity.id}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="font-medium">{activity.name}</div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">{activity.projectName}</span>: {activity.description}
            </div>
          </a>
        ))
      )}
    </>
  );
};