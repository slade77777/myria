import { Trans } from '@lingui/macro';
import Link from 'next/link';
import React from 'react';
import ProfileComponent from '../Header/ProfileComponent';
import Logo from '../icons/Logo';
import Page from '../Page';
import Sidebar from './Sidebar';
import Hamburger from 'hamburger-react';

const NodesLayout: React.FC = ({ children }) => {
  return (
    <Page headerClassName="hidden" footerClassName="hidden">
      <div className="px-6 py-9 md:p-0">
        <div className="flex min-h-[60px] items-center justify-between md:hidden">
          <Link href="/">
            <a className="w-[123px]">
              <Logo />
            </a>
          </Link>
          <Hamburger size={24} direction="right" onToggle={() => {}} />
        </div>
        <div className="mt-[18px] grid bg-dark md:mt-0 md:grid-cols-[auto_1fr]">
          <div className="hidden min-w-[295px] md:block">
            <Sidebar />
          </div>
          <div>
            <div className="top-0 z-10 flex items-center justify-between bg-dark pb-8 md:sticky md:pl-6 md:pr-7 md:pt-[56px]">
              <Link href="/games">
                <a className="leading-[1.5 text-[14px] font-medium uppercase">
                  <Trans>Games</Trans>
                </a>
              </Link>
              <div className="flex items-center">
                <ProfileComponent
                  className="[&>img]:hidden body-14-bold w-auto border border-base/5 bg-base/3 px-4 py-[9px]"
                  showArrow
                />
                <div className="ml-4">
                  <button className="btn-lg btn-primary h-[40px] py-0">Sign in</button>
                </div>
              </div>
            </div>
            <div className=" md:pl-6 md:pr-7">{children}</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NodesLayout;
