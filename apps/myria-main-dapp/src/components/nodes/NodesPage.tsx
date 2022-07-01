import clsx from 'clsx';
import React from 'react';
import { paddingX } from 'src/utils';
import { headerHeight } from '../Header';
import Page from '../Page';
import Banner from './Banner';
import ProfileHeader from './ProfileHeader';
import Sidebar from './Sidebar2';

const NodesPage: React.FC = ({ children }) => {
  return (
    <Page footerClassName="hidden">
      <div
        style={{
          paddingTop: headerHeight
        }}
        className="pb-[71px]">
        <Banner />
        <div
          style={{
            backgroundSize: '100% auto'
          }}
          className={clsx(
            paddingX,
            "bg-[url('/images/nodes/purchase-page-bg.png')] bg-top bg-no-repeat"
          )}>
          <div className="mt-8">
            <ProfileHeader />
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 md:mt-10 md:grid-cols-[auto_1fr]">
            <div>
              <Sidebar />
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NodesPage;
