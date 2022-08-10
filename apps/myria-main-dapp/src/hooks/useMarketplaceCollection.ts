import { useQuery } from 'react-query';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';
import { collectionModule } from '../services/myriaCore';

export default function useMarketplaceCollection(publicId: string) {
  const queryKey = ['marketplace', 'collection', publicId];
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => collectionModule?.getCollectionByPublicId(publicId),
    {
      enabled: !!publicId
    }
  );

  return {
    // @ts-ignore
    collection: (data?.data as AssetByCollectionIdResponse) || {},
    isLoading,
    error
  };
}
