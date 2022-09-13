import { AssetOrderBy } from 'myria-core-sdk';
import { AssetByCollectionIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { FC, memo, useEffect, useState } from 'react';
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

interface Props {
  collection: AssetByCollectionIdResponse;
}

export const dataSorting = [
  { id: 1, sortingField: 'createdAt', val: AssetOrderBy.DESC, name: 'Recently listed' },
  { id: 2, sortingField: 'amountBuy', val: AssetOrderBy.ASC, name: 'Price Low to High' },
  { id: 3, sortingField: 'amountBuy', val: AssetOrderBy.DESC, name: 'Price High to Low' }
];

const Collection: FC<Props> = ({ collection }) => {
  const [selectedSort, setSelectedSort] = useState({
    sortingField: 'createdAt',
    orderBy: undefined
  });

  const { collectionImageUrl, name, project, description, totalAssets, totalAssetsForSale, id } =
    collection;
  const { fetchNextPage, refetch, hasNextPage, isFetchingNextPage, result, isFetching } =
    useCollectionAsset({
      collectionId: id,
      sortingField: selectedSort.sortingField,
      orderBy: selectedSort.orderBy
    });
  const items = getItemsPagination(result?.data?.pages || []); // using this "items" to render

  const handleSelected = async (e: any) => {
    if (e.val === AssetOrderBy.ASC || e.val === AssetOrderBy.DESC) {
      setSelectedSort({
        sortingField: e.sortingField,
        orderBy: e.val
      });
    } else {
      setSelectedSort({
        ...selectedSort,
        sortingField: e.sortingField
      });
    }
  };

  return (
    <Page includeFooter={false}>
      <div className="pt-[104px] md:pt-[93px]">
        <div className="relative h-[327px] w-full overflow-hidden">
          <img
            src={
              collectionImageUrl ? collectionImageUrl : '/images/marketplace/collection-banner.png'
            }
            alt=""
            className="absolute -top-36 w-full"
          />
        </div>
        <div className="max-w-content mx-auto mb-10">
          <div className="relative">
            {/* <img src={collectionImageUrl ? collectionImageUrl : "/images/marketplace/header.png"} className="h-[327px] w-full " alt={name} /> */}
            <div className="border-base/2 absolute -bottom-16 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] bg-[#0F2F45]">
              <MyriaIcon />
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
                  <ReadMoreText text={description || ''} />
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
            <div className="flex items-center justify-between">
              <div></div>
              <div className="w-1/5 ">
                <SelectOrderBy
                  data={dataSorting}
                  selectedDefault={'Recently listed'}
                  changeHandler={handleSelected}
                />
              </div>
            </div>
            <div className="mt-10">
              {isFetching && !isFetchingNextPage ? (
                <div className="flex items-center justify-center w-full mt-6" key={0}>
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
                    <div className="flex items-center justify-center w-full mt-6" key={0}>
                      <TailSpin />
                    </div>
                  }>
                  <AssetList
                    items={items?.map((elm: any, index: number) => {
                      const isOrder = Array.isArray(elm?.order);
                      const item: NFTItemType = {
                        id: `${elm.id}`,
                        rarity: (elm.metadata as any).rarity,
                        name: elm.name || '',
                        image_url: elm.imageUrl || '',
                        creator: elm.creator?.name || '',
                        creatorImg: avatar.src,
                        priceETH: isOrder
                          ? Number(elm?.order[0]?.nonQuantizedAmountBuy)
                          : elm?.order?.nonQuantizedAmountBuy
                      };
                      return item;
                    })}
                  />
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default memo(Collection);
