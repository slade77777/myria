import { useMutation, useQuery } from 'react-query';
import http from 'src/client';
import { AllianceName } from 'src/types/sigil'

interface UsePickSigilQueryParams {
  onPickSigilSuccess?: () => void;
  onPickSigilError?: () => void;
}

type SigilProfileType = {
  alliance: AllianceName;
  credits: number;
  date_registered: Date;
  user_id: string;
}

const pickAlliance = (allianceId: string) => {
  return http.post(`sigil/users/alliance`, {
    alliance_id: allianceId
  });
};

export const getSigilProfile = () => http.get('sigil/users/profile').then(res => {
  const data = res.data?.data;
  if (data) {
    const profile: SigilProfileType = {
      user_id: data.user_id,
      credits: data.credits,
      alliance: data.alliance as AllianceName,
      date_registered: new Date(data.date_registered),
    };
    return profile;
  }

  return null;
});

export const pickSigilQueryKeys = {
  pickSigil_profile: 'pickSigil_profile'
};

export const usePickSigilQuery = (params?: UsePickSigilQueryParams) => {
  const sigilProfile = useQuery(pickSigilQueryKeys.pickSigil_profile, () => getSigilProfile());
  const pickSigilMutation = useMutation(pickAlliance, {
    onSuccess: params?.onPickSigilSuccess,
    onError: params?.onPickSigilError,
  });

  return {
    sigilProfile,
    pickSigilMutation,
  };
};
