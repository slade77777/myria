import clsx from 'clsx';
import lodash from 'lodash';
import { useAuthenticationContext } from 'src/context/authentication';
import { RewardType } from 'src/types/campaign';
import { REWARD_IMG_DEFAULT, REWARD_STATUS } from 'src/utils';
import { NftBox } from '../NFTRewards/NftReward';

export const MyVaultComponent = () => {
  const { userCampaign } = useAuthenticationContext();
  const myVaultNFTClaimed: RewardType[] | undefined = userCampaign?.rewards.filter(
    (item: RewardType) => item.rewardStatus === REWARD_STATUS.CLAIMED
  );

  return (
    <div className={clsx('h-full pr-7')}>
      <div
        className={clsx('mb-8 flex h-[102px] flex-col items-center justify-center rounded-xl', {
          "bg-dark bg-[url('/images/nodes/airdrop/inventory_banner.png')] bg-cover bg-bottom bg-no-repeat":
            true
        })}>
        <p className={clsx('mb-2 text-center text-xl font-extrabold')}>
          Sigils will be activated later in time when the mysterious Sigma mission sets into motion
        </p>
        <span className={clsx('text-center text-base font-normal text-[#97AAB5]')}>
          Be prepared as this might be the key for survival in the Myriaverse.
        </span>
      </div>
      <div
        className={clsx(
          'flex h-[calc(100%-102px-32px)] flex-wrap items-start justify-start gap-6 overflow-auto py-3'
        )}>
        {myVaultNFTClaimed && myVaultNFTClaimed?.length > 0 ? (
          myVaultNFTClaimed.map((reward: RewardType, index: number) => {
            const nameImgObj: keyof typeof REWARD_IMG_DEFAULT = lodash.camelCase(
              reward.name
            ) as keyof typeof REWARD_IMG_DEFAULT;
            return (
              <NftBox
                key={reward.id}
                imageUrl={reward.imageUrl || REWARD_IMG_DEFAULT[nameImgObj]}
                titleText={reward.name}
                buttonText={REWARD_STATUS.CLAIMED}
                containerClassname="mr-6"
                isMyVault={true}
              />
            );
          })
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-2xl font-extrabold text-white">You don’t have any rewards yet</p>
            <span className="text-lg font-normal">Complete some missions to unlock rewards</span>
          </div>
        )}
      </div>
    </div>
  );
};
