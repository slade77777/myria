import { t } from '@lingui/macro';
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
  inactive?: boolean;
};

export const links: NavItem[] = [
  {
    text: t`Home`,
    url: '/'
  },
  {
    text: t`About`,
    children: [
      {
        text: t`Our vision`,
        url: '/about-us'
      },
      {
        text: t`Our team`,
        url: '/about-us'
      },
      {
        text: t`Morphing NFTs`,
        url: '/interoperability'
      },
      {
        text: t`Careers`,
        url: '/careers'
      }
    ]
  },
  {
    text: t`Ecosystem`,
    url: '/ecosystem'
  },
  {
    text: t`Games`,
    url: '/games'
  },
  {
    text: t`Nodes`,
    url: '/nodes'
  },
  {
    text: t`Store`,
    url: '/store',
    inactive: true
  },
  {
    text: t`Community`,
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
  action = 'join-discord',
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
