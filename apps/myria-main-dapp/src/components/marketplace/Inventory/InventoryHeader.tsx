import React, { FC, memo } from 'react';
import Link from 'next/link';
import GameIcon from 'src/components/icons/GameIcon';
import DAppIcon from 'src/components/icons/DAppIcon';
import MarketplaceIcon from 'src/components/icons/MarketplaceIcon';
import NotificationIcon from 'src/components/icons/NotificationIcon';
import LanguageSwitcher from 'src/components/LanguageSwitcher';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import WalletIcon from 'src/components/icons/WalletIcon';
import clsx from 'clsx';
// import UserAvatar from 'src/components/Header/UserAvatar';

const items = [
  {
    label: 'GAMES',
    icon: <GameIcon />,
    href: '/'
  },
  {
    label: 'DAPPS',
    icon: <DAppIcon />,
    href: '/'
  },
  {
    label: 'MARKETPLACE',
    icon: <MarketplaceIcon />,
    href: '/marketplace',
    active: 'marketplace'
  }
];

const InventoryHeader: FC<{ active: string }> = ({ active }) => {
  return (
    <header className="w-[calc(100vh - 288px)] fixed right-0 top-0 left-72 z-10 flex h-24 flex-row items-center justify-between bg-[#050E15] px-4">
      <div className="flex flex-row gap-6">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <a
              href={item.href}
              className={clsx(
                'flex cursor-pointer flex-row items-center gap-4 font-bold',
                active === item.active ? 'rounded-lg bg-[#0B2231] p-3 text-white' : 'text-[#A1AFBA]'
              )}>
              {item.icon}
              <p>{item.label}</p>
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-row items-center gap-6">
        <div>
          <NotificationIcon />
        </div>
        <div className="flex flex-row rounded-lg border-[1px] border-[#0B2231]">
          <div className="flex flex-row gap-4 rounded-lg p-3 text-white">
            <MyriaIcon className="w-6" />
            <p>247,229,612.201</p>
          </div>
          <div className="flex flex-row items-center gap-3 bg-[#0B2231] px-3">
            <WalletIcon />
          </div>
        </div>
        <LanguageSwitcher />
        {/* <UserAvatar avatar="" /> */}
      </div>
    </header>
  );
};

export default memo(InventoryHeader);
