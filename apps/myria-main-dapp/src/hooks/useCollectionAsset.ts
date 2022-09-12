import { CollectionDetailsParams } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { useInfiniteQuery } from 'react-query';
import { assetModule } from 'src/services/myriaCore';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;
export default function useCollectionAsset(data: CollectionDetailsParams) {
  const queryKey = ['collection', data.collectionId, data.orderBy, data.sortingField, 'assets'];
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isFetching,
    refetch,
    ...result
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = DEFAULT_PAGE }) =>
      assetModule?.getAssetsByCollectionId({
        collectionId: data.collectionId,
        limit: DEFAULT_LIMIT,
        page: pageParam,
        orderBy: data.orderBy,
        sortingField: data.sortingField
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage) return;
        const { currentPage, totalPages } = lastPage?.data.meta;
        if (currentPage <= totalPages) {
          return pages.length + 1;
        }
        return undefined;
      }
    }
  );

  return {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    result,
    refetch
  };
}
