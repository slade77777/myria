import { AssetOrderBy } from 'myria-core-sdk';
import { AssetByCollectionIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { FC, memo, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import FilterIcon from 'src/components/icons/FilterIcon';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import TailSpin from 'src/components/icons/TailSpin';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import ReadMoreText from 'src/components/ReadMoreText';
import SelectOrderBy from 'src/components/select/SelectOrderBy';
import { useFilterSortContext } from 'src/context/filter-sort-context';
import useAttributeCollection from 'src/hooks/useAttributeCollection';
import useCheckMobileView from 'src/hooks/useCheckMobileView';
import useCollectionAsset from 'src/hooks/useCollectionAsset';
import ChevronIcon from 'src/packages/l2-wallet/src/components/Icons/ChevronIcon';
import { getItemsPagination } from 'src/utils';
import avatar from '../../../../public/images/marketplace/avatar.png';
import AssetList from '../AssetList';
import BottomSheet from '../MobileView/BottomSheet';
import FilterAssetMobile from '../MobileView/FilterAssetMobile';
import SortMobile from '../MobileView/SortMobile';
import FilterAsset, { ActiveFilter } from './FilterAsset';
import { NonMyriaIcon } from 'src/components/icons/NonMyriaIcon';

interface Props {
  collection: AssetByCollectionIdResponse;
  collectionFetched: boolean;
}

export interface valueSort {
  id: number;
  sortingField: string;
  orderBy: AssetOrderBy;
  name: string;
}

export enum SortingFieldType {
  RECENT_SOLD = 'recent_sold',
  AMOUNT_BUY = 'amount_buy',
  MOST_VIEWED = 'most_viewed',
  CREATED_AT = 'created_at'
}

export const dataSorting: valueSort[] = [
  {
    id: 1,
    sortingField: SortingFieldType.CREATED_AT,
    orderBy: AssetOrderBy.DESC,
    name: 'Recently Listed'
  },
  {
    id: 2,
    sortingField: SortingFieldType.AMOUNT_BUY,
    orderBy: AssetOrderBy.ASC,
    name: 'Price Low to High'
  },
  {
    id: 3,
    sortingField: SortingFieldType.AMOUNT_BUY,
    orderBy: AssetOrderBy.DESC,
    name: 'Price High to Low'
  },
  {
    id: 4,
    sortingField: SortingFieldType.MOST_VIEWED,
    orderBy: AssetOrderBy.DESC,
    name: 'Most Viewed'
  },
  {
    id: 5,
    sortingField: SortingFieldType.RECENT_SOLD,
    orderBy: AssetOrderBy.DESC,
    name: 'Recently Sold'
  }
];

const Collection: FC<Props> = ({ collection, collectionFetched }) => {
  const { isMobile } = useCheckMobileView();
  const { sorting, handleUpdateSort } = useFilterSortContext();
  const [filter, setFilter] = useState<ActiveFilter>({});
  const {
    iconUrl,
    collectionImageUrl,
    name,
    project,
    description,
    totalAssets,
    totalAssetsForSale,
    id
  } = collection;
  const { fetchNextPage, refetch, hasNextPage, isFetchingNextPage, result, isFetching } =
    useCollectionAsset(
      {
        collectionId: id,
        sortingField: sorting.sortingField,
        orderBy: sorting.orderBy
      },
      filter
    );

  const { items, totalItem } = getItemsPagination(result?.data?.pages || []); // using this "items" to render
  const [displayFilter, setDisplayFilter] = useState<boolean>(false);
  const [isMyria, setIsMyria] = useState<boolean>(false);
  const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false);
  const [openSortMobile, setOpenSortMobile] = useState<boolean>(false);
  const [filterSummary, setFilterSummary] = useState<{ id: string; value: string }[]>([]);

  const { data: filterList, isLoading } = useAttributeCollection(id);

  const initialFilter = () => {
    const obj = filterList.reduce((a, v) => ({ ...a, [v?.id]: [] }), {});
    setFilter({ ...filter, ...obj });
  };

  useEffect(() => {
    initialFilter();
  }, [isLoading]);

  useEffect(() => {
    let listSummary: { id: string; value: string }[] = [];
    Object.entries(filter).forEach((item, index) => {
      const itemList = item[1].map((i) => {
        return { id: item[0], value: i };
      });
      listSummary = [...listSummary, ...itemList];
    });
    setFilterSummary(listSummary);
  }, [filter]);

  const handleFilter = (filterId: string, option: string) => {
    const checkFilterOption = filter[filterId]?.find((filter) => filter === option);
    let newFilterOption: string[] = [];
    if (checkFilterOption) {
      newFilterOption = filter[filterId]?.filter((v) => v !== option);
    } else {
      newFilterOption = [...filter[filterId], option];
    }
    setFilter({ ...(filter || {}), [filterId]: newFilterOption });
  };

  const handleSelected = async (e: valueSort) => {
    if (e) {
      handleUpdateSort(e);
    }
  };

  const image_url = collectionImageUrl
    ? collectionImageUrl
    : '/images/marketplace/collection-banner.png';

  useEffect(() => {
    if (project?.companyName && String(project.companyName).toLowerCase().includes('myria')) {
      setIsMyria(true);
    } else {
      setIsMyria(false);
    }
  }, [project]);

  return (
    <>
      <Page includeFooter={false}>
        <div className="pt-[104px] md:pt-[93px]">
          <div className="relative h-[172px] w-full overflow-hidden md:h-[327px]">
            <img
              src={
                collectionImageUrl
                  ? collectionImageUrl
                  : isMyria
                  ? '/images/marketplace/collection-banner.png'
                  : '/images/marketplace/default-background.svg'
              }
              alt=""
              className="absolute h-[327px] w-full object-cover"
            />
          </div>
          <div className="max-w-content mx-auto mb-10 px-6 md:px-0">
            <div className="relative">
              <div className="border-base/2 absolute -bottom-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[4px] bg-[#0F2F45] md:-bottom-16 md:h-[120px] md:w-[120px]">
                {iconUrl ? (
                  <img src={iconUrl} alt="" />
                ) : isMyria ? (
                  <MyriaIcon />
                ) : (
                  <NonMyriaIcon />
                )}
              </div>
            </div>
            <div className="pt-16 md:pt-24">
              <div className="justify-between md:flex">
                <div className="md:w-2/3">
                  <p className="break-all text-[28px] font-bold text-white md:text-4xl">{name}</p>
                  <p className="mt-2 text-[#97AAB5]">
                    Created By <span className="font-bold text-white">{project?.name}</span>
                  </p>
                  <div className="mt-6">
                    {description && <ReadMoreText text={description || ''} />}
                  </div>
                </div>
                <div className="mt-6 flex flex-row gap-12 md:mt-0">
                  <div>
                    <p className="text-left text-[28px] font-bold text-white md:text-right">
                      {totalAssets}
                    </p>
                    <p className="mt-2 text-left text-[#97AAB5] md:text-right">Items</p>
                  </div>
                  <div>
                    <p className="text-left text-[28px] font-bold text-white md:text-right">
                      {totalAssetsForSale}
                    </p>
                    <p className="mt-2 text-left text-[#97AAB5] md:text-right">For Sale</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* for mobile */}
                    <span className="block text-2xl font-bold text-white md:hidden">Items</span>
                    {/* for ipad and above */}
                    <span className="hidden text-2xl font-bold text-white md:block">Filter</span>
                    <button
                      className="ml-6 cursor-pointer rounded"
                      onClick={() =>
                        isMobile
                          ? setOpenFilterMobile(!openFilterMobile)
                          : setDisplayFilter(!displayFilter)
                      }>
                      <FilterIcon size={40} />
                    </button>
                    {filterSummary.length > 0 && (
                      <div
                        className="relative md:hidden"
                        onClick={() => setOpenFilterMobile(!openFilterMobile)}>
                        <span className="bg-primary/6 absolute -top-6 -right-2 rounded-xl py-1 px-2 text-xs text-white">
                          {filterSummary.length}
                        </span>
                      </div>
                    )}
                    <BottomSheet
                      open={openFilterMobile}
                      setOpen={setOpenFilterMobile}
                      snapPoints={[750, 0]}>
                      <div className="flex h-full flex-col">
                        {/* filter on Mobile */}
                        <FilterAssetMobile
                          filterList={filterList}
                          applyFilter={(filter: ActiveFilter) => setFilter(filter)}
                          activeFilter={filter}
                          initialFilter={initialFilter}
                          onCloseModal={() => setOpenFilterMobile(false)}
                        />
                      </div>
                    </BottomSheet>
                  </div>
                  <div className="flex max-w-[190px] items-center md:hidden">
                    <button
                      className="bg-base/4 border-base/4 relative w-full cursor-default rounded-lg border-[1px] py-3 pl-4 pr-10 text-left text-[#A1AFBA] shadow-md focus:outline-none sm:text-[14px]"
                      onClick={() => setOpenSortMobile(!openSortMobile)}>
                      <span className="block truncate">{sorting.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronIcon className="text-[#A1AFBA]" />
                      </span>
                    </button>
                    <BottomSheet
                      open={openSortMobile}
                      setOpen={setOpenSortMobile}
                      snapPoints={[280, 0]}>
                      <div className="flex h-full flex-col">
                        <SortMobile
                          data={dataSorting}
                          selectedDefault={sorting}
                          changeHandler={handleSelected}
                          onCloseModal={() => setOpenSortMobile(false)}
                        />
                      </div>
                    </BottomSheet>
                  </div>

                  {/* sort on PC, Ipad */}
                  <div className="hidden md:block md:w-1/5">
                    <SelectOrderBy
                      data={dataSorting}
                      selectedDefault={sorting}
                      changeHandler={handleSelected}
                    />
                  </div>
                </div>
                {filterSummary.length > 0 && (
                  <div className="text-light mt-6 text-base font-normal md:hidden">
                    <span>{totalItem} Items found</span>
                  </div>
                )}
                <div className={displayFilter ? 'flex' : ''}>
                  {/* filter on PC, Ipad */}
                  {displayFilter && (
                    <div className="mt-8 mr-6 w-1/4">
                      <FilterAsset
                        filterList={filterList}
                        activeFilter={filter}
                        handleFilter={handleFilter}
                        initialFilter={initialFilter}
                      />
                    </div>
                  )}

                  <div className={displayFilter ? 'w-3/4' : 'w-full'}>
                    {displayFilter && filterSummary.length > 0 && (
                      <>
                        <p className="text-light mt-8 text-base">{totalItem} Item found</p>
                        <div className="mt-4 flex flex-wrap items-center">
                          {filterSummary.map(
                            (item: { id: string; value: string }, index: number) => {
                              return (
                                <div
                                  className="bg-base/4 my-2 mr-4 flex items-center rounded px-4 py-[10px]"
                                  key={index}>
                                  <p className="mr-2 max-w-max text-sm font-medium">{item.value}</p>
                                  <div
                                    className="h-[14px] w-[14px] cursor-pointer font-medium"
                                    onClick={() => handleFilter(item.id, item.value)}>
                                    <CloseFilterIcon />
                                  </div>
                                </div>
                              );
                            }
                          )}
                          {filterSummary.length !== 0 && (
                            <span
                              className="text-light cursor-pointer text-base"
                              onClick={() => initialFilter()}>
                              {filterSummary.length === 1 ? (
                                <span>Clear Filter</span>
                              ) : (
                                <span>Clear Filters</span>
                              )}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {isFetching &&
                    !result?.data?.pages &&
                    !result?.data?.pages &&
                    !isFetchingNextPage ? (
                      <div className="mt-6 flex w-full items-center justify-center" key={0}>
                        <TailSpin />
                      </div>
                    ) : (
                      <InfiniteScroll
                        pageStart={1}
                        loadMore={async () => {
                          setTimeout(() => {
                            fetchNextPage();
                          }, 500);
                        }}
                        hasMore={!isFetchingNextPage && hasNextPage}
                        loader={
                          <div className="mt-6 flex w-full items-center justify-center" key={0}>
                            <TailSpin />
                          </div>
                        }
                        className="w-full">
                        <AssetList
                          items={items?.map((elm: any, index: number) => {
                            const isOrder = Array.isArray(elm?.order);
                            const item: NFTItemType = {
                              id: `${elm.id}`,
                              collection: elm.collection,
                              rarity: (elm.metadata as any).rarity,
                              name: elm.name || '',
                              image_url: elm.imageUrl || elm?.metadataOptional?.image || '',
                              creator: elm.creator?.name || '',
                              creatorImg: avatar.src,
                              priceETH: isOrder
                                ? Number(elm?.order[0]?.nonQuantizedAmountBuy)
                                : elm?.order?.nonQuantizedAmountBuy
                            };
                            return item;
                          })}
                          isFilter={displayFilter}
                        />
                      </InfiniteScroll>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

const CloseFilterIcon = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8891 3.11133L3.11133 10.8891M10.8891 10.8891L3.11133 3.11133"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Collection);
