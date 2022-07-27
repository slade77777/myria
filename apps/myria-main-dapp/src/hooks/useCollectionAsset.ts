import { useQuery } from 'react-query';
import { assetModule } from 'src/services/myriaCore';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';

type DataTypes = {
  items: NFTItemType[];
};

export default function useCollectionAsset(id: number) {
  const queryKey = ['collection', id, 'assets'];
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => assetModule?.getAssetByCollectionId({ collectionId: id, limit: 100 }),
    {
      enabled: !!id
    }
  );

  return {
    assets: data,
    isLoading,
    error
  };
}
