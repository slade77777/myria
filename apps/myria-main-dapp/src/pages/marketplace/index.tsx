import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import AssetList from 'src/components/marketplace/AssetList';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import Page from 'src/components/Page';
import { assetModule } from 'src/services/myriaCore';
import { negativeMarginXSm, paddingX } from 'src/utils';
import testImg from './inventory/test.png';
import testavatarImg from './inventory/testavatar.png';

const collections = [
  {
    id: 1,
    background: '/images/marketplace/collection-1-bg.png',
    logo: '/images/marketplace/collection-1-logo.png',
    title: 'Myriaverse',
    by: 'Myria Game Studio',
    description:
      'The first NFT Collection from Myria Game Studio that allows fan to participate in the metaverse of Myria gaming'
  },
  {
    id: 2,
    background: '/images/marketplace/collection-2-bg.png',
    logo: '/images/marketplace/collection-2-logo.png',
    title: 'Myria Sigil Collections',
    by: 'Myria Sigil Event',
    description:
      'The first NFT Collection from Myria Game Studio that allows fan to participate in the metaverse of Myria gaming'
  }
];
const Games: React.FC = () => {

  const { data, isLoading, error } = useQuery(
    'orderExplore',
    () => assetModule?.getAssets()
  );

  const dataOrderExplore: any = data?.data;
  
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
            <h2 className="h6">
              <Trans>Hot Collections 🔥</Trans>
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {collections.map((collection) => (
                <Link href={`/marketplace/collection/${collection.id}`} key={collection.title}>
                  <a
                    href={`/marketplace/collection/${collection.id}`}
                    className="rounded-lg bg-base/3 cursor-pointer">
                    <img
                      className="h-[248px] w-full object-cover"
                      src={collection.background}
                      alt=""
                    />
                    <div className="body-16-regular relative p-8 pt-[52px] text-center text-light">
                      <img
                        src={collection.logo}
                        className="absolute left-1/2 -top-1/2 h-[80px] w-[80px] translate-y-1/2 -translate-x-1/2 object-cover"
                      />
                      <h3 className="body-20-semibold font-bold text-white">{collection.title}</h3>
                      <p className="mt-2">
                        by <span className="body-16-medium text-blue/6">{collection.by}</span>
                      </p>
                      <p className="mt-4">{collection.description}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
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
