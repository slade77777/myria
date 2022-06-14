import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { paddingX } from 'src/utils';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import { socialLinks } from 'src/configs';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import Hamburger from 'hamburger-react';
import Collapse from '../Collapse';
import DropdownMenu from '../DropdownMenu';
import LogoutIcon from '../icons/LogoutIcon';
import { Trans } from '@lingui/macro';
import { useAuthenticationContext } from 'src/context/authentication';
import { useGA4 } from 'src/lib/ga';

const links = [
  {
    label: 'For gamers',
    href: '/'
  },
  {
    label: 'For developers',
    href: '/for-developers'
  },
  {
    label: 'About',
    href: '/our-vision'
  },
  {
    label: 'Community',
    children: [
      {
        id: 'discord',
        label: 'Discord',
        href: socialLinks.discord,
        target: '_blank'
      },
      {
        id: 'twitter',
        label: 'Twitter',
        href: socialLinks.twitter,
        target: '_blank'
      },
      {
        id: 'instagram',
        label: 'Instagram',
        href: socialLinks.instagram,
        target: '_blank'
      },
      {
        id: 'medium',
        label: 'Medium',
        href: socialLinks.medium,
        target: '_blank'
      }
    ]
  }
];

const navHeightMobile = 104;
const Header: React.FC = () => {
  const { address, onConnect, disconnect } = useWalletContext();
  const { user, register } = useAuthenticationContext();
  const { event } = useGA4();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={clsx(paddingX, 'fixed top-0 left-0 z-10 w-full bg-dark py-7 md:py-10')}>
      <header className="relative z-10 mx-auto flex max-w-content items-center">
        <Link href="/">
          <a className="w-[123px] md:w-[165px]">
            <Logo />
          </a>
        </Link>
        <ul className="mx-4 hidden items-center space-x-10 md:flex lg:ml-[173px]">
          {links.map((item, idx) => {
            if (item.children) {
              return (
                <li key={idx} className="group relative">
                  <div
                    className={clsx(
                      'body-14-medium flex items-center uppercase hover:cursor-pointer hover:text-brand-gold'
                    )}>
                    {item.label}
                    <i className="w-[24px]">
                      <ChevronDownIcon />
                    </i>
                  </div>
                  <div className="absolute left-0 top-full z-10 hidden -translate-x-6 pt-4 group-hover:block">
                    <ul className="grid gap-6 whitespace-nowrap rounded-lg bg-dark px-6 py-4 pr-[63px]">
                      {item.children.map((link, idx) => (
                        <li key={idx}>
                          <Link href={link.href as string}>
                            <a
                              target={link.target}
                              className={clsx('body-14-medium uppercase hover:text-brand-gold')}>
                              {link.label}
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
                  <Link href={item.href as string}>
                    <a className={clsx('body-14-medium uppercase hover:text-brand-gold')}>
                      {item.label}
                    </a>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div className="ml-auto flex items-center space-x-3">
          {address ? (
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <button className=" body-14-bold flex items-center space-x-2 rounded-lg border border-base/5 bg-base/3 px-4 py-[9px]">
                  <span>{truncateString(address)}</span>
                  <i className="w-4">
                    <ChevronDownIcon />
                  </i>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                align="end"
                className="rounded-md bg-current p-3 text-base/3">
                <DropdownMenu.Arrow className="translate-x-3 fill-current" />
                <div className="text-white">
                  <button
                    className="body-14-medium flex items-center space-x-2.5 text-white"
                    onClick={disconnect}>
                    <i className="w-4">
                      <LogoutIcon />
                    </i>
                    <span>
                      <Trans>Disconnect</Trans>
                    </span>
                  </button>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => {
                onConnect();
                // event('Connect Wallet Selected', { campaign: 'Sigil' });
              }}
              className="body-14-bold rounded-lg border border-white py-[9px] px-4 uppercase hover:border-primary/7">
              <Trans>Connect wallet</Trans>
            </button>
          )}
          {
            user && !user.user_name && <button onClick={register} className="body-14-bold hidden rounded-lg bg-primary/6 py-[9px] px-4 uppercase text-base/1 hover:bg-primary/5 md:block">
              <Trans>Sign up</Trans>
            </button>
          }
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen((o) => !o)}>
            <Hamburger size={24} />
          </button>
        </div>
      </header>
      <div
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          paddingTop: navHeightMobile
        }}
        className={clsx(
          'fixed top-0 left-0 z-[9] flex h-full w-full flex-col bg-dark/70 backdrop-blur-lg transition duration-500',
          {
            'pointer-events-none': !isMobileMenuOpen
          }
        )}>
        <ul
          style={{
            overscrollBehavior: 'contain'
          }}
          className={clsx(
            'grid flex-grow content-start gap-[33px] overflow-auto px-[24px] pb-4 pt-8 text-[18px] font-medium uppercase leading-[1.25] text-white'
          )}>
          {links.map((item, idx) => {
            if (item.children) {
              return (
                <li key={idx} className="">
                  <Collapse asChild>
                    {({ open }) => (
                      <div>
                        <Collapse.Trigger asChild>
                          <div
                            className={clsx(
                              'body-14-bold flex items-center justify-between hover:cursor-pointer hover:text-brand-gold',
                              {
                                'text-brand-gold': open
                              }
                            )}>
                            <span>{item.label}</span>
                            <i
                              className={clsx('w-[24px] transition duration-300', {
                                'rotate-180': open
                              })}>
                              <ChevronDownIcon />
                            </i>
                          </div>
                        </Collapse.Trigger>
                        <Collapse.Content className="collapse-content">
                          <ul className="grid gap-6 whitespace-nowrap rounded-lg px-6 pt-6 text-[16px]">
                            {item.children!.map((link, idx) => (
                              <li key={idx}>
                                <Link href={link.href as string}>
                                  <a target={link.target} className="body-14-bold text-brand-gold">
                                    {link.label}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse.Content>
                      </div>
                    )}
                  </Collapse>
                </li>
              );
            } else {
              return (
                <li key={idx}>
                  <Link href={item.href as string}>
                    <a className="body-14-bold hover:text-brand-gold">{item.label}</a>
                  </Link>
                </li>
              );
            }
          })}
          <li className="mx-auto mt-[56px] grid w-full max-w-[480px]">
            <button className="body-14-bold w-full rounded-lg bg-primary/6 py-[9px] px-4 uppercase text-base/1 hover:bg-primary/5">
              <Trans>Sign in</Trans>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
