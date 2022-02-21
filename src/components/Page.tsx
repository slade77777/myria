import clsx from 'clsx';
import React from 'react';
import { paddingX } from '../utils';
import Footer from './Footer';
import Header, { Action } from './Header';

type Props = {
  action?: Action;
  headerClassName?: string;
  stickyHeader?: boolean;
};

const Page: React.FC<Props> = ({ children, action, headerClassName, stickyHeader=true }) => {
  return (
    <div className="relative min-h-screen text-white bg-dark">
      <Header className={headerClassName} action={action} stickyHeader={!!stickyHeader || stickyHeader === undefined}/>
      {children}
      <div className={clsx(paddingX, 'pb-[149px] md:pb-[112px]')}>
        <div className="mx-auto max-w-content">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
