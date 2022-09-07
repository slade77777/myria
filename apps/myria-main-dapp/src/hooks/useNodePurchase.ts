import { useMutation, useQuery } from 'react-query';
import apiClient from '../client';

export type NodePurchase = {
  price: string;
  remainNumberOfNodes: number;
};

export default function useNodePurchase() {
  const queryKey = 'nodePurchase';
  const { data, isLoading, error, refetch } = useQuery(
    queryKey,
    () => apiClient.get('/nodes/purchase'),
    {
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  const { mutateAsync } = useMutation((data) => apiClient.post('/nodes/purchase', data), {
    onSuccess: () => refetch()
  });
  return {
    data: data?.data as NodePurchase,
    isLoading,
    // @ts-ignore
    error: error?.response as any,
    mutateAsync
  };
}
