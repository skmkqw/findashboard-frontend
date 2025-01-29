import React from 'react';
import type { BaseSectionProps, ProfileItem } from '../types';

interface ProfilesSectionProps extends BaseSectionProps<ProfileItem> {
  items: ProfileItem[];
}

export const ProfilesSection: React.FC<ProfilesSectionProps> = ({ items }) => {
  return (
    <>
      {items.map((profile) => (
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
      ))}
    </>
  );
};