import { useQuery } from 'react-query';
import { assetModule } from 'src/services/myriaCore';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import { CollectionByIdParams } from 'myria-core-sdk/dist/types/src/types/AssetTypes';

type DataTypes = {
  items: NFTItemType[];
};

export default function useCollectionAsset(payload: CollectionByIdParams) {
  const queryKey = ['collection', payload.collectionId, 'assets'];
  const { data, isLoading, error, refetch } = useQuery(
    queryKey,
    () =>
      assetModule?.getAssetByCollectionId({
        collectionId: payload.collectionId,
        limit: payload.limit,
        page: payload.page
      }),
    {
      enabled: !!payload.collectionId
    }
  );

  return {
    assets: data,
    isLoading,
    error,
    refetch
  };
}
