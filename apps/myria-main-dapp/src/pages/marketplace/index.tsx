import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { AssetOrderBy, OrderStatus, OrderType } from 'myria-core-sdk';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';
import React from 'react';
import { useQuery } from 'react-query';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import AssetList from 'src/components/marketplace/AssetList';
import HotCollection from 'src/components/marketplace/HotCollection';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import { assetModule, collectionModule } from 'src/services/myriaCore';
import { formatPrice, negativeMarginXSm, paddingX } from 'src/utils';
import avatar from '../../../public/images/marketplace/avatar.png';
const payload = {
  limit: 10,
  page: 1,
  isHot: true
};
const Marketplace: React.FC = () => {
  const { data: dataOrder } = useQuery(['homepage', 'listorder'], async () => {
    const data = await assetModule?.getNftAssetsByStatus({
      limit: 100,
      orderType: OrderType.SELL,
      page: 1,
      status: OrderStatus.ACTIVE,
      sortingField: 'amountBuy',
      orderBy: AssetOrderBy.ASC
    });
    if (data && data.status == 'success') {
      return data?.data.items;
    }
    return [];
  });
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
          <section className="mb-20 mt-[64px]">
            <AssetList
              title="Explore"
              items={dataOrder?.map((elm, index) => {
                const item: NFTItemType = {
                  id: `${elm.id}`,
                  rarity: (elm.metadata as any).rarity,
                  name: elm.name || '',
                  image_url: elm.imageUrl || '',
                  // @ts-ignore need update sdk AssetByCollectionType
                  creator: elm.creator?.name || '',
                  creatorImg: avatar.src,
                  priceETH: formatPrice(parseFloat(elm?.order[0].nonQuantizedAmountBuy)) // +elm... to convert string to number
                };
                return item;
              })}
            />
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Marketplace;
