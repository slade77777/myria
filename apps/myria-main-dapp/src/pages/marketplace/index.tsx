import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { AssetOrderBy, OrderStatus, OrderType } from 'myria-core-sdk';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import TailSpin from 'src/components/icons/TailSpin';
import AssetList from 'src/components/marketplace/AssetList';
import { dataSorting } from 'src/components/marketplace/Collection';
import HotCollection from 'src/components/marketplace/HotCollection';
import MessageMobileView from 'src/components/marketplace/Modals/MessageMobileView';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import SelectOrderBy from 'src/components/select/SelectOrderBy';
import useCheckMobileView from 'src/hooks/useCheckMobileView';
import { assetModule } from 'src/services/myriaCore';
import { getItemsPagination, negativeMarginXSm, paddingX } from 'src/utils';
import avatar from '../../../public/images/marketplace/avatar.png';
const Marketplace: React.FC = () => {
  const { isMobile, isResolution, setIsSolution } = useCheckMobileView();
  const [selectedSort, setSelectedSort] = useState({
    sortingField: 'createdAt',
    orderBy: AssetOrderBy.ASC
  });

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
    ['homepage', 'listorder', selectedSort],
    ({ pageParam = 1 }) =>
      assetModule?.getNftAssetsByStatus({
        limit: 15,
        orderType: OrderType.SELL,
        page: pageParam,
        status: OrderStatus.ACTIVE,
        sortingField: selectedSort.sortingField,
        orderBy: selectedSort.orderBy
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
    if (e.val === AssetOrderBy.ASC || e.val === AssetOrderBy.DESC) {
      setSelectedSort({
        sortingField: e.sortingField,
        orderBy: e.val
      });
    } else {
      setSelectedSort({
        ...selectedSort,
        sortingField: e.sortingField
      });
    }
  };

  if (isMobile) {
    return <MessageMobileView isShow={isResolution} handleClose={() => setIsSolution(false)} />;
  }

  const items = getItemsPagination(result?.data?.pages || []); // using this "items" to render
  return (
    <Page includeFooter={false}>
      <div className={clsx(paddingX, headerNavSpacingClassName)}>
        <div className="max-w-content mx-auto mt-10">
          <section className={clsx(negativeMarginXSm, 'md:mx-0')}>
            <h2 className="h4 mb-10 px-6 md:px-0">
              <Trans>Marketplace</Trans>
            </h2>
            <HotCollection />
          </section>
          <div className="flex items-center justify-between">
            <div></div>
            <div className="w-1/5 pt-[52px]">
              <SelectOrderBy
                data={dataSorting}
                selectedDefault={'Recently listed'}
                changeHandler={handleSelected}
              />
            </div>
          </div>
          <section className="mb-20 mt-[6px]">
            <div className="overflow-y-hidden overflow-x-auto">
              {isFetching && !isFetchingNextPage ? (
                <div className="flex items-center justify-center w-full mt-6" key={0}>
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
                    <div className="flex items-center justify-center w-full mt-6" key={0}>
                      <TailSpin />
                    </div>
                  }>
                  <AssetList
                    // title={'Explore'}
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
              )}
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Marketplace;
