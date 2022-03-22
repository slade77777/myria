import React from 'react';
import RewardItem, { Reward } from './RewardItem';

const currentRewards: Reward[] = [
  {
    title: 'Reward 1',
    credits: 100,
    state: 'claim-now',
    image: '/images/nodes/insignia/reward-item-1.png'
  },
  {
    title: 'Reward 2',
    credits: 200,
    state: 'progress',
    image: '/images/nodes/insignia/reward-item-1.png'
  }
];

const nextRewards: Reward[] = [
  {
    title: 'Reward 1',
    credits: 100,
    state: 'locked',
    image: '/images/nodes/insignia/reward-item-1.png'
  },
  {
    title: 'Reward 2',
    credits: 200,
    state: 'locked',
    image: '/images/nodes/insignia/reward-item-1.png'
  },
  {
    title: 'Reward 1',
    credits: 100,
    state: 'locked',
    image: '/images/nodes/insignia/reward-item-1.png'
  },
  {
    title: 'Reward 2',
    credits: 200,
    state: 'locked',
    image: '/images/nodes/insignia/reward-item-1.png'
  }
];

const Rewards: React.FC = () => {
  const nextReward = nextRewards[0];
  const otherNextRewards = nextRewards.slice(1);
  return (
    <div className="insignia-panel p-6 pb-8">
      <div className="flex items-center justify-between">
        <p className="text-[24px] font-extrabold leading-[1.15]">Rewards</p>
        <button className="rounded-[4px] bg-[#1F2334] py-[9px] px-2 text-[14px] font-bold uppercase leading-[1.14] text-light">
          MINTING DASHBOARD
        </button>
      </div>
      <div className="mt-8">
        <div className="space-y-6">
          {currentRewards.map((rw, idx) => (
            <RewardItem
              key={idx}
              image={rw.image}
              state={rw.state}
              title={rw.title}
              credits={rw.credits}
            />
          ))}
        </div>
        <p className="mt-6 flex items-center space-x-4 text-[18px] font-bold leading-[1.22]">
          <span className="h-[2px] flex-1 bg-gradient-to-l from-white to-white/0 "></span>
          <span>Next Reward</span>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-white to-white/0"></span>
        </p>
        <div className="mt-6">
          <RewardItem
            image={nextReward.image}
            state={nextReward.state}
            title={nextReward.title}
            credits={nextReward.credits}
          />
        </div>
        <p className="mt-6 flex items-center">
          <span className="h-[2px] flex-1 bg-gradient-to-l from-white to-white/0 "></span>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-white to-white/0"></span>
        </p>
        <div className="mt-6 space-y-6 opacity-60">
          {otherNextRewards.map((rw, idx) => (
            <RewardItem
              key={idx}
              image={rw.image}
              state={rw.state}
              title={rw.title}
              credits={rw.credits}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
