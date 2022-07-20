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
import testavatarImg from '../../../pages/marketplace/inventory/testavatar.png';

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
    <header className="w-[calc(100vh - 288px)] flex flex-row justify-between items-center h-24 px-4 fixed right-0 top-0 left-72 z-10 bg-[#050E15]">
      <div className="flex flex-row gap-6">
        {items.map((item) => (
          <Link key={item.label} href={item.href}>
            <a
              href={item.href}
              className={clsx(
                'cursor-pointer flex flex-row gap-4 items-center font-bold',
                active === item.active ? 'text-white rounded-lg bg-[#0B2231] p-3' : 'text-[#A1AFBA]'
              )}>
              {item.icon}
              <p>{item.label}</p>
            </a>
          </Link>
        ))}
      </div>
      <div className="flex flex-row gap-6 items-center">
        <div>
          <NotificationIcon />
        </div>
        <div className="rounded-lg flex flex-row border-[1px] border-[#0B2231]">
          <div className="flex flex-row rounded-lg p-3 text-white gap-4">
            <MyriaIcon className="w-6" />
            <p>247,229,612.201</p>
          </div>
          <div className="bg-[#0B2231] px-3 flex flex-row gap-3 items-center">
            <WalletIcon />
          </div>
        </div>
        <LanguageSwitcher />
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <img width="100%" src={'/images/marketplace/collection-1-logo.png'} alt="" />
        </div>
      </div>
    </header>
  );
};

export default memo(InventoryHeader);
