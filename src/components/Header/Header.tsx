import React from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

type NavItem = {
  text: string;
  url?: string;
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
        url: '/'
      },
      {
        text: 'Twitter',
        url: '/'
      },
      {
        text: 'Instagram',
        url: '/'
      }
    ]
  }
];

export const headerHeight = 112;

export type Action = 'login' | 'join-discord';

const Header: React.FC<{ action?: Action }> = ({ action = 'login' }) => {
  return (
    <div className="absolute top-0 z-10 w-full">
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
