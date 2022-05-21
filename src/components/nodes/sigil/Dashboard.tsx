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
        "flex min-h-screen bg-[url('/images/nodes/sigil/dashboard-bg_op.jpg')] bg-cover bg-top bg-no-repeat pt-[112px] pb-9"
      )}>
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[252fr_616fr_291px] gap-8">
        <div className="pt-[56px]">
          <AllianceInfo />
        </div>
        <div className="relative">
          <div className="absolute inset-0">
            <Rewards />
          </div>
        </div>
        <div className="flex pt-[56px]">
          <div className="relative w-full">
            <div className="absolute inset-0">
              <Missions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
