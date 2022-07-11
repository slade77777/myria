import React, { FC, memo } from 'react';
import { MyriaIcon } from 'src/components/icons/MyriaIcon';
import NftItem from 'src/components/marketplace/NftItem';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import ReadMoreText from 'src/components/ReadMoreText';
import Page from 'src/components/Page';
import clsx from 'clsx';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';

interface Props {
  collection: CollectionItems;
  assetItems:NFTItemType[];
}

const Collection: FC<Props> = ({collection, assetItems}) => {
  // @ts-ignore
  const {collectionImageUrl, name, createdBy, description, totalAssets, totalAssetsForSale} = collection;
  return (
    <Page>
      <div className="mb-12 pt-24">
        <div className="relative">
          <img src={collectionImageUrl} className="h-[327px] w-full " alt={name} />
          <div className="absolute left-[88px] -bottom-16 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#0F2F45]">
            <MyriaIcon />
          </div>
        </div>
        <div className="px-[88px] pt-24">
          <div className="flex justify-between">
            <div className="w-2/3">
              <p className="text-4xl text-white">{name}</p>
              <p className="mt-2 text-[#97AAB5]">
                Created By <span className="text-white">{createdBy}</span>
              </p>
              <ReadMoreText text={description || ''} />
            </div>
            <div className="flex flex-row gap-8">
              <div>
                <p className="text-3xl text-white">{totalAssets ? `${totalAssets/1000}K` : '0'}</p>
                <p className="mt-2 text-[#97AAB5]">Items</p>
              </div>
              <div>
                <p className="text-3xl text-white">{totalAssetsForSale ? `${totalAssetsForSale/1000}K` : '0'}</p>
                <p className="mt-2 text-[#97AAB5]">For Sale</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-8 text-2xl text-white">Items</p>
            <div className="flex flex-wrap gap-6">
              {assetItems?.length
                ? assetItems.map((item) => (
                    <div key={item.id} className="w-[256px]">
                      <NftItem item={item} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default memo(Collection);
