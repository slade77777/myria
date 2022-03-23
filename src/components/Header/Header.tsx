import clsx from 'clsx';
import React from 'react';
import { useTabContext } from 'src/context/tabContext';
import DesktopHeader from './DesktopHeader';
import { linkSources } from './linkSources';
import MobileHeader from './MobileHeader';
import { Action, NavItem } from './type';

export const links: NavItem[] = Object.values(linkSources);
export const navHeight = 83;
export const bannerHeight = 50;
export const headerHeight = navHeight + bannerHeight;
export const bannerSpacingClassName = 'lg:pt-[50px]';
export const headerNavSpacingClassName = 'pt-[104px] md:pt-[133px]';

const Header: React.FC<{ action?: Action; className?: string; stickyHeader: boolean }> = ({
  action = 'login',
  className,
  stickyHeader = true
}) => {
  const { activatingTab } = useTabContext();
  let usedAction = action;
  if (action === 'auto') {
    usedAction = activatingTab === 'for-gamer' ? 'join-discord' : 'start-building';
  }
  return (
    <div className={clsx('absolute top-0 z-10 w-full', className)}>
      <div className="hidden lg:block">
        <DesktopHeader action={usedAction} stickyHeader={stickyHeader} />
      </div>
      <div className="lg:hidden">
        <MobileHeader action={usedAction} />
      </div>
    </div>
  );
};

export default Header;
