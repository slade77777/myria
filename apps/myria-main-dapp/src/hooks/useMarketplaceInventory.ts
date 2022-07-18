import { useQuery } from 'react-query';
import { assetModule } from '../services/myriaCore';

export default function useMarketplaceInventory(starkKey: string) {
  const { data, isLoading, error } = useQuery(
    ['marketplaceInventory', starkKey],
    () => assetModule?.getAssetByStarkKey(starkKey),
    {
      enabled: !!starkKey
    }
  );

  return {
    // @ts-ignore
    rawData: data?.data?.items || {},
    isLoading,
    error
  };
}
