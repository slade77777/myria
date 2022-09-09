import { noCacheApiClient } from 'src/client';
import { useQuery } from 'react-query';

export type Purchase = {
  txHash: string;
  purchaseStatus: string;
  nodes: Array<{ nodeId: string }>;
  created_on: number;
  userId: string;
  userWalletId: string;
};

export default function useUserNodes() {
  const queryKey = 'nodePurchase';
  const { data, isLoading, error, refetch } = useQuery(
    'userNodes',
    () => noCacheApiClient.get('/nodes/purchase/list'),
    {
      refetchOnWindowFocus: true,
      retry: 1
    }
  );

  return {
    data: (data?.data?.data as Purchase[]) || [],
    isLoading,
    // @ts-ignore
    error: error?.response as any,
    refetch
  };
}
