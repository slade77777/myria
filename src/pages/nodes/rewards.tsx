import React from 'react';
import NodesPage from 'src/components/nodes/NodesPage';
import RewardList from 'src/components/nodes/rewards/RewardList';
import TotalRewards from 'src/components/nodes/rewards/TotalRewards';

const Rewards: React.FC = () => {
  return (
    <NodesPage>
      <div>
        <TotalRewards />
      </div>
      <div className="mt-6 md:mt-8">
        <RewardList />
      </div>
    </NodesPage>
  );
};

export default Rewards;
