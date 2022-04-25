import { useMutation } from 'react-query';
import http from 'src/services/http';

const pickAlliance = (allianceId: string, userId = '2789bb16-6e89-4d67-a841-3cd883fe140a') => {
  console.log('Pick alliance', allianceId);
  return http.post(`/v1/sigil/users/${userId}/alliance`, {
    alliance_id: allianceId
  });
};

export const useQuery = () => {
  const pickAllianceMutation = useMutation(pickAlliance);

  return {
    pickAllianceMutation
  };
};
