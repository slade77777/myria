import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import { useTabContext } from 'src/context/tabContext';
import DesktopHeader from './DesktopHeader';
import { linkSources } from './linkSources';
import MobileHeader from './MobileHeader';
import { Action, NavItem } from './type';
import { useWalletContext } from 'src/context/wallet';
import { useL2WalletContext } from 'src/context/l2-wallet';
import SessionTimeoutCountModal from '../SessionTimeoutCountModal';
import BrowserNotSupportedModal from '../modals/BrowserNotSupportedModal';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useAuthenticationContext } from '../../context/authentication';

export const links: NavItem[] = Object.values(linkSources);
export const navHeight = 93;
export const bannerHeight = 50;
export const headerHeight = navHeight + bannerHeight;
export const bannerSpacingClassName = 'lg:pt-[50px]';
export const headerNavSpacingClassName = 'pt-[104px] md:pt-[93px]';

const SESSION_TIME_OUT = 1000 * 60 * 20;

const Header: React.FC<{ action?: Action; className?: string; stickyHeader: boolean }> = ({
  action = 'login',
  className,
  stickyHeader = true
}) => {
  const { logout } = useAuthenticationContext();
  const { activatingTab } = useTabContext();
  const { disconnect, address } = useWalletContext();
  const { disconnectL2Wallet } = useL2WalletContext();
  const [showSessionTimeoutModal, setShowSessionTimeoutModal] = useState(false);

  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');

  const ref = useRef<any>(null);
  let usedAction = action;
  if (action === 'auto') {
    usedAction = activatingTab === 'for-gamer' ? 'join-discord' : 'start-building';
  }

  const onIdle = () => {
    setShowSessionTimeoutModal(true);
  };

  const onActive = () => {
    setShowSessionTimeoutModal(false);
  };

  const disconnectAll = () => {
    setShowSessionTimeoutModal(false);
    disconnect();
    disconnectL2Wallet();
    logout();
  };

  const cancel = () => {
    setShowSessionTimeoutModal(false);
    ref?.current?.reset();
  };
  return (
    <div className={clsx('absolute top-0 z-10 w-full', className)}>
      {walletAddress && (
        <IdleTimer
          ref={ref}
          stopOnIdle={true}
          onIdle={onIdle}
          onActive={onActive}
          timeout={SESSION_TIME_OUT}
        />
      )}

      <div className="hidden lg:block">
        <DesktopHeader action={usedAction} stickyHeader={stickyHeader} />
      </div>
      <div className="lg:hidden">
        <MobileHeader action={usedAction} />
      </div>
      <SessionTimeoutCountModal
        open={showSessionTimeoutModal}
        cancel={cancel}
        onClose={() => setShowSessionTimeoutModal(false)}
        successClose={() => {
          disconnectAll();
        }}
      />
      <BrowserNotSupportedModal />
    </div>
  );
};

export default Header;
