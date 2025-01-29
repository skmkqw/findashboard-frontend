import React from 'react';
import type { WalletItem } from '../types';
import type { BaseSectionProps } from '../types';

interface WalletsSectionProps extends BaseSectionProps<WalletItem> {}

export const WalletsSection: React.FC<WalletsSectionProps> = ({ items }) => {
  return (
    <>
      {items.map((wallet) => (
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
      ))}
    </>
  );
};