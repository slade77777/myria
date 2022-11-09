import { useMutation } from 'react-query';
import { campaignApiClient } from 'src/client';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';

const verifyEmail = async (missionCode: string, userId?: number) => {
  return campaignApiClient.patch(`users/${userId}/verify-email`, { missionCode });
};

export const useVerifyEmail = ({ missionCode, options }: { missionCode: string; options: any }) => {
  const [userCampaignId] = useLocalStorage(localStorageKeys.userCampaignId, '');

  return useMutation(() => verifyEmail(missionCode, +userCampaignId), options);
};
