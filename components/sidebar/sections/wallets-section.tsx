import React from 'react';
import type { WalletItem } from '../types';
import { data } from '../data';

interface WalletsSectionProps {
  searchQuery?: string;
}

export const WalletsSection: React.FC<WalletsSectionProps> = ({ searchQuery = "" }) => {
  // For now, we're using mock data from data.ts
  // In the future, this will be replaced with real data from an API
  const items = data.sectionData.wallets;
  
  const filteredItems = searchQuery
    ? items.filter(item => 
        item.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

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
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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