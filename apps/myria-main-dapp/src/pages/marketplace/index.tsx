import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import { useQuery } from 'react-query';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import AssetList from 'src/components/marketplace/AssetList';
import HotCollection from 'src/components/marketplace/HotCollection';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import { assetModule } from 'src/services/myriaCore';
import { negativeMarginXSm, paddingX } from 'src/utils';
import testImg from './inventory/test.png';
import testavatarImg from './inventory/testavatar.png';

const Games: React.FC = () => {

  const { data, isLoading, error } = useQuery(
    'orderExplore',
    () => assetModule?.getAssets()
  );

  return (
    <Page>
      <div className={clsx(paddingX, headerNavSpacingClassName)}>
        <div className="mx-auto mt-10 max-w-content">
          <section className={clsx(negativeMarginXSm, 'md:mx-0')}>
            <h2 className="h4 px-6 md:px-0">
              <Trans>Marketplace</Trans>
            </h2>
            <div className="relative isolate mt-10 flex min-h-[287px] overflow-hidden bg-[url('/images/marketplace/header.png')] bg-cover bg-center p-10 md:items-end md:rounded-lg md:bg-left">
              <div className="absolute inset-0 z-[-1] bg-black opacity-40 md:hidden" />
              <p className="text-center text-[40px] font-medium leading-[1.15] md:max-w-[390px] md:text-left">
                <Trans>Play and earn rewards and NFTs</Trans>
              </p>
            </div>
          </section>
          <section className="mt-[64px]">
            <HotCollection/>
          </section>
          <section className="mb-20 mt-[64px]">
            <AssetList title='Explore' items={
              Array(11)
              .fill(0)
              .map((_, index) => {
                const item: NFTItemType = {
                  id: index.toString(),
                  rarity: 'rare',
                  name: 'Common Alliance Chest',
                  image_url: testImg.src,
                  creator: 'Myria',
                  creatorImg: testavatarImg.src,
                  priceETH: Math.round(Math.random() * 5)
                };
                return item;
              })
            }/>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Games;
