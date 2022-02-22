import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { ReactNode, useEffect } from 'react';
import { socialLinks } from 'src/configs';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

type NavItem = {
  text: ReactNode;
  url?: string;
  target?: '_blank';
  children?: NavItem[];
  inactive?: boolean;
};

export const links: NavItem[] = [
  {
    text: <Trans>Home</Trans>,
    url: '/'
  },
  {
    text: <Trans>About</Trans>,
    children: [
      {
        text: <Trans>Our vision</Trans>,
        url: '/about-us'
      },
      {
        text: <Trans>Our team</Trans>,
        url: '/about-us#teams'
      },
      {
        text: <Trans>Morphing NFTs</Trans>,
        url: '/interoperability'
      },
      {
        text: <Trans>Careers</Trans>,
        url: '/careers'
      }
    ]
  },
  {
    text: <Trans>Ecosystem</Trans>,
    url: '/ecosystem'
  },
  {
    text: <Trans>Games</Trans>,
    url: '/games'
  },
  {
    text: <Trans>Nodes</Trans>,
    url: '/nodes'
  },
  {
    text: <Trans>Store</Trans>,
    url: '/store',
    inactive: true
  },
  {
    text: <Trans>Community</Trans>,
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

export const headerHeight = 83;

export type Action = 'login' | 'join-discord';

const Header: React.FC<{ action?: Action; className?: string; stickyHeader: boolean }> = ({
  action = 'join-discord',
  className,
  stickyHeader=true
}) => {
  return (
    <div className={clsx('absolute top-0 z-10 w-full', className)}>
      <div className="hidden lg:block">
        <DesktopHeader action={action} stickyHeader={stickyHeader}/>
      </div>
      <div className="lg:hidden">
        <MobileHeader action={action} />
      </div>
    </div>
  );
};

export default Header;
