import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Filter, { FilterList } from 'src/components/Filter';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import ListInventory from 'src/components/inventory/ListInventory';
import Page from 'src/components/Page';
// import SortBy from 'src/components/SortBy';
import { useGA4 } from 'src/lib/ga';
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

const InventoryPage: React.FC = () => {
  const { event } = useGA4();
  const [filter, setFilter] = useState<any>({});
  useEffect(() => {
    // TODO mock event
    event('Sigil Inventory Viewed', { campaign: 'Sigil', wallet_address: '_mock' })
  }, [event])
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
                {/* <SortBy /> */}
                <Filter
                  filterList={filters}
                  activeFilter={filter}
                  setFilter={(activeFilter) => setFilter(activeFilter)}
                />
              </div>
              <ListInventory />
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default InventoryPage;
