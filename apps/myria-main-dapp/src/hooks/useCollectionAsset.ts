import { CollectionByIdDetailsParams, CollectionDetailsParams } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { useInfiniteQuery } from 'react-query';
import { assetModule } from 'src/services/myriaCore';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;
const metadata: string = "metadata";
export default function useCollectionAsset(
  data: CollectionByIdDetailsParams,
  filterData: { [key: string]: string[] }
) {
  const queryKey = [
    'collection',
    data.collectionId,
    filterData,
    data.orderBy,
    data.sortingField,
    'assets'
  ];
  const formatData = formatDataFilter(filterData);
  
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
      assetModule?.getAssetsWithFilter({
        limit: DEFAULT_LIMIT,
        page: pageParam,
        orderBy: data.orderBy,
        sortingField: data.sortingField,
        filterField: metadata,
        filterValue: formatData,
        ...data,
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
const formatDataFilter = (filterData: any) => {
  if (!filterData || Object.keys(filterData).length === 0) return {};
  const params: any = {};
  for (const keys in filterData) {
    if (filterData[keys].length === 0) continue;
      params[keys] = filterData[keys];
  }
  return params;
};
