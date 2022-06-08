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

  return (
    <div className="w-full">
      <section
        className="mt-12 mr-10 flex h-[102px] flex-col items-center justify-center overflow-hidden rounded-xl bg-[#081824] bg-[url('/images/inventory/header-bg.png')] bg-cover text-center">
        <p className="mx-auto font-extrabold md:mx-0">
          <Trans>
            <span className="text-[20px] text-brand-white">
              <Trans>Sigils are going to be activated later in time when the mysterious Sigma mission is set into motion.</Trans>
            </span>
          </Trans>
        </p>
        <Trans>
          <span className="text-[16px] font-normal text-brand-light-blue">
            <Trans>Be prepared as this might be the key to survival in the Myriaverse.</Trans>
          </span>
        </Trans>
      </section>
      <section className="mt-12 mr-10">
        <div className="flex flex-row flex-wrap w-full gap-8">
          {inventories.map((item, index) => (
            <InventoryItem key={index} item={item} onClaimed={handleChestClaimed} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inventory;
