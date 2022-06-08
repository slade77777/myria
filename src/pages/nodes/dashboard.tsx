import React from 'react';
import GeneralInfo from 'src/components/nodes/dashboard/GeneralInfo';
import TimeOnline from 'src/components/nodes/dashboard/TimeOnline';
import NodeProgress from 'src/components/nodes/dashboard/NodeProgress';
import TotalNodes from 'src/components/nodes/dashboard/TotalNodes';
import Licenses from 'src/components/nodes/dashboard/Licenses';
import ShareTwitter from 'src/components/nodes/dashboard/ShareTwitter';
import LatestReward from 'src/components/nodes/dashboard/LatestReward';
import NodesPage from 'src/components/nodes/NodesPage';

const Dashboard: React.FC = () => {
  return (
    <NodesPage>
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
    </NodesPage>
  );
};

export default Dashboard;
