import { useQuery } from 'react-query';
import apiClient from '../client';

export type PurchaseInfo = {
  price: string;
  remainNumberOfNodes: number;
};

export default function usePurchaseInfo() {
  const queryKey = 'purchaseInfo';
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => apiClient.get('/purchase/purchase-info'),
    {
      refetchOnWindowFocus: false
    }
  );

  return {
    data: data?.data || ({} as PurchaseInfo),
    isLoading,
    error
  };
}
