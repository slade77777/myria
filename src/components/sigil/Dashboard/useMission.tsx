import { useMutation, useQuery } from 'react-query';
import apiClient from 'src/client';
import { Mission } from 'src/types/sigil';

export const TwitterShareDefaultMessage = `Join a Myria alliance and claim your free NFT!`;
export const TwitterShareDefaultHashtags = 'myria,myriagames';
export const TwitterShareLink =  `https://google.com`;

const complete = (missionId: string) => {
  return apiClient.post(`/sigil/users/missions/done`, { missionId });
};

export const useMission = () => {
  const { isLoading, mutate: completeMission } = useMutation(complete, {
    onSuccess: (res) => {}, // TODO
    onError: (err) => {} // TODO
  });

  const { data: missions } = useQuery<Mission[]>('sigilMissions', async () => {
    const res = await apiClient.get<{
      data: {
        [k: string]: Mission;
      };
    }>('sigil/users/missions');

    return Object.keys(res.data.data).map((k) => res.data.data[k]);
  });


  return {
    completeMission,
    isLoading,
    missions
  };
};
