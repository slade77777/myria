import React, { FC, memo } from 'react';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import NftItem from 'src/components/marketplace/NftItem';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import ReadMoreText from 'src/components/ReadMoreText';
import Page from 'src/components/Page';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';
import AssetList from '../AssetList';
import truncateString from 'src/helper';
import testavatarImg from '../AssetDetails/testavatar.png';
import { formatNumber2digits } from 'src/utils';
import { AssetByCollectionIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
interface Props {
  collection: AssetByCollectionIdResponse;
  assetItems: any;
}

const Collection: FC<Props> = ({ collection, assetItems }) => {
  // @ts-ignore
  const {
    collectionImageUrl,
    name,
    project,
    description,
    totalAssets,
    totalAssetsForSale,
  } = collection;
  return (
    <Page>
      <img
        src={collectionImageUrl ? collectionImageUrl : '/images/marketplace/header.png'}
        className="h-[327px] w-full "
        alt={name}
      />
      <div className="max-w-content mx-auto mb-10">
        <div className="relative">
          {/* <img src={collectionImageUrl ? collectionImageUrl : "/images/marketplace/header.png"} className="h-[327px] w-full " alt={name} /> */}
          <div className="absolute left-[88px] -bottom-16 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#0F2F45]">
            <MyriaIcon />
          </div>
        </div>
        <div className="px-[88px] pt-24">
          <div className="flex justify-between">
            <div className="w-2/3">
              <p className="text-4xl text-white font-bold">{name}</p>
              <p className="mt-2 text-[#97AAB5]">
                Created By <span className="text-white font-bold">{project?.name}</span>
              </p>
              <ReadMoreText text={description || ''} />
            </div>
            <div className="flex flex-row gap-8">
              <div>
                {totalAssets < 1000 ? (
                  <p className="text-3xl text-white">{totalAssets}</p>
                ) : (
                  <p className="text-3xl text-white">
                    {totalAssets ? `${totalAssets / 1000}K` : '0'}
                  </p>
                )}
                <p className="mt-2 text-[#97AAB5]">Items</p>
              </div>
              <div>
                {totalAssetsForSale < 1000 ? (
                  <p className="text-3xl text-white">{totalAssetsForSale}</p>
                ) : (
                  <p className="text-3xl text-white">
                    {totalAssetsForSale ? `${totalAssetsForSale / 1000}K` : '0'}
                  </p>
                )}
                <p className="mt-2 text-[#97AAB5]">For Sale</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <AssetList
              title={'Items'}
              items={assetItems?.items?.map((elm: any, index: number) => {
                const isOrder = Array.isArray(elm?.order);
                const item: NFTItemType = {
                  id: `${elm.id}`,
                  rarity: 'rare',
                  name: elm.name || '',
                  image_url: elm.imageUrl || '',
                  creator: truncateString(elm.collection.ownerPublicKey),
                  creatorImg: testavatarImg.src,
                  priceETH: isOrder ? Number(elm?.order[0]?.amountBuy) : elm?.order?.amountBuy
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