import React from 'react';
import clsx from 'clsx';
import { LoadingStandBy } from '../Loading';
import { useInventoryQuery } from '../inventory/useInventoryQuery';
import InventoryItem from '../inventory/InventoryItem';
import NftBox from './NftReward/NftBox';
import { Trans } from '@lingui/macro';

const Inventory: React.FC = () => {
  const { inventoryQuery } = useInventoryQuery();
  const inventories = inventoryQuery.data || [];

  const handleChestClaimed = () => {
    inventoryQuery.refetch();
  }

  if (inventoryQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingStandBy />
      </div>
    );
  }

  const data = [...inventories, ...inventories]

  return (
    <div className="w-full">
      <section
        className="mt-12 mr-10 flex h-[102px] flex-col items-center justify-center overflow-hidden rounded-xl bg-[#081824] bg-[url('/images/inventory/header-bg.png')] bg-cover text-center">
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
            <Trans>Once the Sigils are active, they will be minted directly on the Myria</Trans>
          </span>
        </Trans>
      </section>
      <section className="mt-12 mr-10">
        <div className="grid grid-cols-4 xl:grid-cols-6 gap-8">
          {inventories.map((item, index) => (
            <InventoryItem key={index} item={item} onClaimed={handleChestClaimed} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inventory;
