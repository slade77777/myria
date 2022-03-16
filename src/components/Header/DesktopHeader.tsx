import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef } from 'react';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { socialLinks } from '../../configs';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import NotiBanner from '../NotiBanner';
import { links, headerHeight, Action, NavItem, navHeight } from './Header';

type Props = {
  action: Action;
  className?: string;
  stickyHeader: boolean;
  links?: NavItem[];
};

const HeaderLinks: React.FC<{ links: NavItem[]; className?: string }> = ({ links, className }) => {
  const router = useRouter();

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
              <div className={clsx("flex items-center hover:cursor-pointer hover:text-brand-gold")}>
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
                        <a target={link.target} className={clsx("hover:text-brand-gold", {
                          "text-brand-gold": link.url === router.pathname
                        })}>
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
                <a className={clsx("hover:text-brand-gold", {
                  "text-brand-gold": item.url === router.pathname
                })}>{item.text}</a>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

const DesktopHeader: React.FC<Props> = ({ stickyHeader = true, action }) => {
  const headerRef = useRef<HTMLElement>(null);
  useStickyHeader(headerRef, stickyHeader);

  const actionElements = useMemo(() => {
    switch (action) {
      case 'start-building':
        return (
          <a
            className="btn-sm btn-secondary"
            href={socialLinks.discord}
            target="_blank"
            rel="noreferrer">
            <Trans>START BUILDING</Trans>
          </a>
        );

      default:
        return (
          <a
            className="btn-sm btn-secondary"
            href={socialLinks.discord}
            target="_blank"
            rel="noreferrer">
            <Trans>JOIN DISCORD</Trans>
          </a>
        );
    }
  }, [action]);

  const filterdLinks = links.filter((link) => !link.action || link.action == action);
  return (
    <header

      ref={headerRef}
      className="w-full"
    >
      <div className="hidden lg:block text-black">
        <NotiBanner />
      </div>
      <nav
        style={{
          height: navHeight
        }}
        className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 lg:px-4 xl:px-[54px]">
        <HeaderLinks links={filterdLinks.filter((link) => link.position === 'left')} />

        <div className="flex items-center">
          <Link href="/">
            <a className="w-[164px]">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex flex-shrink-0 items-center justify-end space-x-9">
          <HeaderLinks links={filterdLinks.filter((link) => link.position == 'right')} />
          {/* <div>
            <LanguageSwitcher />
          </div> */}
          {actionElements}
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
