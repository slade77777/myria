import React, { useState } from 'react';
import BoxIcon from 'src/components/icons/BoxIcon';
import ClaimModal from './ClaimModal';
import RewardItem, { Reward } from './RewardItem';
import { SubtractLeft, SubtractRight } from './Subtract';

const currentRewards: Reward[] = [
  {
    title: 'Reward 1',
    credits: 100,
    state: 'claim-now',
    image: '/images/nodes/sigil/reward-item-1.png'
  },
  {
    title: 'Reward 2',
    credits: 200,
    state: 'progress',
    image: '/images/nodes/sigil/reward-item-1.png'
  }
];

const nextRewards: Reward[] = [
  {
    title: 'Reward 1',
    credits: 100,
    state: 'locked',
    image: '/images/nodes/sigil/reward-item-1.png'
  },
  {
    title: 'Reward 2',
    credits: 200,
    state: 'locked',
    image: '/images/nodes/sigil/reward-item-1.png'
  },
  {
    title: 'Reward 1',
    credits: 100,
    state: 'locked',
    image: '/images/nodes/sigil/reward-item-1.png'
  },
  {
    title: 'Reward 2',
    credits: 200,
    state: 'locked',
    image: '/images/nodes/sigil/reward-item-1.png'
  }
];

const Rewards: React.FC = () => {
  const nextReward = nextRewards[0];
  const otherNextRewards = nextRewards.slice(1);
  const [claimItem, setClaimItem] = useState<Reward | null>(null);

  const handleClaim = (reward: Reward) => {
    setClaimItem(reward);
  };

  return (
    <>
      <ClaimModal
        open={!!claimItem}
        onClose={() => {
          setClaimItem(null);
        }}
        item={claimItem}
      />
      <div className="relative flex h-full flex-col px-7">
        <div className="">
          <div className="flex items-center">
            <div className="h-[1px] flex-1 bg-border-blue opacity-20">
              <div className="absolute top-0 left-0 translate-x-[-7px] translate-y-[5px]">
                <SubtractLeft />
              </div>
              <div className="absolute top-0 left-0 h-full w-[1px] translate-y-4 bg-gradient-to-b from-border-blue via-transparent to-transparent" />
            </div>
            <p className="sigil-text mx-8 text-[20px] font-extrabold leading-[1.25]">REWARDS</p>
            <div className="h-[1px] flex-1 bg-border-blue opacity-20">
              <div className="absolute top-0 right-0 translate-x-[7px] translate-y-[5px]">
                <SubtractRight />
              </div>
              <div className="absolute top-0 right-0 h-full w-[1px] translate-y-4 bg-gradient-to-b from-border-blue via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-1 flex justify-end">
            <p className="flex items-center space-x-1 text-[14px] font-extrabold leading-[1.25] text-brand-light-blue">
              <i className="w-4">
                <BoxIcon />
              </i>
              <span>INVENTORY</span>
            </p>
          </div>
        </div>
        <div className="mt-6 flex-grow overflow-auto">
          <div className="space-y-6">
            {currentRewards.map((rw, idx) => (
              <RewardItem key={idx} item={rw} onClaim={handleClaim} />
            ))}
          </div>
          <p className="mt-6 flex items-center space-x-4 text-[18px] font-bold leading-[1.22]">
            <span className="h-[2px] flex-1 bg-gradient-to-l from-white to-white/0 "></span>
            <span>Next Reward</span>
            <span className="h-[2px] flex-1 bg-gradient-to-r from-white to-white/0"></span>
          </p>
          <div className="mt-6">
            <RewardItem item={nextReward} onClaim={handleClaim} />
          </div>
          <p className="mt-6 flex items-center">
            <span className="h-[2px] flex-1 bg-gradient-to-l from-white to-white/0 "></span>
            <span className="h-[2px] flex-1 bg-gradient-to-r from-white to-white/0"></span>
          </p>
          <div className="mt-6 space-y-6 opacity-60">
            {otherNextRewards.map((rw, idx) => (
              <RewardItem key={idx} item={rw} onClaim={handleClaim} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewards;
