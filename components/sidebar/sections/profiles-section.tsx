import React from 'react';
import { sectionData } from '../data';
import type { SectionProps } from '../types';
import { filterItems, sectionSearchFields } from '../utils/filter-items';

export const ProfilesSection: React.FC<SectionProps> = ({ searchQuery = "" }) => {
  const items = sectionData.profiles;
  
  const filteredItems = filterItems(
    items,
    searchQuery,
    sectionSearchFields.profiles
  );

  return (
    <>
      {filteredItems.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No profiles found
        </div>
      ) : (
        filteredItems.map((profile) => (
          <a
            href={`/profiles/${profile.id}`}
            key={profile.id}
            className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex justify-between w-full">
              <span>{profile.name}</span>
              <span className="font-medium">{profile.netWorth}</span>
            </div>
          </a>
        ))
      )}
    </>
  );
};