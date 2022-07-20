import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import AssetList from 'src/components/marketplace/AssetList';
import HotCollection from 'src/components/marketplace/HotCollection';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import { useQuery } from 'react-query';
import { collectionModule } from 'src/services/myriaCore';
import { negativeMarginXSm, paddingX } from 'src/utils';
import testavatarImg from './inventory/testavatar.png';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';
import truncateString from 'src/helper';
const payload = {
  limit: 10,
  page: 1,
  isHot: true
};
const Marketplace: React.FC = () => {
  const { data: fetchHotCollection } = useQuery(['marketplace', 'hotCollection'], () =>
    collectionModule?.getCollectionList(payload)
  );
  const hotCollection: CollectionItems[] | undefined = fetchHotCollection?.data.items;

  const { data: dataOrder } = useQuery(
    ['homepage', 'listorder'],
    async () => {
      console.log('!hotCollection || !collectionModule', hotCollection, collectionModule);

      if (!hotCollection || !collectionModule) return;
      const firstList = await collectionModule.getAssetByCollectionId({
        collectionId: hotCollection[0].id,
        assetType: 'FOR_SALE'
      });
      const secondList = await collectionModule.getAssetByCollectionId({
        collectionId: hotCollection[1].id,
        assetType: 'FOR_SALE'
      });
      const listOrder = [];
      firstList?.data.items && listOrder.push(...firstList?.data.items);
      secondList?.data.items && listOrder.push(...secondList?.data.items);
      return listOrder;
    },
    { enabled: !!hotCollection }
  );
  return (
    <Page>
      <div className={clsx(paddingX, headerNavSpacingClassName)}>
        <div className="max-w-content mx-auto mt-10">
          <section className={clsx(negativeMarginXSm, 'md:mx-0')}>
            <h2 className="h4 mb-10 px-6 md:px-0">
              <Trans>Marketplace</Trans>
            </h2>
            <HotCollection />
          </section>
          <section className="mb-20 mt-[64px]">
            {dataOrder && (
              <AssetList
                title="Explore"
                items={dataOrder.map((elm, index) => {
                  const item: NFTItemType = {
                    id: `${elm.id}`,
                    rarity: 'rare',
                    name: elm.name || '',
                    image_url: elm.imageUrl || '',
                    creator: truncateString(elm.owner),
                    creatorImg: testavatarImg.src,
                    priceETH: +elm.order.amountBuy // +elm... to convert string to number
                  };
                  return item;
                })}
              />
            )}
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Marketplace;
