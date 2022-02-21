import { Trans } from '@lingui/macro';
import Link from 'next/link';
import React from 'react';
import truncateString from 'src/helper';
import { useWalletContext } from 'src/context/wallet';
import { socialLinks } from '../../configs';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import { links, headerHeight, Action } from './Header';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useAuthenticationContext } from 'src/context/authentication';
import LinearSettingIcon from '../icons/LinearSettingIcon';
import SignOutIcon from '../icons/SignOutIcon';
import DashboardIcon from '../icons/DashboardIcon';
import WalletIcon from '../icons/WalletIcon';

type Props = {
  action: Action;
  className?: string;
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
      <PopoverPrimitive.Root modal>
        <PopoverPrimitive.Trigger asChild>
          <div className="flex items-center rounded-3xl bg-[#081824] px-6 py-3 hover:cursor-pointer">
            <img src={'/images/header-user.png'} alt={address} className="mr-3" />
            <div>{truncateString(address || '')}</div>
          </div>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content asChild side="bottom" sideOffset={5}>
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
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    );
  }

  return (
    <PopoverPrimitive.Root modal>
      <PopoverPrimitive.Trigger asChild>
        <div className="flex items-center rounded-3xl bg-[#081824] px-6 py-3 hover:cursor-pointer">
          <img src={'/images/header-user.png'} alt={address} className="mr-3" />
          <div>{truncateString(address || '')}</div>
        </div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content asChild side="bottom" sideOffset={5}>
        <div className="flex items-center rounded-xl bg-[#091824] px-6 py-3 text-white">
          <button onClick={disconnect} className="ml-2">
            Disconnect
          </button>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};

const DesktopHeader: React.FC<Props> = ({ action }) => {
  const { address, onConnect } = useWalletContext();
  const { login } = useAuthenticationContext();

  return (
    <header>
      <nav
        style={{
          height: headerHeight
        }}
        className="flex items-center justify-between py-4 lg:px-4 xl:px-[54px]">
        <div className="flex w-[220px] items-center">
          <Link href="/">
            <a className="w-full max-w-[164px]">
              <Logo />
            </a>
          </Link>
        </div>
        <ul className="mx-auto grid grid-flow-col items-center gap-[38px] text-[14px] font-medium uppercase leading-[1.25] text-brand-white">
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
        <div className="flex w-[268px] flex-shrink-0 items-center justify-end">
          {/* {action === 'login' && (
            <>
              <button className="btn-sm btn-primary">Sign up</button>
              <button className="btn-sm btn-secondary ml-[21px]">Log in</button>
            </>
          )} */}
          {/* {action === 'join-discord' && ( */}
          {/* <a
            className="btn-sm btn-secondary"
            href={socialLinks.discord}
            target="_blank"
            rel="noreferrer">
            <Trans>JOIN DISCORD</Trans>
          </a>
            JOIN DISCORD
          </a> */}
          {/* )} */}

          {address ? (
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
          )}
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
