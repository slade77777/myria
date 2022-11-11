import { useMutation, useQuery } from 'react-query';
import { accountApiClient, noCacheApiClient } from '../client';

export type NodePurchase = {
  alreadyPurchasedCount: number;
  canPurchaseCount: number;
  nodePriceInETH: string;
  destinationAddress: string;
};

export default function useNodePurchase() {
  const queryKey = 'nodePurchase';
  const { data, isLoading, error, refetch } = useQuery(
    queryKey,
    () => accountApiClient.get('/nodes/purchase'),
    {
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  return {
    data: data?.data?.data as NodePurchase,
    isLoading,
    // @ts-ignore
    error: error?.response as any,
    refetch
  };
}
