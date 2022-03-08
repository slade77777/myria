import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { socialLinks } from '../../configs';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import { links, headerHeight, Action } from './Header';

type Props = {
  action: Action;
  className?: string;
  stickyHeader: boolean;
};

const HeaderLinks: React.FC<{ links: typeof links; className?: string }> = ({
  links,
  className
}) => {
  return (
    <ul
      className={clsx(
        'flex items-center space-x-9 text-[14px] font-medium uppercase leading-[1.25] text-brand-white',
        className
      )}>
      {links.map((item, idx) => {
        if (item.inactive) {
          return (
            <li key={idx}>
              <div className="relative">
                <a className="hover:cursor-not-allowed">{item.text}</a>
                <div
                  style={{
                    boxShadow: '0 0 0 0.5px #9AC9E3'
                  }}
                  className="bg-opacity-4 absolute -top-[9px] -right-7 rounded-sm bg-brand-light-blue/40 p-[3px] pb-[1px] text-[6px] font-extrabold">
                  Soon!
                </div>
              </div>
            </li>
          );
        }

        if (item.children) {
          return (
            <li key={idx} className="group relative">
              <div className="flex items-center hover:cursor-pointer hover:text-brand-gold">
                {item.text}
                <i className="w-[24px]">
                  <ChevronDownIcon />
                </i>
              </div>
              <div className="absolute left-0 top-full hidden -translate-x-6 pt-4 group-hover:block">
                <ul className="grid gap-6 whitespace-nowrap rounded-lg bg-dark px-6 py-4 pr-[63px]">
                  {item.children.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.url as string}>
                        <a target={link.target} className="hover:text-brand-gold">
                          {link.text}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        } else {
          return (
            <li key={idx}>
              <Link href={item.url as string}>
                <a className="hover:text-brand-gold">{item.text}</a>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

const DesktopHeader: React.FC<Props> = ({ stickyHeader = true }) => {
  const headerRef = useRef<HTMLElement>(null);
  useStickyHeader(headerRef, stickyHeader);

  return (
    <header>
      <nav
        style={{
          height: headerHeight
        }}
        ref={headerRef}
        className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 lg:px-4 xl:px-[54px]">
        <HeaderLinks links={links.filter((link) => link.position === 'left')} />

        <div className="flex items-center">
          <Link href="/">
            <a className="w-[164px]">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex flex-shrink-0 items-center justify-end">
          <HeaderLinks links={links.filter((link) => link.position == 'right')} />
          <div className="mx-9">
            <LanguageSwitcher />
          </div>
          <a
            className="btn-sm btn-secondary"
            href={socialLinks.discord}
            target="_blank"
            rel="noreferrer">
            <Trans>JOIN DISCORD</Trans>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
