import React from 'react';
import type { ProfileItem } from '../types';
import { data } from '../data';

interface ProfilesSectionProps {
  searchQuery?: string;
}

export const ProfilesSection: React.FC<ProfilesSectionProps> = ({ searchQuery = "" }) => {
  // For now, we're using mock data from data.ts
  // In the future, this will be replaced with real data from an API
  const items = data.sectionData.profiles;
  
  const filteredItems = searchQuery
    ? items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

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
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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