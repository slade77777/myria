import React, { useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import CloseIcon from '../icons/CloseIcon';
import Logo from '../icons/Logo';
import MenuIcon from '../icons/MenuIcon';
import { links, headerHeight, Action } from './Header';
import clsx from 'clsx';
import Link from 'next/link';
import Collapse from '../Collapse';
import { socialLinks } from '../../configs';

type Props = {
  action: Action;
};

const HeaderOverlay = ({
  onClose,
  open,
  action
}: { onClose: () => void; open: boolean } & Props) => {
  return (
    <div
      className={clsx(
        'transition invisible duration-700 flex flex-col fixed h-full top-0 left-0 overflow-auto z-10 w-full',
        {
          '!visible': open
        }
      )}>
      <nav
        style={{
          height: headerHeight
        }}
        className={clsx(
          'invisible py-4 flex items-center justify-between px-[24px] flex-shrink-0  bg-[#050E15]',
          {
            '!visible': open
          }
        )}>
        <div className="w-full max-w-[164px]">
          <Logo />
        </div>
        <button onClick={onClose} className="w-[32px]">
          <CloseIcon />
        </button>
      </nav>
      <ul
        style={{
          overscrollBehavior: 'contain'
        }}
        className={clsx(
          'translate-x-full duration-500 pb-4 text-white px-[24px] pt-2 grid gap-[33px] content-start text-[18px] leading-[1.25] uppercase font-medium flex-grow overflow-auto  bg-[#050E15]',
          {
            '!translate-x-0': open
          }
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
                            'hover:text-brand-gold flex items-center justify-between hover:cursor-pointer',
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
                        <ul className="text-[16px] bg-dark px-6 pt-6 rounded-lg whitespace-nowrap grid gap-6">
                          {item.children!.map((link, idx) => (
                            <li key={idx}>
                              <Link href={link.url as string}>
                                <a className="text-brand-gold">{link.text}</a>
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
        <li className="mt-[48px] sm:mt-[62px] grid sm:grid-cols-2 gap-y-6 gap-x-4">
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
              className="col-span-2 text-center btn-lg btn-secondary"
              rel="noreferrer">
              JOIN DISCORD
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

  return (
    <header>
      <nav className="py-[40px] px-[24px] flex items-center justify-between">
        <Link href="/">
          <a className="w-full max-w-[164px]">
            <Logo />
          </a>
        </Link>
        <button onClick={toggleMenu} className="w-[32px]">
          <MenuIcon />
        </button>
      </nav>
      <HeaderOverlay action={action} onClose={toggleMenu} open={openMenu} />
    </header>
  );
};

export default MobileHeader;
