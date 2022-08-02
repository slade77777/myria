import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import AssetList from '../AssetList';
import { Loading } from '../../Loading';

interface Props {
  userAvatar: string;
  userName: string;
  userAddress: string | undefined;
  userJoinDate?: Date;
  items: NFTItemType[];
  refreshAssets: () => void;
  assetLoading?: boolean;
}

function Inventory({
  items,
  userAddress,
  userAvatar,
  userJoinDate,
  userName,
  refreshAssets,
  assetLoading
}: Props) {
  const itemForSaleCount = React.useMemo(
    () => items.filter((item) => !!item.priceETH).length,
    [items]
  );
  return (
    <div className="w-full bg-base/2 py-[58px] px-6 pt-[104px] text-white md:px-12 md:pt-[133px] xl:px-16">
      <div className="w-full">
        <div className="max-w-content mx-auto">
          <div className="mb-[58px] flex items-end justify-between">
            <div className="flex">
              <div className="mr-[40px] w-[120px] overflow-hidden rounded-full">
                <img width="100%" src={'/images/marketplace/collection-1-logo.png'} alt="" />
              </div>
              <div className="flex flex-col">
                <span className="text-[40px] font-bold text-white">{userName}</span>
                {userAddress && (
                  <span className="text-[16px] font-medium text-[#9AC9E3]">
                    {userAddress.substring(0, 7)}...{userAddress.substring(userAddress.length - 4)}
                  </span>
                )}
                {userJoinDate && (
                  <span className="text-[16px] font-normal text-[#97AAB5]">
                    Joined {format(userJoinDate, 'MMMM yyyy')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="mr-[64px] flex flex-col items-end">
                <span className="text-[28px] font-bold text-white">{items.length}</span>
                <span className="text-[16px] font-normal text-[#97AAB5]">Items</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[28px] font-bold text-white">{itemForSaleCount}</span>
                <span className="text-[16px] font-normal text-[#97AAB5]">For Sales</span>
              </div>
            </div>
          </div>
          <div>
            {assetLoading ? (
              <div className="w-full flex justify-center items-center">
                <Loading loadingSize={16} className="px-2" />
              </div>
            ) : (
              <AssetList refreshList={refreshAssets} title={'My items'} items={items} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
