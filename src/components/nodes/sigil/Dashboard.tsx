import clsx from 'clsx';
import React from 'react';
import { paddingX } from 'src/utils';
import AllianceInfo from './AllianceInfo';
import Missions from './Missions';
import Rewards from './Rewards';

const Dashboard: React.FC = () => {
  return (
    <div
      className={clsx(
        paddingX,
        "h-screen bg-[url('/images/nodes/sigil/dashboard-bg_op.jpg')] bg-top bg-no-repeat pt-[112px] pb-[35px] [background-size:100%_auto]"
      )}>
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[252fr_616fr_252fr] gap-8">
        <div className="h-full pt-[56px]">
          <AllianceInfo />
        </div>
        <div className="h-full min-h-0">
          <Rewards />
        </div>
        <div className="h-full min-h-0 pt-[56px]">
          <Missions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
