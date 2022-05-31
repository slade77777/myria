import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Filter, { ActiveFilter, FilterList } from 'src/components/Filter';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import ChevronLeftIcon from 'src/components/icons/ChevronLeftIcon';
import ListInventory from 'src/components/inventory/ListInventory';
import Page from 'src/components/Page';
// import SortBy from 'src/components/SortBy';
import { useGA4 } from 'src/lib/ga';
import { negativeMarginXSm, paddingX } from 'src/utils';
import { GetInventoryParams } from 'src/components/inventory/useInventoryQuery';
import ProtectedComponent from 'src/components/ProtectedComponent';

const filters: FilterList = [
  {
    title: 'Game',
    id: 'collection',
    options: [
      { id: 'Myriaverse', name: 'MyriaVerse' },
      { id: 'Metarush', name: 'Metarush' },
      { id: 'Metakart', name: 'Metakart' },
      { id: 'Block Royale', name: 'Block Royale' },
      { id: 'Startstrike Legends', name: 'Startstrike Legends' },
      { id: 'Moonville Farms', name: 'Moonville Farms' },
      { id: 'Hot Slice Tycoon', name: 'Hot Slice Tycoon' }
    ]
  },
  {
    title: 'Status',
    id: 'status',
    options: [
      { id: 'on-chain', name: 'On chain' },
      { id: 'ready-to-mint', name: 'Ready to mint' },
      { id: 'awaiting-mint', name: 'Awaiting mint' },
      { id: 'off-chain', name: 'Off chain' }
    ]
  },
  {
    title: 'Type',
    id: 'type',
    options: [
      { id: 'chest', name: 'Chest' },
      { id: 'sigil', name: 'Sigil' },
      { id: 'title', name: 'Title' }
    ]
  },
  {
    title: 'Rarity',
    id: 'rarity',
    options: [
      { id: 'common', name: 'Common' },
      { id: 'rare', name: 'Rare' },
      { id: 'ultra_rare', name: 'Ultra Rare' },
      { id: 'epic', name: 'Epic' },
      { id: 'legendary', name: 'Legendary' },
      { id: 'cosmic', name: 'Cosmic' },
      { id: 'celestial', name: 'Celestial' }
    ]
  }
];

type Filter = typeof filters;

const InventoryPage: React.FC = () => {
  const { event } = useGA4();
  const [filter, setFilter] = useState<ActiveFilter>({});
  const inventoryFilter = React.useMemo<GetInventoryParams>(() => {
    return {
      rarity: filter['rarity']?.map((r) => r.id),
      collection: filter['collection']?.map((r) => r.id),
      type: filter['type']?.map((r) => r.id),
      status: filter['status']?.map((r) => r.id)
    };
  }, [filter]);

  useEffect(() => {
    // TODO mock event
    event('Sigil Inventory Viewed', { campaign: 'Sigil', wallet_address: '_mock' });
  }, [event]);
  return (
    <ProtectedComponent>
      <Page>
        <div className={clsx(paddingX, headerNavSpacingClassName, 'mb-48')}>
          <div className="mx-auto mt-12 max-w-content">
            <section
              className={clsx(
                negativeMarginXSm,
                "flex h-[102px] flex-col items-center justify-center overflow-hidden rounded-xl bg-[#081824] bg-[url('/images/inventory/header-bg.png')] bg-cover text-center"
              )}>
              <p className="mx-auto font-extrabold md:mx-0">
                <Trans>
                  <span className="text-[20px] text-brand-white">
                    <Trans>Sigils are inactive until the Sigma mission is set into motion.</Trans>
                  </span>
                </Trans>
                <Trans>
                  <span className="ml-1 text-[20px] text-brand-light-blue">
                    <Trans>T-minus 47 gigaquarks</Trans>
                  </span>
                </Trans>
              </p>
              <Trans>
                <span className="text-[16px] font-normal text-brand-light-blue">
                  <Trans>
                    Once the Sigils are active, they will be minted directly on the Myria
                  </Trans>
                </span>
              </Trans>
            </section>
            <section className="-mt-7 md:mt-[88px]">
              <Link href="sigil" passHref>
                <a>
                  <div className="mb-3 flex cursor-pointer items-center font-medium text-brand-gold">
                    <i className="relative left-[-8px] w-6">
                      <ChevronLeftIcon />
                    </i>
                    <span>
                      <Trans>BACK TO SIGIL DASHBOARD</Trans>
                    </span>
                  </div>
                </a>
              </Link>

              <p className="mb-[32px] text-[32px] font-extrabold leading-[1.5]">
                <Trans>Inventory</Trans>
              </p>
              <div className="grid gap-0 md:grid-cols-[auto_1fr] md:gap-8">
                <div className="min-w-[184px]">
                  {/* <SortBy /> */}
                  <Filter
                    filterList={filters}
                    activeFilter={filter}
                    setFilter={(activeFilter) => setFilter(activeFilter)}
                  />
                </div>
                <ListInventory filterParams={inventoryFilter} />
              </div>
            </section>
          </div>
        </div>
      </Page>
    </ProtectedComponent>
  );
};

export default InventoryPage;
