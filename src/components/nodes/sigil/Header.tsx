import React, { useRef } from 'react';
import Link from 'next/link';
import ChevronLeftIcon from 'src/components/icons/ChevronLeftIcon';
import Logo from 'src/components/icons/Logo';
import { useStickyHeader } from 'src/hooks/useStickyHeader';
import { Trans } from '@lingui/macro';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  useStickyHeader(headerRef);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 z-10 grid h-[80px] w-full grid-cols-[1fr_auto_1fr] items-center p-4 px-6 text-white">
      <Link href="/">
        <a className="flex items-center space-x-1.5">
          <i className="w-6">
            <ChevronLeftIcon />
          </i>
          <span className="text-[14px] font-medium leading-[1.2]">
            <Trans>RETURN</Trans>
          </span>
        </a>
      </Link>
      <Link href="/">
        <a className="w-[164px]">
          <Logo />
        </a>
      </Link>
    </header>
  );
};

export default Header;
