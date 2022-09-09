import { CollectionDetailsParams } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { useInfiniteQuery } from 'react-query';
import { assetModule } from 'src/services/myriaCore';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;
export default function useCollectionAsset(data: CollectionDetailsParams) {
  const queryKey = ['collection', data.collectionId, 'assets'];
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    refetch,
    ...result
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = DEFAULT_PAGE }) =>
      assetModule?.getAssetsByCollectionId({
        limit: DEFAULT_LIMIT,
        page: pageParam,
        ...data
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
    result,
    refetch
  };
}
