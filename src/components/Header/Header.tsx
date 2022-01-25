import clsx from 'clsx';
import React from 'react';
import { socialLinks } from 'src/configs';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

type NavItem = {
  text: string;
  url?: string;
  target?: '_blank';
  children?: NavItem[];
};

export const links: NavItem[] = [
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'About',
    url: '/about-us'
  },
  {
    text: 'Ecosystem',
    url: '/ecosystem'
  },
  {
    text: 'Games',
    url: '/games'
  },
  {
    text: 'Nodes',
    url: '/nodes'
  },
  {
    text: 'Store',
    url: '/store'
  },
  {
    text: 'Community',
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
      }
    ]
  }
];

export const headerHeight = 112;

export type Action = 'login' | 'join-discord';

const Header: React.FC<{ action?: Action; className?: string }> = ({
  action = 'login',
  className
}) => {
  return (
    <div className={clsx('absolute top-0 z-10 w-full', className)}>
      <div className="hidden lg:block">
        <DesktopHeader action={action} />
      </div>
      <div className="lg:hidden">
        <MobileHeader action={action} />
      </div>
    </div>
  );
};

export default Header;
