import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { OrderStatus, OrderType } from 'myria-core-sdk';
import Link from 'next/link';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import Slider, { Settings } from 'react-slick';
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

  if (data && data.data.status === STATUS_PAGE.AVAILABLE) {
    const settings: Settings = {
      arrows: false,
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: 'carousel-dots bottom-4 md:bottom-6',
      autoplay: true,
      autoplaySpeed: 30000,
      pauseOnHover: true
    };

    return (
      <Page includeFooter={false}>
        <div className={headerNavSpacingClassName}>
          <Slider {...settings}>
            <div>
              <div className="flex min-h-[615px] flex-col justify-end md:justify-center bg-[url('/images/nodes/airdrop/background_airdrop.png')] bg-cover px-8 pb-[65px] md:min-h-[calc(100vw/2.38)] md:rounded-xl md:bg-[url('/images/nodes/airdrop/background_airdrop.png')] md:pb-[91px] md:pl-[107px]">
                <div className="text-center md:max-w-[654px] md:text-left">
                  <p className="text-lg md:text-xl font-black leading-[1.15] text-[#93F6FF]">
                    <Trans>NFT DROP</Trans>
                  </p>
                  <p className="mt-5 text-[34px] font-extrabold leading-[1.15] md:mt-4 md:text-[60px]">
                    <Trans>The Sigil Key quest is now on.</Trans>
                  </p>
                  <Link href={'/airdrop'}>
                    <a
                      className="text-base btn-sm btn-primary mt-6 md:mt-6 md:py-[15px] cursor-pointer"
                      href={'/airdrop'}>
                      <Trans>HUNT NOW</Trans>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="flex min-h-[615px] flex-col justify-end md:justify-center bg-[url('/images/nodes/airdrop/background_airdrop.png')] bg-cover px-8 pb-[65px] md:min-h-[calc(100vw/2.38)] md:rounded-xl md:bg-[url('/images/nodes/airdrop/background_airdrop.png')] md:pb-[91px] md:pl-[107px]">
                <div className="text-center md:max-w-[654px] md:text-left">
                  <p className="text-lg md:text-xl font-black leading-[1.15] text-[#93F6FF]">
                    <Trans>NFT DROP</Trans>
                  </p>
                  <p className="mt-5 text-[34px] font-extrabold leading-[1.15] md:mt-4 md:text-[60px]">
                    <Trans>The Sigil Key quest is now on.</Trans>
                  </p>
                  <Link href={'/airdrop'}>
                    <a
                      className="text-base btn-sm btn-primary mt-6 md:mt-6 md:py-[15px] cursor-pointer"
                      href={'/airdrop'}>
                      <Trans>HUNT NOW</Trans>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        <div className={clsx(isMobile ? '' : paddingX, headerNavSpacingClassName)}>
          <div className="md:max-w-content md:mx-auto md:mt-10">
            <section className={clsx(isMobile ? '' : negativeMarginXSm, 'md:mx-0')}>
              <h2 className="h5 md:h4 mb-10 px-6 md:px-0">
                <Trans>Marketplace</Trans>
              </h2>
              <div className="md:block hidden">
                <HotCollection />
              </div>
              <div className="md:hidden">
                <HotCollectionMobile />
              </div>
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
  }

  return <div className="bg-base/3 h-screen w-screen"></div>;
};

export default Marketplace;
