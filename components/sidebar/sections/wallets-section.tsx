import React from 'react';
import { sectionData } from '../data';
import { filterItems, sectionSearchFields } from '../utils/filter-items';
import { SectionProps } from '../types';

export const WalletsSection: React.FC<SectionProps> = ({ searchQuery = "" }) => {
  const items = sectionData.wallets;

  const filteredItems = filterItems(
    items,
    searchQuery,
    sectionSearchFields.wallets
  );

  return (
    <>
      {filteredItems.length === 0 ? (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No wallets found
        </div>
      ) : (
        filteredItems.map((wallet) => (
          <a
            href={`/wallets/${wallet.id}`}
            key={wallet.id}
            className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex justify-between w-full">
              <span>{wallet.address}</span>
              <span className="font-medium">{wallet.totalWorth}</span>
            </div>
          </a>
        ))
      )}
    </>
  );
};