import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useRef } from 'react';
import { useAuthenticationContext } from 'src/context/authentication';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { useGA4 } from 'src/lib/ga';
import ConnectL2WalletButton from '../ConnectL2WalletButton';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import Logo from '../icons/Logo';
import PurchaseCheckout from '../marketplace/PurchasePopover/PurchaseCheckout';
import PurchaseScreen from '../marketplace/PurchasePopover/PurchaseScreen';
import WithdrawNFTScreen from '../marketplace/Withdraw-NFT/WithdrawNFTScreen';
import WthdrawNFTPopover from '../marketplace/Withdraw-NFT/WthdrawNFTPopover';
import { links, navHeight } from './Header';
import ProfileComponent from './ProfileComponent';
import { Action, NavItem } from './type';
import UserAvatar from './UserAvatar';

type Props = {
  action: Action;
  className?: string;
  stickyHeader: boolean;
  links?: NavItem[];
};

const HeaderLinks: React.FC<{ links: NavItem[]; className?: string }> = ({ links, className }) => {
  const router = useRouter();
  const { event } = useGA4();

  return (
    <ul
      className={clsx(
        'text-brand-white flex items-center space-x-8 text-[14px] font-semibold uppercase leading-[1.25] tracking-wider',
        className
      )}>
      {links.map((item, idx) => {
        const isActive = item.url && router.pathname?.includes(item.url);
        if (item.inactive) {
          return (
            <li key={idx}>
              <div className="relative">
                <a className="hover:cursor-not-allowed">{item.text}</a>
                <div
                  style={{
                    boxShadow: '0 0 0 0.5px #9AC9E3'
                  }}
                  className="bg-opacity-4 bg-brand-light-blue/40 absolute -top-[9px] -right-7 rounded-sm p-[3px] pb-[1px] text-[6px] font-extrabold">
                  <Trans>Soon!</Trans>
                </div>
              </div>
            </li>
          );
        }

        if (item.children) {
          return (
            <li key={idx} className="relative group">
              <div className={clsx('hover:text-brand-gold flex items-center hover:cursor-pointer')}>
                {item.text}
                <i className="w-[24px]">
                  <ChevronDownIcon />
                </i>
              </div>
              <div className="absolute left-0 hidden pt-4 -translate-x-6 top-full group-hover:block">
                <ul className="bg-dark grid gap-6 whitespace-nowrap rounded-lg px-6 py-4 pr-[63px]">
                  {item.children.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.url as string}>
                        <a
                          onClick={() => {
                            if (item.id === 'community') {
                              // @ts-ignore
                              event(item.event, {
                                button_location: 'Community Links'
                              });
                            }
                          }}
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
            <Link href={item.url as string}>
              <a
                className={clsx('hover:text-blue/6 flex items-center space-x-1', {
                  'text-blue/6': isActive
                })}
                target={item.target}>
                <li
                  key={idx}
                  className={clsx(
                    'hover:bg-base/4 flex items-center rounded-[8px] py-[9px] px-[13px]',
                    {
                      'bg-base/4': isActive
                    }
                  )}>
                  <span>{item.text}</span>
                  {item.icon && <i className="w-4 ml-1">{item.icon}</i>}
                </li>
              </a>
            </Link>
          );
        }
      })}
    </ul>
  );
};

const DesktopHeader: React.FC<Props> = ({ stickyHeader = true, action }) => {
  const { event } = useGA4();
  const headerRef = useRef<HTMLElement>(null);
  useStickyHeader(headerRef, stickyHeader);
  const { login, user } = useAuthenticationContext();
  const walletModalRef = useRef<any>();

  const onShowModal = async () => {
    walletModalRef.current.onOpenModal();
  };

  // const selectTabHandle = (param: number) => {
  //   setActiveTab(param);
  // };

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
        return user?.wallet_id ? <ProfileComponent /> : <></>;

      case 'mint':
        return (
          <Link href={'/sigil'}>
            <a
              style={{
                filter: 'drop-shadow(0px 0px 10px #F5B941)'
              }}
              className="btn-sm btn-secondary">
              <Trans>Free Sigil NFT</Trans>
            </a>
          </Link>
        );
      default:
        return (
          <a
            onClick={() => {
              event('Discord Button Clicked', { button_location: 'Top Button' });
            }}
            className="btn-sm btn-secondary"
            href="http://discord.gg/myria"
            target="_blank"
            rel="noreferrer">
            <Trans>JOIN DISCORD</Trans>
          </a>
        );
    }
  }, [action, user?.wallet_id, event]);

  const filterdLinks = links.filter((link) => !link.action || link.action.includes(action));

  return (
    <header ref={headerRef} className="w-full bg-base/3">
      {/* <div className="hidden text-black lg:block">
        <NotiBanner />
      </div> */}
      <nav
        style={{
          height: navHeight
        }}
        className="flex w-full grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 lg:px-4 xl:px-[54px]">
        <div className="flex mr-12 items-left">
          <Link href="/">
            <a className="w-[164px]">
              <Logo />
            </a>
          </Link>
        </div>
        <HeaderLinks links={filterdLinks.filter((link) => link.position === 'left')} />

        <div className="absolute flex items-center justify-end flex-shrink-0 right-8 space-x-9">
          <HeaderLinks links={filterdLinks.filter((link) => link.position == 'right')} />
          <div>
            <ConnectL2WalletButton />
            <WthdrawNFTPopover>
              <WithdrawNFTScreen />
            </WthdrawNFTPopover>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
