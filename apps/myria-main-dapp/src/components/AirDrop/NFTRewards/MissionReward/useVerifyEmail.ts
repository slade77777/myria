import { useMutation } from 'react-query';
import { campaignApiClient } from 'src/client';
import { useAuthenticationContext } from 'src/context/authentication';

const verifyEmail = async (missionCode: string, userId?: number) => {
  return campaignApiClient.patch(`users/${userId}/verify-email`, { missionCode });
};

export const useVerifyEmail = ({ missionCode, options }: { missionCode: string; options: any }) => {
  const { idUserCampaign } = useAuthenticationContext();
  return useMutation(() => verifyEmail(missionCode, idUserCampaign), options);
};
