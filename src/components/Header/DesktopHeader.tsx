import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import truncateString from 'src/helper';
import { useWalletContext } from 'src/context/wallet';
import React, { useMemo, useRef } from 'react';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { socialLinks } from '../../configs';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useAuthenticationContext } from 'src/context/authentication';
import LinearSettingIcon from '../icons/LinearSettingIcon';
import SignOutIcon from '../icons/SignOutIcon';
import DashboardIcon from '../icons/DashboardIcon';
import WalletIcon from '../icons/WalletIcon';
import Popover from '../Popover';
import NotiBanner from '../NotiBanner';
import { links, navHeight } from './Header';
import { Action, NavItem } from './type';
import { useRouter } from 'next/router';

type Props = {
  action: Action;
  className?: string;
  stickyHeader: boolean;
  links?: NavItem[];
};

const ProfileMenus = [
  {
    text: 'My account',
    href: '/',
    icon: <LinearSettingIcon />
  },
  {
    text: 'Wallet',
    href: '/',
    icon: <WalletIcon />
  },
  {
    text: 'Node Dashboard',
    href: '/',
    icon: <DashboardIcon />
  }
];

const ProfileComponent: React.FC<{}> = ({}) => {
  const { address, disconnect } = useWalletContext();
  const { user } = useAuthenticationContext();
  if (user) {
    return (
      <Popover modal>
        <Popover.Trigger asChild>
          <div className="flex items-center rounded-3xl bg-[#081824] px-6 py-3 hover:cursor-pointer">
            <img src={'/images/header-user.png'} alt={address} className="mr-3" />
            <div>{truncateString(address || '')}</div>
          </div>
        </Popover.Trigger>
        <Popover.Content asChild side="bottom" sideOffset={5}>
          <div className="min-w-[164px] rounded-xl bg-[#091824] px-4 py-6 text-sm text-white">
            {ProfileMenus.map((menu) => {
              return (
                <Link href={menu.href} key={menu.href}>
                  <a className="mb-6 flex items-center">
                    {menu.icon}
                    <p className="ml-2">{menu.text}</p>
                  </a>
                </Link>
              );
            })}
            <div className="mt-6 flex items-center hover:cursor-pointer">
              <SignOutIcon />
              <p className="ml-2">Sign out</p>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  }

  return (
    <Popover modal>
      <Popover.Trigger asChild>
        <div className="flex items-center rounded-3xl bg-[#081824] px-6 py-3 hover:cursor-pointer">
          <img src={'/images/header-user.png'} alt={address} className="mr-3" />
          <div>{truncateString(address || '')}</div>
        </div>
      </Popover.Trigger>
      <Popover.Content asChild side="bottom" sideOffset={5}>
        <div className="flex items-center rounded-xl bg-[#091824] px-6 py-3 text-white">
          <button onClick={disconnect} className="ml-2">
            Disconnect
          </button>
        </div>
      </Popover.Content>
    </Popover>
  );
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
              <div className={clsx('flex items-center hover:cursor-pointer hover:text-brand-gold')}>
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
                        <a
                          target={link.target}
                          className={clsx('hover:text-brand-gold', {
                            'text-brand-gold': link.url === router.pathname
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
                <a
                  className={clsx('hover:text-brand-gold', {
                    'text-brand-gold': item.url === router.pathname
                  })}>
                  {item.text}
                </a>
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
  const { address, onConnect } = useWalletContext();
  const { login } = useAuthenticationContext();

  const actionElements = useMemo(() => {
    switch (action) {
      case 'start-building':
        return (
          <Link href={'/for-developers#dev-contact'}>
            <a className="btn-sm btn-secondary">
              <Trans>START BUILDING</Trans>
            </a>
          </Link>
        );

      case 'login':
        return address ? (
          <ProfileComponent />
        ) : (
          <div className="flex">
            <button className="btn-sm btn-primary mr-3 rounded-lg px-4" onClick={login}>
              Sign in
            </button>
            <button
              className="btn-sm btn-secondary min-w-[153px] rounded-lg px-4 py-3"
              onClick={onConnect}>
              Connect wallet
            </button>
          </div>
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
  }, [action, address, login, onConnect]);

  const filterdLinks = links.filter((link) => !link.action || link.action.includes(action));
  return (
    <header ref={headerRef} className="w-full">
      <div className="hidden text-black lg:block">
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
