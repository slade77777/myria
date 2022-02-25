import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import { paddingX } from 'src/utils';
import ProfileHeader from 'src/components/nodes/ProfileHeader';
import Sidebar from 'src/components/nodes/Sidebar';
import Banner from 'src/components/nodes/Banner';
import GeneralInfo from 'src/components/nodes/dashboard/GeneralInfo';
import TimeOnline from 'src/components/nodes/dashboard/TimeOnline';
import NodeProgress from 'src/components/nodes/dashboard/NodeProgress';
import TotalNodes from 'src/components/nodes/dashboard/TotalNodes';
import Licenses from 'src/components/nodes/dashboard/Licenses';
import ShareTwitter from 'src/components/nodes/dashboard/ShareTwitter';
import LatestReward from 'src/components/nodes/dashboard/LatestReward';

const Dashboard: React.FC = () => {
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
            <div className="">
              <div>
                <GeneralInfo />
              </div>
              <div className="mt-6 grid gap-y-6 gap-x-8 md:grid-cols-[400fr_616fr]">
                <div className="flex flex-col space-y-6 md:space-y-8">
                  <div className="md:order-[1]">
                    <TimeOnline />
                  </div>
                  <div className="md:order-[3]">
                    <TotalNodes />
                  </div>
                  <div className="md:order-[2]">
                    <NodeProgress />
                  </div>
                  <div className="md:order-[4]">
                    <Licenses />
                  </div>
                  <div className="md:order-[5]">
                    <ShareTwitter />
                  </div>
                </div>
                <div>
                  <LatestReward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
