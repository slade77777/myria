import { useQuery } from 'react-query';
import { Collection } from '../types/marketplace';
import { collectionModule } from '../services/myriaCore';

export default function useMarketplaceCollection(id: number) {
  const queryKey = `marketplace/collection/${id}`;
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => collectionModule?.getCollectionById(id),
    {
      refetchOnWindowFocus: false
    }
  );

  return {
    // @ts-ignore
    collection: (data?.data as Collection) || {},
    isLoading,
    error
  };
}
