import { FC, memo } from 'react';
import React from 'react';
import Logo from '../../icons/Logo';
import { Trans } from '@lingui/macro';
import Link from 'next/link';
import DiscordIcon from '../../icons/DiscordIcon';
import TwitterIcon from '../../icons/TwitterIcon';
import MediumIcon from '../../icons/MediumIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import GetStartedIcon from '../../icons/node/GetStartedIcon';
import RewardIcon from '../../icons/RewardIcon';
import clsx from 'clsx';
import Page from '../../Page';
import DashboardIcon from '../../icons/node/DashboardIcon';
import ThumbsupIcon from '../../icons/node/ThumbsupIcon';
import { useRouter } from 'next/router';

const menus = [
  {
    icon: <GetStartedIcon />,
    label: <Trans>Get Started</Trans>,
    path: '/nodes/dashboard/get-started'
  },

  {
    icon: <DashboardIcon />,
    label: <Trans>Dashboard</Trans>,
    path: '/nodes/dashboard'
  },
  {
    icon: <RewardIcon />,
    label: <Trans>Rewards</Trans>,
    path: '/nodes/dashboard/rewards'
  },
  {
    icon: <ThumbsupIcon />,
    label: <Trans>Governance</Trans>,
    path: '/nodes/dashboard/governance',
    comingSoon: true
  }
];

const NodeLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <Page includeFooter={false}>
      <div className="flex flex-row h-[calc(100vh-120px)]">
        <div className="flex h-screen pt-24 flex-col bg-brand-deep-blue px-6 w-96">
          <div className="flex flex-col text-[16px] leading-[1.44] text-[#A1AFBA]">
            {menus.map((menu, idx) => {
              const isActive =
                menu.path === '/nodes/dashboard'
                  ? router.pathname === '/nodes/dashboard'
                  : router.pathname?.includes(menu.path);
              return (
                <Link href={menu.path} key={idx}>
                  <a
                    className={clsx(
                      'flex items-center space-x-2 rounded-lg p-4 my-1 hover:bg-[#0F2F45] hover:text-white',
                      {
                        ' pointer-events-none': menu.comingSoon
                      },
                      isActive && 'bg-base/6'
                    )}>
                    <i className="w-6">{menu.icon}</i>
                    <p>{menu.label}</p>
                    {menu.comingSoon && (
                      <p className="text-brand-yellow rounded-full bg-[#2B4C63] py-[2.5px] px-2 text-[9px] font-medium leading-[1.3] text-brand-light-blue">
                        Comming soon
                      </p>
                    )}
                  </a>
                </Link>
              );
            })}
            <div></div>
          </div>
          <div className="mt-auto border-t border-[#1F2937] pb-8">
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
        </div>
        <div className="py-32 px-8 w-full overflow-y-auto h-screen">{children}</div>
      </div>
    </Page>
  );
};

export default memo(NodeLayout);
