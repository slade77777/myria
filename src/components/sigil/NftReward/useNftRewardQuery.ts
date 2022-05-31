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

export const useNftRewardQuery = () => {
  const getRewardQuery = useQuery('getNftRewardQuery', () => {
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

          return rewards;
        }
        return null;
      })
  });

  const claimRewardMutation = useMutation((rewardId: number ) => {
    return apiClient.post('sigil/users/rewards', { reward_id: rewardId }).then(() => {})
    // return new Promise((r) => {
    //   setTimeout(() => r(true), 2000)
    // }).then(() => {});
  })

  return { getRewardQuery, claimRewardMutation };
};
