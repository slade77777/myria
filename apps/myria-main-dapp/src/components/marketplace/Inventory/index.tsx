import { format } from 'date-fns';
import React from 'react';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import AssetList from '../AssetList';
import { Loading } from '../../Loading';
import truncateString from 'src/helper';
import { Trans } from '@lingui/macro';

interface Props {
  userAvatar: string;
  userName: string;
  userAddress: string | undefined;
  userJoinDate?: Date;
  items: NFTItemType[];
  assetLoading?: boolean;
}

function Inventory({
  items,
  userAddress,
  userAvatar,
  userJoinDate,
  userName,
  assetLoading
}: Props) {
  const itemForSaleCount = React.useMemo(
    () => items.filter((item) => !!item.priceETH).length,
    [items]
  );

  return (
    <div className="bg-base/2 h-full w-full py-[58px] px-6 pt-[104px] text-white md:px-12 md:pt-[133px] xl:px-16">
      <div className="w-full ">
        <div className="max-w-content mx-auto h-full">
          <div className="mb-[58px] flex items-end justify-between">
            <div className="flex">
              <div className="mr-[40px] w-[120px] overflow-hidden rounded-full">
                <img width="100%" src={'/images/marketplace/collection-1-logo.png'} alt="" />
              </div>
              <div className="flex flex-col">
                <span className="text-[40px] font-bold text-white">{userName}</span>
                {userAddress && (
                  <span className="text-[16px] font-medium text-[#9AC9E3]">
                    {truncateString(userAddress)}
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
          <div className="">
            {assetLoading ? (
              <div className="flex w-full items-center justify-center">
                <Loading loadingSize={16} className="px-2" />
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-[24px] font-bold text-white">
                    <Trans>My Items</Trans>
                  </span>
                </div>
                {items && items?.length > 0 && <AssetList items={items} />}
              </>
            )}
          </div>
        </div>
      </div>
      {!assetLoading && items?.length === 0 && (
        <div className="flex h-3/4 items-center justify-center text-center px-[400px] max-w-content mx-auto">
          <p>
            <Trans>
              You don’t have any items yet. Visit the&nbsp;
              <span className="text-primary/6 cursor-pointer ">
                <Trans> Myria Marketplace </Trans>
              </span>
              &nbsp;to browse and purchase items.
            </Trans>
          </p>
        </div>
      )}
    </div>
  );
}

export default Inventory;
