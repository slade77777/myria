import { useQuery } from 'react-query';
import { campaignApiClient } from 'src/client';
import { AirdropUser } from 'src/types/airdrop';

export const useAirdropUser = (walletId?: string) => {
  return useQuery(
    ['airdrop-user-id', walletId],
    async () => {
      const res = await campaignApiClient.get(`/users/wallet-address/${walletId!.toLowerCase()}`);
      return res.data.data as AirdropUser;
    },
    {
      staleTime: Infinity,
      enabled: !!walletId
    }
  );
};
