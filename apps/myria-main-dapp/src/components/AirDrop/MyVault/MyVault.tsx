import clsx from 'clsx';
import React from 'react';
import { NftBox } from '../NFTRewards/NftReward';
import { useNftRewardQuery } from '../NFTRewards/NftReward/useNftRewardQuery';

export const MyVaultComponent = () => {
  const { getRewardQuery, claimRewardMutation } = useNftRewardQuery();
  const { data: rewards } = getRewardQuery;
  const nextReward = React.useMemo(() => rewards?.find((r) => r.status === 'locked'), [rewards]);

  return (
    <div className={clsx('pr-7 h-full')}>
      <div
        className={clsx('flex h-[102px] rounded-xl justify-center items-center flex-col mb-8', {
          "bg-dark bg-[url('/images/nodes/airdrop/inventory_banner.png')] bg-cover bg-bottom bg-no-repeat":
            true
        })}>
        <p className={clsx('font-extrabold text-xl mb-2 text-center')}>
          Sigils will be activated later in time when the mysterious Sigma mission sets into motion
        </p>
        <span className={clsx('font-normal text-base text-center text-[#97AAB5]')}>
          Be prepared as this might be the key for survival in the Myriaverse.
        </span>
      </div>
      <div
        className={clsx(
          'flex gap-6 items-start justify-start flex-wrap py-3 overflow-auto h-[calc(100%-102px-32px)]'
        )}>
        {rewards && rewards?.length > 0 ? (
          rewards?.map((reward: any) => {
            if (!reward || !reward.rewardId) {
              return null;
            }

            let buttonText = '';
            switch (reward.status) {
              case 'claimed':
                buttonText = 'CLAIMED';
                break;
              case 'locked':
                buttonText = `${reward?.creditsRequired || '0'} POINTS`;
                break;
              case 'claimable':
                buttonText = 'CLAIM NOW';
                break;
              case 'in_progress':
                buttonText = `${reward?.progressPercentage || '0'}%`;
            }
            return (
              <NftBox
                key={reward.rewardId}
                titleText={reward.title || ''}
                imageUrl={reward.imageUrl || ''}
                buttonText={buttonText}
                onClaim={
                  reward.status === 'claimable' && reward.rewardId
                    ? () => claimRewardMutation.mutateAsync(reward.rewardId as number)
                    : undefined
                }
                onClaimSuccess={() => getRewardQuery.refetch()}
                containerClassname=""
                isBlur={
                  (reward.status === 'locked' || reward.status === 'claimed') &&
                  nextReward?.rewardId !== reward.rewardId
                }
                isBlurButton={
                  reward.status === 'locked' && nextReward?.rewardId !== reward.rewardId
                }
                isNextReward={nextReward?.rewardId === reward.rewardId}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-2xl text-white font-extrabold">You don’t have any rewards yet</p>
            <span className="text-lg font-normal">Complete some missions to unlock rewards</span>
          </div>
        )}
      </div>
    </div>
  );
};
