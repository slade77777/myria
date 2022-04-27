import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { tabRoutes, useTabContext } from 'src/context/tabContext';
import { useGA4 } from 'src/lib/ga';
import DiscordIcon from './icons/DiscordIcon';

const NotiBanner: React.FC = () => {
  const { activatingTab } = useTabContext();
  const { event } = useGA4();
  return (
    <div className="hidden grid-cols-[1fr_auto_1fr] bg-brand-light-blue md:grid">
      <div className="flex">
        {tabRoutes.map((item) => (
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
          <Trans>
            <span className="font-bold">$MYRIA</span> Node & token sales coming soon!
          </Trans>
        </p>
        <a
          href='https://discord.gg/HgXdFqJXmu '
          onClick={() => {
            event('Discord Button Clicked', { button_location: 'Top Bar' });
          }}
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
