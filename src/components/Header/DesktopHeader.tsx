import Link from 'next/link';
import React from 'react';
import { socialLinks } from '../../configs';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import { links, headerHeight, Action } from './Header';

type Props = {
  action: Action;
  className?: string;
};

const DesktopHeader: React.FC<Props> = ({ action }) => {
  return (
    <header>
      <nav
        style={{
          height: headerHeight
        }}
        className="py-4 lg:px-4 xl:px-[54px] flex items-center justify-between">
        <div className="flex items-center w-[220px]">
          <Link href="/">
            <a className="w-full max-w-[164px]">
              <Logo />
            </a>
          </Link>
        </div>
        <ul className="text-[14px] leading-[1.25] uppercase font-medium grid grid-flow-col gap-[38px] items-center mx-auto text-brand-white">
          {links.map((item, idx) => {
            if (item.inactive) {
              return (
                <li key={idx}>
                  <div className="relative">
                    <a className="hover:cursor-not-allowed">{item.text}</a>
                    <div className="font-extrabold text-[6px] rounded-sm absolute -top-[9px] -right-7 p-[3px] pb-[1px] bg-brand-light-blue/40 bg-opacity-4 border-[0.5px] border-brand-light-blue">
                      Soon!
                    </div>
                  </div>
                </li>
              );
            }

            if (item.children) {
              return (
                <li key={idx} className="relative group">
                  <div className="flex items-center hover:text-brand-gold hover:cursor-pointer">
                    {item.text}
                    <i className="w-[24px]">
                      <ChevronDownIcon />
                    </i>
                  </div>
                  <div className="absolute left-0 hidden pt-4 -translate-x-6 group-hover:block top-full">
                    <ul className="bg-dark px-6 py-4 pr-[63px] rounded-lg whitespace-nowrap grid gap-6">
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
        <div className="flex items-center w-[220px] justify-end flex-shrink-0">
          {/* {action === 'login' && (
            <>
              <button className="btn-sm btn-primary">Sign up</button>
              <button className="btn-sm btn-secondary ml-[21px]">Log in</button>
            </>
          )} */}
          {/* {action === 'join-discord' && ( */}
          <a
            className="btn-sm btn-secondary"
            href={socialLinks.discord}
            target="_blank"
            rel="noreferrer">
            JOIN DISCORD
          </a>
          {/* )} */}
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
