import React from 'react';
import { NftBox } from './NftBox';
import { useNftRewardQuery } from './useNftRewardQuery';

export function NftReward() {
  const { getRewardQuery, claimRewardMutation } = useNftRewardQuery();
  const { data: rewards } = getRewardQuery;
  const nextReward = React.useMemo(() => rewards?.find((r) => r.status === 'locked'), [rewards]);

  return (
    <div className="overflow-x-auto py-3">
      <div className="flex w-full">
        {rewards?.map((reward) => {
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
              containerClassname="mr-6"
              isBlur={
                (reward.status === 'locked' || reward.status === 'claimed') &&
                nextReward?.rewardId !== reward.rewardId
              }
              isBlurButton={reward.status === 'locked' && nextReward?.rewardId !== reward.rewardId}
              isNextReward={nextReward?.rewardId === reward.rewardId}
            />
          );
        })}
      </div>
    </div>
  );
}
