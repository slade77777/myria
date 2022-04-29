import { useMutation } from 'react-query';
import http from 'src/services/http';

const pickAlliance = (allianceId: string) => {
  console.log('Pick alliance', allianceId);
  return http.post(`/v1/sigil/users/alliance`, {
    alliance_id: allianceId
  });
};

export const useQuery = () => {
  const pickAllianceMutation = useMutation(pickAlliance);

  return {
    pickAllianceMutation
  };
};
