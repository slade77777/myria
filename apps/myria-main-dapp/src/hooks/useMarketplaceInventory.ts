import { useInfiniteQuery } from 'react-query';
import { assetModule } from '../services/myriaCore';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;
export default function useMarketplaceInventory(starkKey: string) {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery(
    ['marketplaceInventory', starkKey],
    ({ pageParam = DEFAULT_PAGE }) =>
      assetModule?.getAssetByStarkKey(starkKey, pageParam, DEFAULT_LIMIT),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.data) return;
        const { currentPage, totalPages } = lastPage.data.meta;
        if (currentPage < totalPages) {
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
