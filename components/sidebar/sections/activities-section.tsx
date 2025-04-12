import React from 'react';
import { sectionData } from '../data';
import { filterItems, sectionSearchFields } from '../utils/filter-items';
import { SectionProps } from '../types';

export const ActivitiesSection: React.FC<SectionProps> = ({ searchQuery = "" }) => {
  const items = sectionData.activities;

  const filteredItems = filterItems(
    items,
    searchQuery,
    sectionSearchFields.activities
  );

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
            className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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