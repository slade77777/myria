import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react';
import { socialLinks } from 'src/configs';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

export type Action = 'login' | 'join-discord' | 'start-building';

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
        url: '/ecosystem'
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

export const headerHeight = 83;

const Header: React.FC<{ action?: Action; className?: string; stickyHeader: boolean }> = ({
  action = 'join-discord',
  className,
  stickyHeader = true
}) => {
  return (
    <div className={clsx('absolute top-0 z-10 w-full', className)}>
      <div className="hidden lg:block">
        <DesktopHeader action={action} stickyHeader={stickyHeader} />
      </div>
      <div className="lg:hidden">
        <MobileHeader action={action} />
      </div>
    </div>
  );
};

export default Header;
