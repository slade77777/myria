import { useAuthenticationContext } from 'src/context/authentication';
import { reqRewardUserClaim } from 'src/services/campaignService';
import { RewardType } from 'src/types/campaign';
import { REWARD_STATUS } from 'src/utils';
import { NftBox } from './NftBox';

const BUTTON_TEXT = {
  [REWARD_STATUS.LOCKED]: '',
  [REWARD_STATUS.AVAILABLE]: 'CLAIM',
  [REWARD_STATUS.CLAIMED]: 'CLAIMED'
};

export function NftReward() {
  const { userCampaign, userProfileQuery } = useAuthenticationContext();

  const nextReward: RewardType | undefined = userCampaign?.rewards.find(
    (item: RewardType) => item.rewardStatus === REWARD_STATUS.AVAILABLE
  );

  const claimReward = (rewardId: number) => {
    if (userCampaign) {
      return reqRewardUserClaim({ rewardId: rewardId, userId: userCampaign?.userId });
    }
    return;
  };

  const buttonTextNFTReward = (status: string, point: number) => {
    if (status === REWARD_STATUS.LOCKED) {
      return `${point} POINT`;
    }
    return BUTTON_TEXT[status];
  };

  return (
    <div className="overflow-x-auto py-3">
      <div className="flex w-full">
        {userCampaign?.rewards.map((reward: RewardType) => {
          const buttonText = buttonTextNFTReward(reward.rewardStatus, reward.point);
          return (
            <NftBox
              key={reward.id}
              imageUrl={reward.imageUrl || '/images/Common.png'}
              titleText={reward.name}
              buttonText={buttonText}
              containerClassname="mr-6"
              isBlur={reward.rewardStatus !== REWARD_STATUS.AVAILABLE}
              onClaim={
                reward.rewardStatus === REWARD_STATUS.AVAILABLE
                  ? () => claimReward(reward.id)
                  : undefined
              }
              onClaimSuccess={() => userProfileQuery.refetch()}
              isNextReward={nextReward && (nextReward as any as RewardType).id === reward.id}
            />
          );
        })}
      </div>
    </div>
  );
}
