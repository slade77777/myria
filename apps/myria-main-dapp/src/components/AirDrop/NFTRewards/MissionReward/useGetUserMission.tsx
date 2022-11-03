import { useQuery } from 'react-query';
import { getUserProfileCampaign } from 'src/services/campaignService';

export default function useGetUserMission() {
  const queryKey = ['user', 'campaign-mission'];
  const { data, isLoading, error } = useQuery(queryKey, () => getUserProfileCampaign(`1`, `1`));

  return {
    data: data,
    isLoading,
    error
  };
}
