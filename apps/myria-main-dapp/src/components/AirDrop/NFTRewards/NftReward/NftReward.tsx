import lodash from 'lodash';
import { useState } from 'react';
import { useAuthenticationContext } from 'src/context/authentication';
import { reqRewardUserClaim } from 'src/services/campaignService';
import { CampaignResponseType, RewardUserClaimResponse, RewardType } from 'src/types/campaign';
import { rewardsDefaultImg, REWARD_IMG_DEFAULT, REWARD_STATUS } from 'src/utils';
import { NftBox } from './NftBox';

const BUTTON_TEXT = {
  [REWARD_STATUS.LOCKED]: '',
  [REWARD_STATUS.AVAILABLE]: 'CLAIM NOW',
  [REWARD_STATUS.CLAIMED]: 'CLAIMED'
};

export function NftReward() {
  const { userCampaign, userProfileQuery } = useAuthenticationContext();

  const nextReward: RewardType | undefined = userCampaign?.rewards.find(
    (item: RewardType) => item.rewardStatus === REWARD_STATUS.LOCKED
  );

  const claimReward = async (rewardId: number) => {
    if (userCampaign) {
      const res: CampaignResponseType<RewardUserClaimResponse> = await reqRewardUserClaim({
        rewardId: rewardId,
        userId: userCampaign?.userId
      });

      if (res.status === 'success' && res.data.status === REWARD_STATUS.CLAIMED) {
        /// refetch get new list reward
        userProfileQuery.refetch();
      }
    }
    return;
  };

  const buttonTextNFTReward = (status: string, point: number) => {
    if (status === REWARD_STATUS.LOCKED) {
      return `${point} ${point > 1 ? "POINTS" : "POINT"}`;
    }
    return BUTTON_TEXT[status];
  };

  return (
    <div className="overflow-x-auto py-3">
      <div className="flex w-full">
        {userCampaign?.rewards.map((reward: RewardType, index) => {
          const buttonText = buttonTextNFTReward(reward.rewardStatus, reward.point);
          const nameImgObj: keyof typeof REWARD_IMG_DEFAULT = (lodash.camelCase(reward.name)) as keyof typeof REWARD_IMG_DEFAULT;
          return (
            <NftBox
              key={reward.id}
              imageUrl={reward.imageUrl || REWARD_IMG_DEFAULT[nameImgObj]}
              titleText={reward.name}
              buttonText={buttonText}
              containerClassname="mr-6"
              isBlur={
                reward.rewardStatus !== REWARD_STATUS.AVAILABLE &&
                (nextReward as any as RewardType).id !== reward.id
              }
              onClaim={
                reward.rewardStatus === REWARD_STATUS.AVAILABLE
                  ? async () => await claimReward(reward.id)
                  : undefined
              }
              onClaimSuccess={() => { }}
              isNextReward={nextReward && (nextReward as any as RewardType).id === reward.id}
              isDisablePoint={
                userCampaign.availablePoints < reward.threshold ||
                (nextReward && (nextReward as any as RewardType).id === reward.id)
              }
              rewardStatus={reward.rewardStatus}
            />
          );
        })}
      </div>
    </div>
  );
}
