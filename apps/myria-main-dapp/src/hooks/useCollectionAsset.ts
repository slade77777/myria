import { useInfiniteQuery } from 'react-query';
import { assetModule } from 'src/services/myriaCore';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;
export default function useCollectionAsset({ collectionId }: { collectionId: number }) {
  const queryKey = ['collection', collectionId, 'assets'];
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = DEFAULT_PAGE }) =>
      assetModule?.getAssetByCollectionId({
        collectionId: collectionId,
        limit: DEFAULT_LIMIT,
        page: pageParam
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
    hasNextPage,
    isFetchingNextPage,
    result
  };
}
