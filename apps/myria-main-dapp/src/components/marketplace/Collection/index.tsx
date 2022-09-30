import { AssetOrderBy } from 'myria-core-sdk';
import { AssetByCollectionIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import ReadMoreText from 'src/components/ReadMoreText';
import Page from 'src/components/Page';
import useCollectionAsset from 'src/hooks/useCollectionAsset';
import { getItemsPagination } from 'src/utils';
import avatar from '../../../../public/images/marketplace/avatar.png';
import AssetList from '../AssetList';
import SelectOrderBy from 'src/components/select/SelectOrderBy';

import TailSpin from 'src/components/icons/TailSpin';

import FilterAsset, { ActiveFilter } from './FilterAsset';
import FilterIcon from 'src/components/icons/FilterIcon';
import useAttributeCollection from 'src/hooks/useAttributeCollection';
import { useFilterSortContext } from 'src/context/filter-sort-context';

interface Props {
  collection: AssetByCollectionIdResponse;
}

export const dataSorting = [
  { id: 1, sortingField: 'createdAt', orderBy: AssetOrderBy.DESC, name: 'Recently listed' },
  { id: 2, sortingField: 'amountBuy', orderBy: AssetOrderBy.ASC, name: 'Price Low to High' },
  { id: 3, sortingField: 'amountBuy', orderBy: AssetOrderBy.DESC, name: 'Price High to Low' }
];

const Collection: FC<Props> = ({ collection }) => {
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

  const [filterSummary, setFilterSummary] = useState<{ id: string; value: string }[]>([]);

  const { data: filterList, isLoading } = useAttributeCollection(id);

  const initialFilter = () => {
    const obj = filterList.reduce((a, v) => ({ ...a, [v.id]: [] }), {});
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

  const handleSelected = async (e: any) => {
    if (e) {
      handleUpdateSort(e);
    }
  };

  const image_url = collectionImageUrl
    ? collectionImageUrl
    : '/images/marketplace/collection-banner.png';

  return (
    <Page includeFooter={false}>
      <div className="pt-[104px] md:pt-[93px]">
        <div
          className="relative h-[327px] w-full overflow-hidden bg-center bg-cover"
          style={{ backgroundImage: `url('${image_url}')` }}
        />
        <div className="max-w-content mx-auto mb-10">
          <div className="relative">
            <div className="border-base/2 absolute -bottom-16 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] bg-[#0F2F45] overflow-hidden">
              {iconUrl ? <img src={iconUrl} alt="" /> : <MyriaIcon />}
            </div>
          </div>
          <div className="pt-24">
            <div className="flex justify-between">
              <div className="w-2/3">
                <p className="text-4xl font-bold text-white">{name}</p>
                <p className="mt-2 text-[#97AAB5]">
                  Created By <span className="font-bold text-white">{project?.name}</span>
                </p>
                <div className="mt-6">
                  {description && <ReadMoreText text={description || ''} />}
                </div>
              </div>
              <div className="flex flex-row gap-12">
                <div>
                  <p className="text-right text-[28px] font-bold text-white">{totalAssets}</p>
                  <p className="mt-2 text-right text-[#97AAB5]">Items</p>
                </div>
                <div>
                  <p className="text-right text-[28px] font-bold text-white">
                    {totalAssetsForSale}
                  </p>
                  <p className="mt-2 text-right text-[#97AAB5]">For Sale</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white">Filter</span>
                  <span
                    className="ml-6 cursor-pointer"
                    onClick={() => setDisplayFilter(!displayFilter)}>
                    <FilterIcon />
                  </span>
                </div>
                <div className="w-1/5 ">
                  <SelectOrderBy
                    data={dataSorting}
                    selectedDefault={sorting}
                    changeHandler={handleSelected}
                  />
                </div>
              </div>
              <div className={displayFilter ? 'flex' : ''}>
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
                        {filterSummary.map((item: { id: string; value: string }, index: number) => {
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
                        })}
                        {filterSummary.length !== 0 && (
                          <span
                            className="text-light cursor-pointer text-base"
                            onClick={() => initialFilter()}>
                            Clear Filter
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
