import clsx from 'clsx';
import { useAuthenticationContext } from 'src/context/authentication';
import { RewardType } from 'src/types/campaign';
import { REWARD_STATUS } from 'src/utils';
import { NftBox } from '../NFTRewards/NftReward';

export const MyVaultComponent = () => {
  const { userCampaign } = useAuthenticationContext();
  const myVaultNFTClaimed: RewardType[] | undefined = userCampaign?.rewards.filter(
    (item: RewardType) => item.rewardStatus === REWARD_STATUS.CLAIMED
  );

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
        {myVaultNFTClaimed && myVaultNFTClaimed?.length > 0 ? (
          myVaultNFTClaimed.map((reward: RewardType) => {
            return (
              <NftBox
                key={reward.id}
                imageUrl={reward.imageUrl || '/images/Common.png'}
                titleText={reward.name}
                buttonText={REWARD_STATUS.CLAIMED}
                containerClassname="mr-6"
                isMyVault={true}
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
