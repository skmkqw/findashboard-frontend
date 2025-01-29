import { useState, useMemo } from 'react';
import type { SectionData, SectionDataKey } from '../types';

export function useSearch<K extends SectionDataKey>(
  items: SectionData[K],
  searchFields: string[]
) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    
    return items.filter(item =>
      searchFields.some(field =>
        String((item as any)[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [items, searchQuery, searchFields]);

  return { searchQuery, setSearchQuery, filteredItems };
}