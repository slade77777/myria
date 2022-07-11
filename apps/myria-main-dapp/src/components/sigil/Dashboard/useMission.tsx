import { useMutation, useQuery } from 'react-query';
import apiClient from 'src/client';
import { Mission } from 'src/types/sigil';

export const TwitterShareDefaultMessage = `Join a Myria alliance and claim your free NFT!`;
export const TwitterShareDefaultHashtags = 'myria,myriagames';

const complete = (missionId: string) => {
  return apiClient.post(`/sigil/users/missions/done`, { mission_id: missionId });
};

export const useMission = () => {
  const { data: missions, refetch: fetchMissions } = useQuery<Mission[]>(
    'sigilMissions',
    async () => {
      const res = await apiClient.get<{
        data: {
          [k: string]: Mission;
        };
      }>('sigil/users/missions');

      return Object.keys(res.data.data).map((k) => res.data.data[k]);
    },
    {
      enabled: false
    }
  );

  const { mutate: completeMission } = useMutation(complete, {
    onSuccess: (res) => {
      fetchMissions();
    },
    onError: (err) => {}
  });

  return {
    completeMission,
    missions,
    fetchMissions
  };
};
