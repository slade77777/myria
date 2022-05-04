import { useMutation } from 'react-query';
import http from 'src/services/http';

const pickAlliance = (allianceId: string) => {
  return http.post(`/v1/sigil/users/alliance`, {
    alliance_id: allianceId
  });
};

export const usePickAllianceMutation = (onSuccess: () => void, onError?: () => void) =>
  useMutation(pickAlliance, {
    onSuccess,
    onError
  });
