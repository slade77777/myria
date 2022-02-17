import React, { useEffect, useRef, useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import CloseIcon from '../icons/CloseIcon';
import Logo from '../icons/Logo';
import MenuIcon from '../icons/MenuIcon';
import { links, headerHeight, Action } from './Header';
import clsx from 'clsx';
import Link from 'next/link';
import Collapse from '../Collapse';
import { socialLinks } from '../../configs';
import { Trans } from '@lingui/macro';

type Props = {
  action: Action;
  className?: string;
};

type OverlayProps = {
  onClose: () => void;
  open: boolean;
  top: number;
};

const HeaderOverlay = ({ onClose, open, action, top }: OverlayProps & Props) => {
  return (
    <div
      style={{
        height: `calc(100vh - ${top}px)`,
        top
      }}
      className={clsx(
        'invisible fixed left-0 z-10 flex w-full flex-col overflow-auto transition duration-700',
        {
          '!visible': open
        }
      )}>
      <nav
        style={{
          height: headerHeight
        }}
        className={clsx(
          'invisible flex flex-shrink-0 items-center justify-between bg-[#050E15] py-4  px-[24px]',
          {
            '!visible': open
          }
        )}>
        <div className="w-full max-w-[164px]">
          <Logo />
        </div>
        <button onClick={onClose} className="w-[32px] text-white">
          <CloseIcon />
        </button>
      </nav>
      <ul
        style={{
          overscrollBehavior: 'contain'
        }}
        className={clsx(
          'grid flex-grow translate-x-full content-start gap-[33px] overflow-auto bg-[#050E15] px-[24px] pb-4 pt-2 text-[18px] font-medium uppercase leading-[1.25] text-white  duration-500',
          {
            '!translate-x-0': open
          }
        )}>
        {links.map((item, idx) => {
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
                        <ul className="grid gap-6 whitespace-nowrap rounded-lg bg-dark px-6 pt-6 text-[16px]">
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
          {action == 'login' && (
            <>
              <button className="btn-lg btn-primary">Sign up</button>
              <button className="btn-lg btn-secondary">Log in</button>
            </>
          )}
          {action == 'join-discord' && (
            <a
              href={socialLinks.discord}
              target="_blank"
              className="btn-lg btn-secondary col-span-2 text-center"
              rel="noreferrer">
              <Trans>JOIN DISCORD</Trans>
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};

const MobileHeader: React.FC<Props> = ({ action }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((o) => !o);
  };
  const navRef = useRef<HTMLElement>(null);

  const top = navRef.current?.getBoundingClientRect().top ?? 0;

  useEffect(() => {
    if (openMenu) {
      document.querySelector('body')!.style.overflow = 'hidden';
    } else {
      document.querySelector('body')!.style.overflow = 'unset';
    }
  }, [openMenu]);

  return (
    <header>
      <nav
        style={{
          height: headerHeight
        }}
        ref={navRef}
        className="flex items-center justify-between py-4 px-6">
        <Link href="/">
          <a className="w-full max-w-[164px]">
            <Logo />
          </a>
        </Link>
        <button onClick={toggleMenu} className="w-[32px]">
          <MenuIcon />
        </button>
      </nav>
      <HeaderOverlay top={top} action={action} onClose={toggleMenu} open={openMenu} />
    </header>
  );
};

export default MobileHeader;
