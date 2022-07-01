import { useMutation } from 'react-query';
import http from 'src/client';

interface UsePickSigilQueryParams {
  onPickSigilSuccess?: () => void;
  onPickSigilError?: () => void;
}

const pickAlliance = (allianceId: string) => {
  return http.post(`sigil/users/alliance`, {
    alliance_id: allianceId
  });
};

export const usePickSigilQuery = (params?: UsePickSigilQueryParams) => {
  const pickSigilMutation = useMutation(pickAlliance, {
    onSuccess: params?.onPickSigilSuccess,
    onError: params?.onPickSigilError,
  });

  return {
    pickSigilMutation,
  };
};
