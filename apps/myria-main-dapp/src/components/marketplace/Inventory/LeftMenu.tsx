import React, { FC, memo } from 'react';
import Link from 'next/link';
import Logo from 'src/components/icons/Logo';
import RewardIcon from 'src/components/icons/RewardIcon';
import SettingIcon from 'src/components/icons/SettingIcon';
import InventoryIcon from 'src/components/icons/InventoryIcon';
import NodeIcon from 'src/components/icons/NodeIcon';
import DashboardIcon from 'src/components/icons/marketplace/DashboardIcon';
import clsx from 'clsx';

const items = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/'
  },
  {
    label: 'Inventory',
    icon: <InventoryIcon className="w-6 h-6" />,
    href: '/marketplace/inventory',
    active: 'inventory'
  },
  {
    label: 'Nodes',
    icon: <NodeIcon className="w-6 h-6" />,
    href: '/nodes'
  },
  {
    label: 'Rewards',
    icon: <RewardIcon className="w-6 h-6" />,
    href: '/'
  },
  {
    label: 'Settings',
    icon: <SettingIcon className="w-6 h-6" />,
    href: '/'
  }
];

const LeftMenu: FC<{ active: string }> = ({ active }) => {
  return (
    <div className="bg-[#081824] h-screen w-80 overflow-hidden pt-8 px-4">
      <div className="flex items-left">
        <Link href="/">
          <a className="w-[164px]">
            <Logo />
          </a>
        </Link>
      </div>
      <div className="my-12">
        {items.map((item) => (
          <Link href={item.href} key={item.label}>
            <a
              href={item.href}
              className={clsx(
                'cursor-pointer flex flex-row gap-4 items-center my-6',
                active === item.active ? 'text-white' : 'text-[#A1AFBA]'
              )}>
              {item.icon}
              <p>{item.label}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(LeftMenu);
