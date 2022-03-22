import clsx from 'clsx';
import React from 'react';
import { paddingX } from 'src/utils';
import AllianceInfo from './AllianceInfo';
import Missions from './Missions';
// import Rewards from './Rewards';

const Dashboard: React.FC = () => {
  return (
    <div className={clsx(paddingX, 'pt-[136px] pb-[238px]')}>
      <div className="grid grid-cols-[292fr_616fr_212fr] gap-8">
        <div>
          <AllianceInfo />
        </div>
        {/* <div>
          <Rewards />
        </div> */}
        <div>
          <Missions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
