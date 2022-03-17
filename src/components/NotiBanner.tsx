import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { socialLinks } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import DiscordIcon from './icons/DiscordIcon';

export type TAB = 'for-gamer' | 'for-dev';
const routes: {
  text: string;
  href: string;
  id: TAB;
  dependentRoutes: string[]
}[] = [
  {
    text: t`FOR GAMERS`,
    href: '/',
    id:'for-gamer',
    dependentRoutes: ['/', '/ecosystem', '/nodes', '/games', '/game-detail/[id]']
  },
  {
    text: t`FOR DEVELOPERS`,
    href: '/for-developers',
    id: 'for-dev',
    dependentRoutes: ['/for-developers', '/for-developers/solution']
  }
];

const NotiBanner: React.FC = () => {
  const router = useRouter();
  const [activatingTab, setActivatingTab] = useLocalStorage<TAB>('active-tab', 'for-gamer');
  
  useEffect(() => {
    let tab = routes.find(r => r.dependentRoutes.includes(router.pathname))?.id;
    if (tab!== activatingTab && !!tab) {
      setActivatingTab(tab);
    }
  }, [router.pathname, activatingTab])
  
  return (
    <div className="hidden grid-cols-[1fr_auto_1fr] bg-brand-light-blue md:grid">
      <div className="flex">
        {routes.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={clsx(
                'flex items-center px-6 py-4 text-[14px] font-bold leading-[17px] hover:bg-[#003552] hover:text-white',
                {
                  'bg-[#003552] text-white': activatingTab === item.id
                }
              )}>
              {item.text}
            </a>
          </Link>
        ))}
        <button></button>
      </div>
      <div className="flex flex-col items-center py-4 text-center md:flex-row md:py-2 ">
        <p className="text-[14px] font-medium leading-[1.23] ">
        <Trans><span className="font-bold">$MYRIA</span> Node & token IBCO sales coming soon!</Trans>
        </p>
        <a
          href={socialLinks.discord}
          target="_blank"
          className="btn-icon-sm btn-white mt-4 flex items-center px-4 text-[12px] md:mt-0 md:ml-6"
          rel="noreferrer">
          <span className="w-[16px]">
            <DiscordIcon />
          </span>
          <span className="ml-1">
            <Trans>JOIN DISCORD</Trans>
          </span>
        </a>
      </div>
    </div>
  );
};

export default NotiBanner;
