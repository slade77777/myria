import React, { FC, memo } from 'react';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import ReadMoreText from 'src/components/ReadMoreText';
import Page from 'src/components/Page';
import AssetList from '../AssetList';
import avatar from '../../../../public/images/marketplace/avatar.png';
import { AssetByCollectionIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
interface Props {
  collection: AssetByCollectionIdResponse;
  assetItems: any;
}

const Collection: FC<Props> = ({ collection, assetItems }) => {
  // @ts-ignore
  const { collectionImageUrl, name, project, description, totalAssets, totalAssetsForSale } =
    collection;
  return (
    <Page includeFooter={false}>
      <img
        src={collectionImageUrl ? collectionImageUrl : '/images/marketplace/header.png'}
        className="h-[327px] w-full "
        alt={name}
      />
      <div className="max-w-content mx-auto mb-10">
        <div className="relative">
          {/* <img src={collectionImageUrl ? collectionImageUrl : "/images/marketplace/header.png"} className="h-[327px] w-full " alt={name} /> */}
          <div className="absolute -bottom-16 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#0F2F45] border-[4px] border-base/2">
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
                  <p className="text-[28px] font-bold text-white text-right">{totalAssets}</p>
                ) : (
                  <p className="text-[28px] font-bold text-white text-right">
                    {totalAssets ? `${totalAssets / 1000}K` : '0'}
                  </p>
                )}
                <p className="mt-2 text-[#97AAB5]">Items</p>
              </div>
              <div>
                {totalAssetsForSale < 1000 ? (
                  <p className="text-[28px] font-bold text-white text-right">
                    {totalAssetsForSale}
                  </p>
                ) : (
                  <p className="text-[28px] font-bold text-white text-right">
                    {totalAssetsForSale ? `${totalAssetsForSale / 1000}K` : '0'}
                  </p>
                )}
                <p className="mt-2 text-[#97AAB5]">For Sale</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <AssetList
              title={'Items'}
              items={assetItems?.items?.map((elm: any, index: number) => {
                const isOrder = Array.isArray(elm?.order);
                const item: NFTItemType = {
                  id: `${elm.id}`,
                  rarity: 'rare',
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
          </div>
        </div>
      </div>
    </Page>
  );
};

export default memo(Collection);
