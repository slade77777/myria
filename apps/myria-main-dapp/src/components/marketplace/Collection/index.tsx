import React, { FC, memo } from 'react';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import ReadMoreText from 'src/components/ReadMoreText';
import Page from 'src/components/Page';
import AssetList from '../AssetList';
import avatar from '../../../../public/images/marketplace/avatar.png';
import { AssetByCollectionIdResponse } from 'myria-core-sdk';
import useCollectionAsset from 'src/hooks/useCollectionAsset';
import InfiniteScroll from 'react-infinite-scroller';
import { getItemsPagination } from 'src/utils';

interface Props {
  collection: AssetByCollectionIdResponse;
}

const Collection: FC<Props> = ({ collection }) => {
  const { collectionImageUrl, name, project, description, totalAssets, totalAssetsForSale, id } =
    collection;
  const { fetchNextPage, hasNextPage, isFetchingNextPage, result } = useCollectionAsset({
    collectionId: id
  });
  const items = getItemsPagination(result?.data?.pages || []); // using this "items" to render

  return (
    <Page includeFooter={false}>
      <div className="pt-[104px] md:pt-[93px]">
        <div className="h-[327px] w-full relative overflow-hidden">
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
                  {totalAssets < 1000 ? (
                    <p className="text-right text-[28px] font-bold text-white">{totalAssets}</p>
                  ) : (
                    <p className="text-right text-[28px] font-bold text-white">
                      {totalAssets ? `${totalAssets / 1000}K` : '0'}
                    </p>
                  )}
                  <p className="mt-2 text-[#97AAB5]">Items</p>
                </div>
                <div>
                  {totalAssetsForSale < 1000 ? (
                    <p className="text-right text-[28px] font-bold text-white">
                      {totalAssetsForSale}
                    </p>
                  ) : (
                    <p className="text-right text-[28px] font-bold text-white">
                      {totalAssetsForSale ? `${totalAssetsForSale / 1000}K` : '0'}
                    </p>
                  )}
                  <p className="mt-2 text-[#97AAB5]">For Sale</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <InfiniteScroll
                pageStart={1}
                loadMore={() => fetchNextPage()}
                hasMore={!isFetchingNextPage && hasNextPage}
                loader={
                  <div className="loader text-white" key={0}>
                    Loading ...
                  </div>
                }
                // useWindow={false}
              >
                <AssetList
                  title={'Items'}
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
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default memo(Collection);
