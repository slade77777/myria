import React, { useEffect, useMemo, useRef, useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import { headerHeight, Action, navHeight, NavItem } from './Header';
import clsx from 'clsx';
import Link from 'next/link';
import Collapse from '../Collapse';
import { socialLinks } from '../../configs';
import { Trans } from '@lingui/macro';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import Hamburger from 'hamburger-react';
import LanguageSwitcher from '../LanguageSwitcher';
import Socials from '../Social';

type Props = {
  action: Action;
  className?: string;
};

type OverlayProps = {
  onClose: () => void;
  open: boolean;
  top: number;
};

export const links: NavItem[] = [
  {
    text: <Trans>Home</Trans>,
    url: '/',
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Games</Trans>,
    url: '/games',
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Store</Trans>,
    url: '/store',
    inactive: true,
    position: 'left',
    action: 'join-discord'
  },
  {
    text: <Trans>Nodes</Trans>,
    url: '/nodes',
    position: 'left',
    action: 'join-discord'
  },

  {
    text: <Trans>Ecosystem</Trans>,
    url: '/ecosystem',
    position: 'left',
    action: 'join-discord'
  },
  // {
  //   text: <Trans>DEVELOPER PROGRAM</Trans>,
  //   url: '/developer-program',
  //   position: 'left',
  //   action: 'start-building'
  // },
  {
    text: <Trans>About</Trans>,
    position: 'right',
    children: [
      {
        text: <Trans>Our team</Trans>,
        url: '/team'
      },
      {
        text: <Trans>FOR GAMERS</Trans>,
        url: '/games'
      },
      {
        text: <Trans>FOR STUDIOS</Trans>,
        url: '/studios'
      }
    ]
  },
  {
    text: <Trans>Community</Trans>,
    position: 'right',
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
      },
      {
        text: 'Medium',
        url: socialLinks.medium,
        target: '_blank'
      }
    ]
  }
];

const HeaderOverlay = ({ open, action, top }: OverlayProps & Props) => {
  const actionElements = useMemo(() => {
    switch (action) {
      case 'start-building':
        return (
          <div>
            <a
              href={socialLinks.discord}
              target="_blank"
              className="btn-lg w-full btn-secondary col-span-2 text-center"
              rel="noreferrer">
              <Trans>JOIN DISCORD</Trans>
            </a>
            <div className="mt-[30px] grid grid-flow-col justify-center gap-4 sm:gap-6">
              {Socials.map((item, idx) => (
                <a href={item.link} target="_blank" key={idx} className="w-[32px]" rel="noreferrer">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        );

      case 'login':
        return (
          <>
            <button className="btn-lg btn-primary">Sign up</button>
            <button className="btn-lg btn-secondary">Log in</button>
          </>
        );
      default:
        return (
          <div>
            <a
              href={socialLinks.discord}
              target="_blank"
              className="btn-lg btn-primary col-span-2 w-full text-center"
              rel="noreferrer">
              <Trans>JOIN DISCORD</Trans>
            </a>
            <div className="mt-[30px] grid grid-flow-col justify-center gap-4 sm:gap-6">
              {Socials.map((item, idx) => (
                <a href={item.link} target="_blank" key={idx} className="w-[32px]" rel="noreferrer">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        );
    }
  }, [action]);

  return (
    <div
      style={{
        height: `calc(100vh - ${top}px)`,
        top: top,
        transitionProperty: 'visibility'
      }}
      className={clsx(
        ' invisible fixed left-0 isolate z-[9] flex w-full flex-col overflow-auto duration-700',
        {
          '!visible': open
        }
      )}>
      <div
        style={{
          opacity: open ? 1 : 0,
          paddingTop: headerHeight
        }}
        className="flex h-full w-full flex-col bg-dark/70 backdrop-blur-lg transition duration-500">
        <ul
          style={{
            overscrollBehavior: 'contain'
          }}
          className={clsx(
            'grid flex-grow content-start gap-[33px] overflow-auto px-[24px] pb-4 pt-2 text-[18px] font-medium uppercase leading-[1.25] text-white'
          )}>
          {links
            .filter((link) => !link.action || link.action === action)
            .map((item, idx) => {
              if (item.inactive) {
                return (
                  <li key={idx}>
                    <div className="relative w-fit">
                      <a className="hover:cursor-pointer hover:text-brand-gold">{item.text}</a>
                      <div
                        style={{
                          boxShadow: '0 0 0 0.5px #9AC9E3'
                        }}
                        className="bg-opacity-4 absolute -top-[9px] -right-6 rounded-sm bg-brand-light-blue/40 p-[3px] text-[6px] font-extrabold">
                        Soon!
                      </div>
                    </div>
                  </li>
                );
              }

              if (item.children) {
                return (
                  <li key={idx} className="">
                    <Collapse asChild>
                      {({ open }) => (
                        <div>
                          <Collapse.Trigger asChild>
                            <div
                              className={clsx(
                                'flex items-center justify-between hover:cursor-pointer hover:text-brand-gold',
                                {
                                  'text-brand-gold': open
                                }
                              )}>
                              <span>{item.text}</span>
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
                                  <Link href={link.url as string}>
                                    <a target={link.target} className="text-brand-gold">
                                      {link.text}
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
                    <Link href={item.url as string}>
                      <a className="hover:text-brand-gold">{item.text}</a>
                    </Link>
                  </li>
                );
              }
            })}
          <li className="mt-[48px] grid gap-y-6 gap-x-4 sm:mt-[62px] sm:grid-cols-2">
            {actionElements}
          </li>
        </ul>
      </div>
    </div>
  );
};

const navHeightMobile = 104;
const MobileHeader: React.FC<Props> = ({ action }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((o) => !o);
  };

  const navRef = useRef<HTMLElement>(null);
  useStickyHeader(navRef);

  const top = navRef.current?.getBoundingClientRect().top ?? 0;

  useEffect(() => {
    if (openMenu) {
      document.querySelector('body')!.style.overflow = 'hidden';
    } else {
      document.querySelector('body')!.style.overflow = 'unset';
    }
  }, [openMenu]);

  return (
    <header className="relative isolate w-full">
      <nav ref={navRef} className="w-full">
        <div
          style={{
            height: navHeightMobile
          }}
          className={clsx('relative z-10 flex w-full items-center justify-between py-4 px-6')}>
          <Link href="/">
            <a className="w-full max-w-[164px]">
              <Logo />
            </a>
          </Link>
          {/* <div className="ml-auto mr-6 flex">
            <LanguageSwitcher isMobile />
          </div> */}
          <button onClick={toggleMenu} className="">
            <Hamburger size={24} direction="right" toggled={openMenu} />
          </button>
        </div>
        <HeaderOverlay top={top} action={action} onClose={toggleMenu} open={openMenu} />
      </nav>
    </header>
  );
};

export default MobileHeader;
