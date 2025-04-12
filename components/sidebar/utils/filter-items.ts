import { SectionDataKey } from '../types';

export function filterItems<T extends Record<string, any>>(
  items: T[],
  searchQuery: string,
  searchFields: string[]
): T[] {
  if (!searchQuery) return items;
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      if (value === undefined || value === null) return false;
      return String(value).toLowerCase().includes(searchQuery.toLowerCase());
    })
  );
}

export const sectionSearchFields: Record<SectionDataKey, string[]> = {
  inbox: ['name', 'content', 'email'],
  profiles: ['name'],
  wallets: ['address'],
  projects: ['name', 'description'],
  teamMembers: ['fullName', 'email'],
  activities: ['name', 'projectName', 'description'],
  switchTeam: ['name', 'description'],
}; 