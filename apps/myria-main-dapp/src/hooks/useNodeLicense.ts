import { accountApiClient } from 'src/client';
import { useQuery } from 'react-query';

export default function useNodeLicense() {
  const { data, isLoading, error, refetch } = useQuery(
    'nodesLicense',
    () => accountApiClient.get('/nodes/license'),
    {
      refetchOnWindowFocus: true,
      retry: 1
    }
  );

  return {
    data: (data?.data?.data as Array<{ nodeId: string }>) || [],
    isLoading,
    // @ts-ignore
    error: error?.response as any,
    refetch
  };
}
