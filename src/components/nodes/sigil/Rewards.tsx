import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import BoxIcon from 'src/components/icons/BoxIcon';
import { Loading } from 'src/components/Loading';
import { Reward } from 'src/types/sigil';
import ClaimModal from './ClaimModal';
import RewardItem from './RewardItem';
import { SubtractLeft, SubtractRight } from './Subtract';

const fakeData: Reward[] = [
  {
    reward_id: 1,
    title: 'Common Sigil',
    description: '',
    image_url: '',
    credits_required: 20,
    status: 'claimed'
  },
  {
    reward_id: 2,
    title: 'Common Alliance Chest',
    description: '',
    image_url: '',
    credits_required: 50,
    status: 'claimable'
  },
  {
    reward_id: 3,
    title: 'Common Title',
    description: '',
    image_url: '',
    credits_required: 100,
    status: 'locked'
  },
  {
    reward_id: 4,
    title: 'Rare Sigil',
    description: '',
    image_url: '',
    credits_required: 200,
    status: 'locked'
  },
  {
    reward_id: 5,
    title: 'Ultra Rare Sigil',
    description: '',
    image_url: '',
    credits_required: 500,
    status: 'locked'
  },
  {
    reward_id: 6,
    title: 'Epic Title',
    description: '',
    image_url: '',
    credits_required: 1000,
    status: 'locked'
  },
  {
    reward_id: 7,
    title: 'Rare Alliance Chest',
    description: '',
    image_url: '',
    credits_required: 2000,
    status: 'locked'
  }
];

const Rewards: React.FC = () => {
  const [claimItem, setClaimItem] = useState<Reward | null>(null);
  const { data } = useQuery<Reward[]>('sigilRewards', async () => {
    return fakeData;
  });

  const claimedItems = data?.filter((reward) => reward.status === 'claimed') ?? [];
  const claimableItems = data?.filter((reward) => reward.status === 'claimable') ?? [];
  const lockedItems = data?.filter((reward) => reward.status === 'locked') ?? [];

  const nextReward = lockedItems?.[0];
  const otherNextRewards = lockedItems?.slice(1);

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
          <div className="relative mt-1 flex justify-end">
            <Link href="/inventory" passHref>
              <a className="cursor-pointer">
                <p className="flex items-center space-x-1 text-[14px] font-extrabold leading-[1.25] text-brand-light-blue">
                  <i className="w-4">
                    <BoxIcon />
                  </i>
                  <span>INVENTORY</span>
                </p>
              </a>
            </Link>
          </div>
        </div>
        {!data ? (
          <div className="mt-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="mt-6 flex-grow overflow-auto" id="scrollbar">
            <div className="space-y-6">
              {[...claimedItems, ...claimableItems].map((rw, idx) => (
                <RewardItem key={idx} item={rw} onClaim={handleClaim} />
              ))}
            </div>
            <p className="mt-6 flex items-center space-x-4 text-[18px] font-bold leading-[1.22]">
              <span className="h-[2px] flex-1 bg-gradient-to-l from-white to-white/0 "></span>
              <span>Next Reward</span>
              <span className="h-[2px] flex-1 bg-gradient-to-r from-white to-white/0"></span>
            </p>
            {nextReward && (
              <div className="mt-6">
                <RewardItem item={nextReward} onClaim={handleClaim} />
              </div>
            )}
            {otherNextRewards && (
              <>
                <p className="mt-6 flex items-center">
                  <span className="h-[2px] flex-1 bg-gradient-to-l from-white to-white/0 "></span>
                  <span className="h-[2px] flex-1 bg-gradient-to-r from-white to-white/0"></span>
                </p>
                <div className="mt-6 space-y-6 opacity-60">
                  {otherNextRewards.map((rw, idx) => (
                    <RewardItem key={idx} item={rw} onClaim={handleClaim} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Rewards;
