import React from 'react';
import { MissionReward } from './MissionReward';
import { NftReward } from './NftReward/NftReward';

export const NFTRewards: React.FC = () => {
  return (
    <>
      <div className="h-[234px]">
        <NftReward />
      </div>
      <div className="h-[calc(100%-234px-32px)]">
        <MissionReward />
      </div>
    </>
  );
};

