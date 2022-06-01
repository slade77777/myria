import { useMutation, useQuery } from "react-query";
import apiClient from "src/client";

type NftReward = {
  title?: string;
  imageUrl?: string;
  status?: 'locked' | 'in_progress' | 'claimable' | 'claimed';
  rewardId?: number;
  creditsRequired?: number;
  progressPercentage?: number;
}
// let t = false;
export const useNftRewardQuery = () => {
  const getRewardQuery = useQuery('getNftRewardQuery', () => {
    
    // return new Promise<NftReward[]>((r) => {
    //   setTimeout(() => {
    //       const rewards: NftReward[] = [
    //         {
    //           rewardId: 2,
    //           title: 'Ultra rare',
    //           imageUrl: 'https://assets-dev.nonprod-myria.com/sigil/Sigil/VectorPrime/Ultra%20Rare@2x.png',
    //           creditsRequired: 1,
    //           progressPercentage: 1,
    //           status: 'locked',
    //         },
    //         {
    //           rewardId: 1,
    //           title: 'Ultra rare',
    //           imageUrl: 'https://assets-dev.nonprod-myria.com/sigil/Sigil/VectorPrime/Ultra%20Rare@2x.png',
    //           creditsRequired: 1,
    //           progressPercentage: 1,
    //           status: t ? 'claimed' : 'claimable',
    //         }
    //       ]
    //       t = true;
    //       return r(rewards);
    //   }, 1000);
    // })
    return apiClient.get('sigil/users/rewards')
      .then(res => {
        if (res.data && res.data.data && res.data.data instanceof Array) {
          const rewards: NftReward[] = res.data.data.filter(Boolean).map((raw: any) => ({
            rewardId: raw.reward_id,
            title: raw.title,
            imageUrl: raw.image_url,
            creditsRequired: raw.credits_required,
            progressPercentage: raw.progress_percentage,
            status: raw.status,
          }))

          return rewards.filter(reward => ['locked', 'claimable', 'claimed'].includes(reward.status || ''));
        }
        return null;
      })
  });

  const claimRewardMutation = useMutation((rewardId: number ) => {
    return apiClient.post('sigil/users/rewards', { reward_id: rewardId }).then(() => {})
    // return new Promise((r) => {
    //   setTimeout(() => r(true), 1000)
    // }).then(() => {});
  })

  return { getRewardQuery, claimRewardMutation };
};
