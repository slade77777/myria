import { useMutation } from 'react-query';
import { campaignApiClient } from 'src/client';

interface UsePickSigilQueryParams {
  onPickSigilSuccess?: () => void;
  onPickSigilError?: () => void;
}

const pickAlliance = ({ allianceId, userId }: { allianceId: number; userId: number }) => {
  return campaignApiClient.patch(`/users/${userId}/alliances`, {
    allianceId: allianceId
  });
};

export const usePickSigilQuery = (params?: UsePickSigilQueryParams) => {
  const pickSigilMutation = useMutation(pickAlliance, {
    onSuccess: params?.onPickSigilSuccess,
    onError: params?.onPickSigilError
  });

  return {
    pickSigilMutation
  };
};
