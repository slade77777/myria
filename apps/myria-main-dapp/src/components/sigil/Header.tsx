import React, { useRef } from 'react';
import Link from 'next/link';
import ChevronLeftIcon from 'src/components/icons/ChevronLeftIcon';
import Logo from 'src/components/icons/Logo';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { Trans } from '@lingui/macro';
import ProfileComponent from 'src/components/Header/ProfileComponent';

type Props = {
  step: number;
};

const Header: React.FC<Props> = ({ step }) => {
  const headerRef = useRef<HTMLElement>(null);
  useStickyHeader(headerRef);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 z-50 w-full">
      <div className="body-14-bold w-full bg-brand-gold p-4 text-center text-black">
        On August 1 you will no longer be able to earn points and unlock new reward tiers from Sigil
        missions
      </div>
      <div className="grid h-[80px] w-full grid-cols-[1fr_auto_1fr] items-center bg-[rgba(0,0,0,0.1)] p-4 px-6">
        <Link href="/">
          <a className="flex items-center md:space-x-1.5">
            <i className="w-6">
              <ChevronLeftIcon />
            </i>
            <span className="hidden text-[14px] font-medium leading-[1.2] md:block">
              <Trans>BACK TO MYRIA HOME</Trans>
            </span>
          </a>
        </Link>
        <Link href="/">
          <a className="w-[164px]">
            <Logo />
          </a>
        </Link>
        <div className="flex items-center justify-end">{step !== 0 && <ProfileComponent />}</div>
      </div>
    </header>
  );
};

export default Header;
