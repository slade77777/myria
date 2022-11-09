import { useQuery } from 'react-query';
import { campaignApiClient } from 'src/client';
import { AllianceName } from 'src/types/sigil';

export const useAlliances = () => {
  return useQuery('airdrop-alliances', async () => {
    const res = await campaignApiClient.get('/alliances');

    const data = res.data.data as {
      id: number;
      code: AllianceName;
      name: string;
      description: 'Federation';
      imageUrl: string;
      createdAt: string;
      updatedAt: string;
    }[];

    return data;
  });
};
