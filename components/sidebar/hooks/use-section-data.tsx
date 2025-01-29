import { useState, useCallback } from 'react';
import type { SectionData, SectionDataKey } from '../types';

export function useSectionData(initialData: SectionData) {
  const [sectionData, setSectionData] = useState<SectionData>(initialData);

  const updateSection = useCallback(<K extends SectionDataKey>(
    section: K,
    data: SectionData[K]
  ) => {
    setSectionData(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  return { sectionData, updateSection };
}