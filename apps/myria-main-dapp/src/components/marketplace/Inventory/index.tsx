import { format } from 'date-fns';
import React from 'react';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import AssetList from '../AssetList';
import { Loading } from '../../Loading';
import truncateString from 'src/helper';
import { Trans } from '@lingui/macro';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroller';
import TailSpin from 'src/components/icons/TailSpin';
import { useAuthenticationContext } from '../../../context/authentication';

interface Props {
  userAvatar: string;
  userName: string;
  userAddress: string | undefined;
  userJoinDate?: Date;
  items: NFTItemType[];
  assetLoading?: boolean;
  hasMore?: boolean;
  fetchNextPage: () => void;
  totalItems: number;
  totalForSaleItems: number;
}

function Inventory({
  items,
  userAddress,
  userAvatar,
  userJoinDate,
  userName,
  assetLoading,
  hasMore = false,
  fetchNextPage,
  totalItems,
  totalForSaleItems
}: Props) {
  const itemForSaleCount = React.useMemo(
    () => items.filter((item) => !!item.priceETH).length,
    [items]
  );
  const { account } = useAuthenticationContext();

  return (
    <div className="bg-base/2 h-full w-full py-[58px] px-6 pt-[104px] text-white md:px-12 md:pt-[133px] xl:px-16">
      <div className="w-full ">
        <div className="max-w-content mx-auto h-full">
          <div className="mb-[58px] md:flex items-end justify-between">
            <div className="flex">
              <img
                className="rounded-full object-cover w-32 h-32 mr-8"
                src={account?.image_url || '/images/marketplace/user.png'}
                alt=""
              />
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
                <span className="text-[28px] font-bold text-white">{totalItems}</span>
                <span className="text-[16px] font-normal text-[#97AAB5]">Items</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[28px] font-bold text-white">{totalForSaleItems}</span>
                <span className="text-[16px] font-normal text-[#97AAB5]">For Sale</span>
              </div>
            </div>
          </div>
          <>
            <div className="flex justify-between">
              <span className="text-[24px] font-bold text-white">
                <Trans>My Items</Trans>
              </span>
            </div>
            <InfiniteScroll
              pageStart={1}
              loadMore={async () => {
                setTimeout(() => {
                  fetchNextPage();
                }, 500);
              }}
              hasMore={hasMore}
              loader={
                <div className="flex items-center justify-center w-full mt-6" key={0}>
                  <TailSpin />
                </div>
              }
              // useWindow={false}
            >
              <AssetList items={items} />
            </InfiniteScroll>
          </>
        </div>
      </div>
      {assetLoading && items?.length === 0 && (
        <div className="max-w-content mx-auto mt-20 flex items-center justify-center px-[400px] text-center">
          <p>
            <Trans>You don???t have any items yet. Visit the </Trans>&nbsp;
            <Link href="/marketplace">
              <a className="text-primary/6 cursor-pointer">
                <Trans>Myria Marketplace </Trans>&nbsp;
              </a>
            </Link>
            <Trans>to browse and purchase items.</Trans>
          </p>
        </div>
      )}
    </div>
  );
}

export default Inventory;
