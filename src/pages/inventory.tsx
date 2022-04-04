import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Badge from 'src/components/Badge';
import Filter, { FilterList } from 'src/components/Filter';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import CheckIcon from 'src/components/icons/CheckIcon';
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon';
import Overlay from 'src/components/overlay/Overlay';
import Page from 'src/components/Page';
import SortBy from 'src/components/SortBy';
import { negativeMarginXSm, paddingX } from 'src/utils';

const filters: FilterList = [
  {
    title: 'Game',
    options: [
      'MyriaVerse',
      'Metarush',
      'Metakart',
      'Block Royale',
      'Startstrike Legends',
      'Moonville Farms',
      'Hot Slice Tycoon'
    ]
  },
  {
    title: 'Status',
    options: ['On chain', 'Ready to mint', 'Awaiting mint', 'Off chain']
  },
  {
    title: 'Type',
    options: ['Chest', 'Sigil', 'Title']
  },
  {
    title: 'Rarity',
    options: ['Common', 'Rare', 'Ultra Rare', 'Epic', 'Legendary', 'Cosmic', 'Celestial']
  }
];

type Filter = typeof filters;

type FilterKey = Filter[number]['title'];
type Inventory = {
  id: string;
  image: string;
  name: string;
  type: string;
  qty: string;
  maxSupply: string;
  isClaimed: boolean;
};

export const inventories: Inventory[] = Array(9)
  .fill(0)
  .map((_, index) => ({
    id: String(index),
    image: '/images/our-games/metarush_op.png',
    name: 'Common Alliance Chest has  a long title Max 2 lines',
    type: 'COMMON',
    qty: '2,056',
    maxSupply: '10,000',
    isClaimed: Math.random() > 0.5 ? true : false
  }));

const InventoryItem = ({ item }: { item: Inventory }) => {
  return (
    <div className="block h-[444px] w-full max-w-[328px] overflow-hidden rounded-[5px] bg-brand-deep-blue">
      <Overlay className="h-[200px] lg:h-[248px] w-full">
        <Image src={item.image} alt="" layout="fill" objectFit="cover" />
      </Overlay>
      <div className="p-6">
        <span className="mb-4 block text-[20px] font-extrabold">{item.name}</span>
        <div className="mb-6 flex items-center justify-between">
          <Badge>
            <Trans>{item.type}</Trans>
          </Badge>
          <span className="text-[16px] font-normal text-light">
            {item.qty}/{item.maxSupply}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-normal text-light">
            <Trans>Sigil Event</Trans>
          </span>
          {item.isClaimed ? (
            <div className="flex items-center font-bold text-green">
              <span className="mr-2 w-[22px]">
                <CheckIcon />
              </span>
              <span>
                <Trans>Claimed</Trans>
              </span>
            </div>
          ) : (
            <button className="btn-sm btn-primary flex items-center">
              <span className="relative top-[1px]">
                <Trans>OPEN NOW</Trans>
              </span>
              <span className="w-[22px]">
                <ChevronRightIcon />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InventoryPage: React.FC = () => {
  const [filter, setFilter] = useState<any>({});

  const filteredInventory = inventories;

  return (
    <Page>
      <div className={clsx(paddingX, headerNavSpacingClassName, 'mb-48')}>
        <div className="mx-auto max-w-content mt-12">
          <section
            className={clsx(
              negativeMarginXSm,
              "flex h-[102px] flex-col items-center justify-center overflow-hidden rounded-xl bg-[#081824] bg-[url('/images/inventory/header-bg.png')] bg-cover text-center"
            )}>
            <p className="mx-auto font-extrabold md:mx-0">
              <Trans>
                <span className="text-[20px] text-brand-white">
                  Sigils are inactive until the Sigma mission is set into motion.
                </span>
              </Trans>
              <Trans>
                <span className="ml-1 text-[20px] text-brand-light-blue">
                  T-minus 47 gigaquarks
                </span>
              </Trans>
            </p>
            <Trans>
              <span className="text-[16px] font-normal text-brand-light-blue">
                Once the Sigils are active, they will be minted directly on the Myriachain
              </span>
            </Trans>
          </section>
          <section className="-mt-7 md:mt-[88px]">
            <p className="mb-[32px] text-[32px] font-extrabold leading-[1.5]">Inventory</p>
            <div className="grid gap-0 md:grid-cols-[auto_1fr] md:gap-8">
              <div className="min-w-[184px]">
                <SortBy />
                <Filter
                  filterList={filters}
                  activeFilter={filter}
                  setFilter={(activeFilter) => setFilter(activeFilter)}
                />
              </div>
              <div className={clsx('mt-7 grid grid-cols-3 gap-x-6 gap-y-8')}>
                {filteredInventory.map((item, idx) => (
                  <div key={idx} className="snap-start">
                    <InventoryItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default InventoryPage;
