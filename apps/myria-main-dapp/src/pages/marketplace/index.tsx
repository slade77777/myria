import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { OrderStatus, OrderType } from 'myria-core-sdk';
import Link from 'next/link';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { campaignApiClient } from 'src/client';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import TailSpin from 'src/components/icons/TailSpin';
import AssetList from 'src/components/marketplace/AssetList';
import { dataSorting } from 'src/components/marketplace/Collection';
import HotCollection from 'src/components/marketplace/HotCollection';
import MaintainPage from 'src/components/marketplace/MaintainPage/MaintainPage';
import HotCollectionMobile from 'src/components/marketplace/MobileView/HotCollectionMobile';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import SelectOrderBy from 'src/components/select/SelectOrderBy';
import { useFilterSortContext } from 'src/context/filter-sort-context';
import useCheckMobileView from 'src/hooks/useCheckMobileView';
import useCheckStatusMarketplacePage from 'src/hooks/useCheckStatusMarketplacePage';
import {
  getCampaignsDetailById,
  getUserCampaigns,
  missionComplete
} from 'src/services/campaignService';
import { assetModule } from 'src/services/myriaCore';
import { getItemsPagination, negativeMarginXSm, paddingX } from 'src/utils';
import avatar from '../../../public/images/marketplace/avatar.png';

export enum STATUS_PAGE {
  AVAILABLE = 'AVAILABLE'
}

const Marketplace: React.FC = () => {
  const { isLoading, error, data } = useCheckStatusMarketplacePage();
  const { isMobile } = useCheckMobileView();
  const { sorting, handleUpdateSort } = useFilterSortContext();

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    refetch,
    isFetching,
    isFetched,
    ...result
  } = useInfiniteQuery(
    ['homepage', 'listorder', sorting],
    ({ pageParam = 1 }) =>
      assetModule?.getNftAssetsByStatus({
        limit: 15,
        orderType: OrderType.SELL,
        page: pageParam,
        status: OrderStatus.ACTIVE,
        sortingField: sorting.sortingField,
        orderBy: sorting.orderBy
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage) return;
        const { currentPage, totalPages } = lastPage?.data.meta;
        if (currentPage <= totalPages) {
          return pages.length + 1;
        }
        return undefined;
      }
    }
  );

  const handleSelected = (e: any) => {
    if (e) {
      handleUpdateSort(e);
    }
  };
  const { items } = getItemsPagination(result?.data?.pages || []); // using this "items" to render

  if (data && data?.data.status !== STATUS_PAGE.AVAILABLE) return <MaintainPage />;

  if (data && data.data.status === STATUS_PAGE.AVAILABLE)
    return (
      <Page includeFooter={false}>
        <div className={clsx(isMobile ? '' : paddingX, headerNavSpacingClassName)}>
          <div className="md:max-w-content md:mx-auto md:mt-10">
            {/* Campaign Banner */}
            {/* <section className="mb-10">
              <div className="w-full bg-[#606060] rounded-xl h-[615px] flex items-end p-16">
                <div>
                  <p className="text-[40px] font-extrabold mb-10">Campaign Banner [TBC]</p>
                  <Link href={'/airdrop'}>
                    <button className="w-[174px] h-12 text-center bg-white rounded-lg text-black font-bold">
                      <span>Go</span>
                    </button>
                  </Link>
                </div>
              </div>
            </section> */}
            <section className={clsx(isMobile ? '' : negativeMarginXSm, 'md:mx-0')}>
              <h2 className="h5 md:h4 mb-10 px-6 md:px-0">
                <Trans>Marketplace</Trans>
              </h2>
              {isMobile ? <HotCollectionMobile /> : <HotCollection />}
            </section>
            <div className="hidden items-center justify-between md:flex">
              <div></div>
              <div className="w-1/5 pt-[52px]">
                <SelectOrderBy
                  data={dataSorting}
                  selectedDefault={sorting}
                  changeHandler={handleSelected}
                />
              </div>
            </div>
            <section className="mb-20 mt-16 px-6 md:mt-[6px] md:px-0">
              <div className="overflow-x-auto overflow-y-hidden">
                {isFetching && !result.data?.pages && !isFetchingNextPage ? (
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
                    }>
                    <AssetList
                      title="Explore"
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
                    />
                  </InfiniteScroll>
                )}
              </div>
            </section>
          </div>
        </div>
      </Page>
    );

  return <div className="bg-base/3 h-screen w-screen"></div>;
};

export default Marketplace;
