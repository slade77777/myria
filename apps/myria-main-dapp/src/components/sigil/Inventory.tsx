import React from 'react';
import { LoadingStandBy } from '../Loading';
import { AssetType, OpenChestContent, useInventoryQuery } from '../inventory/useInventoryQuery';
import InventoryItem from '../inventory/InventoryItem';
import { Trans } from '@lingui/macro';
import OpenInventoryChestModal from '../inventory/OpenChest';

const Inventory: React.FC = () => {
  const { inventoryQuery } = useInventoryQuery();
  const inventories = inventoryQuery.data || [];
  const [modalData, setModalData] = React.useState<
    { openedChest: OpenChestContent[] | undefined; item: AssetType } | undefined
  >();

  const handleChestClaimed = React.useCallback(
    (item: AssetType, openedChest?: OpenChestContent[]) => {
      setModalData({ openedChest, item });
      inventoryQuery.refetch();
    },
    [inventoryQuery]
  );

  if (inventoryQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingStandBy />
      </div>
    );
  }

  return (
    <div className="w-full">
      <OpenInventoryChestModal
        open={!!modalData?.openedChest}
        onClose={() => setModalData(undefined)}
        openedChest={modalData?.openedChest}
        chestName={modalData?.item.name}
        chestRarity={modalData?.item.rarity}
      />

      <section className="mt-12 mr-10 flex h-[102px] flex-col items-center justify-center overflow-hidden rounded-xl bg-[#081824] bg-[url('/images/inventory/header-bg.png')] bg-cover text-center">
        <p className="mx-auto font-extrabold md:mx-0">
          <Trans>
            <span className="text-[20px] text-brand-white">
              <Trans>
                Sigils are going to be activated later in time when the mysterious Sigma mission is
                set into motion.
              </Trans>
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
        <div className="flex w-full flex-row flex-wrap gap-8">
          {inventories.map((item, index) => (
            <InventoryItem key={index} item={item} onClaimed={handleChestClaimed} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inventory;
