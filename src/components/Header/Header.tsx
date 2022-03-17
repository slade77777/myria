import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react';
import { socialLinks } from 'src/configs';
import { useTabContext } from 'src/context/tabContext';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

export type Action = 'login' | 'join-discord' | 'start-building' | 'auto';

export type NavItem = {
  text: ReactNode;
  url?: string;
  target?: '_blank';
  children?: Omit<NavItem, 'position'>[];
  inactive?: boolean;
  position: 'left' | 'right';
  action?: Action;
};

export const links: NavItem[] = [
  {
    text: <Trans>Home</Trans>,
    url: '/',
    position: 'left',
    action: 'join-discord'
  },

  {
    text: <Trans>Ecosystem</Trans>,
    url: '/ecosystem',
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Games</Trans>,
    url: '/games',
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Nodes</Trans>,
    url: '/nodes',
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Store</Trans>,
    url: '/store',
    inactive: true,
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Home</Trans>,
    url: '/for-developers',
    position: 'left',
    action: 'start-building'
  },
  {
    text: <Trans>OUR SOLUTION</Trans>,
    url: '/for-developers/solution',
    position: 'left',
    action: 'start-building'
  },
  // {
  //   text: <Trans>DEVELOPER PROGRAM</Trans>,
  //   url: '/developer-program',
  //   position: 'left',
  //   action: 'start-building'
  // },
  {
    text: <Trans>About</Trans>,
    position: 'right',
    children: [
      {
        text: <Trans>Our vision</Trans>,
        url: '/our-vision'
      },
      {
        text: <Trans>Our team</Trans>,
        url: '/team'
      },
      {
        text: <Trans>MYRIA STUDIOS</Trans>,
        url: '/studios'
      },
      {
        text: <Trans>Careers</Trans>,
        url: '/careers'
      }
    ]
  },
  {
    text: <Trans>Community</Trans>,
    position: 'right',
    children: [
      {
        text: 'Discord',
        url: socialLinks.discord,
        target: '_blank'
      },
      {
        text: 'Twitter',
        url: socialLinks.twitter,
        target: '_blank'
      },
      {
        text: 'Instagram',
        url: socialLinks.instagram,
        target: '_blank'
      },
      {
        text: 'Medium',
        url: socialLinks.medium,
        target: '_blank'
      }
    ]
  }
];
export const navHeight = 83;
export const bannerHeight = 50;
export const headerHeight = navHeight + bannerHeight;
export const bannerSpacingClassName = 'md:pt-[50px]';
export const headerNavSpacingClassName = 'pt-[104px] md:pt-[133px]';

const Header: React.FC<{ action?: Action; className?: string; stickyHeader: boolean }> = ({
  action = 'join-discord',
  className,
  stickyHeader = true
}) => {
  const { activatingTab } = useTabContext();
  let usedAction = action;
  if (action === 'auto') {
    usedAction = activatingTab === 'for-gamer' ? 'join-discord' : 'start-building';
  }
  return (
    <div className={clsx('absolute top-0 z-10 w-full', className)}>
      <div className="hidden lg:block">
        <DesktopHeader action={usedAction} stickyHeader={stickyHeader} />
      </div>
      <div className="lg:hidden">
        <MobileHeader action={usedAction} />
      </div>
    </div>
  );
};

export default Header;
