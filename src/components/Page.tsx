import clsx from 'clsx';
import React from 'react';
import { paddingX } from '../utils';
import Footer from './Footer';
import Header, { Action } from './Header';

type Props = {
  action?: Action;
  headerClassName?: string;
  footerClassName?: string;
  stickyHeader?: boolean;
};

const Page: React.FC<Props> = ({ children, action, headerClassName, stickyHeader = true }) => {
  return (
    <div className="relative min-h-screen bg-red-500 text-white">
      <Header
        className={headerClassName}
        action={action}
        stickyHeader={!!stickyHeader || stickyHeader === undefined}
      />
      <div className="bg-dark">
        {children}
        <div className={clsx(paddingX, 'pb-[149px] md:pb-[112px]')}>
          <div className="mx-auto max-w-content">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
