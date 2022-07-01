import React, { FC, memo } from 'react';
import Image from 'next/image';
import backgroundImage from '../../../pages/marketplace/collection/collection_background.png';
import { MyriaIcon } from '../../icons/MyriaIcon';
import NftItem from '../NftItem';
import { NFTItemType } from '../NftItem/type';
import ReadMoreText from '../../ReadMoreText';

interface Props {
  collectionImageUrl?: string;
  name?: string;
  createdBy?: string;
  description: string;
  totalItems?: number;
  itemsForSale?: number;
  assetItems?: Array<NFTItemType>;
}

const Collection: FC<Props> = ({
  collectionImageUrl,
  name,
  createdBy,
  description,
  assetItems
}) => {
  return (
    <div className="w-full bg-[#050E15] pb-[58px]">
      <div className="relative">
        <Image
          src={collectionImageUrl || backgroundImage}
          layout="responsive"
          objectFit="initial"
        />
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
            <ReadMoreText text={description} />
          </div>
          <div className="flex flex-row gap-8">
            <div>
              <p className="text-3xl text-white">98.7K</p>
              <p className="mt-2 text-[#97AAB5]">Items</p>
            </div>
            <div>
              <p className="text-3xl text-white">85.1K</p>
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
  );
};

export default memo(Collection);
