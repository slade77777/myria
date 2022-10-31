import { useMutation, useQuery } from 'react-query';
import apiClient from 'src/client';

type NftReward = {
  title?: string;
  imageUrl?: string;
  status?: 'locked' | 'in_progress' | 'claimable' | 'claimed';
  rewardId?: number;
  creditsRequired?: number;
  progressPercentage?: number;
};
let t = false;
export const useNftRewardQuery = () => {
  const getRewardQuery = useQuery('getNftRewardQuery', () => {
    return new Promise<NftReward[]>((r) => {
      setTimeout(() => {
        const rewards: NftReward[] = [
          {
            rewardId: 2,
            title: 'Ultra rare',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 1,
            status: 'locked'
          },
          {
            rewardId: 1,
            title: 'Common Federation Chest',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 1,
            status: t ? 'claimed' : 'claimable'
          },
          {
            rewardId: 3,
            title: 'Ultra Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 50,
            status: 'in_progress'
          },
          {
            rewardId: 4,
            title: 'Common Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 1,
            status: 'claimed'
          },
          {
            rewardId: 5,
            title: 'Common Title',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 1,
            status: 'locked'
          },
          {
            rewardId: 6,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 7,
            title: 'Ultra Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 1,
            status: 'locked'
          },
          {
            rewardId: 8,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 9,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 10,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 11,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 12,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 13,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 14,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 15,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 16,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 17,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 18,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 19,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 20,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 21,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 22,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 23,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          },
          {
            rewardId: 24,
            title: 'Rare Federation Sigil',
            imageUrl: '/images/Common.png',
            creditsRequired: 1,
            progressPercentage: 90,
            status: 'in_progress'
          }
        ];
        t = true;
        return r(rewards);
      }, 1000);
    });
  });

  const claimRewardMutation = useMutation((rewardId: number) => {
    return new Promise((r) => {
      setTimeout(() => r(true), 1000);
    }).then(() => {});
  });

  return { getRewardQuery, claimRewardMutation };
};
