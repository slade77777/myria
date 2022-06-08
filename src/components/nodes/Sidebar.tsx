import React from 'react';
import Logo from '../icons/Logo';
import { Trans } from '@lingui/macro';
import Link from 'next/link';
import DiscordIcon from '../icons/DiscordIcon';
import TwitterIcon from '../icons/TwitterIcon';
import MediumIcon from '../icons/MediumIcon';
import InstagramIcon from '../icons/InstagramIcon';
import HomeIcon from '../icons/HomeIcon';
import InventoryIcon from '../icons/InvetoryIcon';
import NodeIcon from '../icons/NodeIcon';
import RewardIcon from '../icons/RewardIcon';
import SettingAltIcon from '../icons/SettingAltIcon';
import clsx from 'clsx';

const menus = [
  {
    icon: <HomeIcon />,
    label: <Trans>Home</Trans>,
    path: '/nodes/dashboard',
    commingSoon: true
  },

  {
    icon: <InventoryIcon />,
    label: <Trans>Inventory</Trans>,
    path: '/nodes/mint-assets',
    commingSoon: true
  },
  {
    icon: <NodeIcon />,
    label: <Trans>Nodes</Trans>,
    path: '/nodes'
  },
  {
    icon: <RewardIcon />,
    label: <Trans>Rewards</Trans>,
    path: '/nodes/transactions',
    commingSoon: true
  },
  {
    icon: <SettingAltIcon />,
    label: <Trans>Settings</Trans>,
    path: '/nodes/dashboard',
    commingSoon: true
  }
];

const Sidebar: React.FC = () => {
  return (
    <aside className="top-0 left-0 flex h-screen flex-col bg-brand-deep-blue px-6 py-[56px] md:sticky">
      <Link href="/">
        <a className="w-[180px] pl-4">
          <Logo />
        </a>
      </Link>
      <div className="mt-[100px] flex flex-col text-[16px] leading-[1.44] text-[#A1AFBA]">
        {menus.map((menu, idx) => (
          <Link href={menu.path} key={idx}>
            <a
              className={clsx(
                'flex items-center space-x-2 rounded-lg p-4 hover:bg-[#0F2F45] hover:text-white',
                {
                  ' pointer-events-none': menu.commingSoon
                }
              )}>
              <i className="w-6">{menu.icon}</i>
              <p>{menu.label}</p>
              {menu.commingSoon && (
                <p className="text-brand-yellow rounded-full bg-[#2B4C63] py-[2.5px] px-2 text-[9px] font-medium leading-[1.3] text-brand-light-blue">
                  Comming soon
                </p>
              )}
            </a>
          </Link>
        ))}
        <div></div>
      </div>
      <div className="mt-auto border-t border-[#1F2937]">
        <div className="mt-6 flex items-center space-x-6">
          <i className="w-6">
            <DiscordIcon />
          </i>
          <i className="w-6">
            <TwitterIcon />
          </i>
          <i className="w-6">
            <MediumIcon />
          </i>
          <i className="w-6">
            <InstagramIcon />
          </i>
        </div>
        <p className="mt-6 text-[14px] leading-[1.57] text-[#A1AFBA]">
          © Copyright 2022 Myria <br /> Terms | Privacy
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
