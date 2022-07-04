import { useQuery } from 'react-query';
import { assetModule } from '../services/myriaCore';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';

type DataTypes = {
  items: NFTItemType[];
};

export default function useCollectionAsset(id: string) {
  const queryKey = `collection/${id}/assets`;
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => assetModule?.getAssetByCollectionId(id),
    {
      refetchOnWindowFocus: false
    }
  );

  return {
    assets: (data?.data as DataTypes) || {},
    isLoading,
    error
  };
}
