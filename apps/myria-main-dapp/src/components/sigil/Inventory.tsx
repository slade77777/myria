import React from 'react';
import { LoadingStandBy } from '../Loading';
import { AssetType, OpenChestContent, useInventoryQuery } from '../inventory/useInventoryQuery';
import InventoryItem from '../inventory/InventoryItem';
import { Trans } from '@lingui/macro';
import OpenInventoryChestModal from '../inventory/OpenChest';
import MintRewardModal from '../inventory/MintReward';

const Inventory: React.FC = () => {
  const { inventoryQuery } = useInventoryQuery();
  const inventories = inventoryQuery.data || [];
  const [modalData, setModalData] = React.useState<
    { openedChest: OpenChestContent[] | undefined; item: AssetType } | undefined
  >();
  const [openMintingModal, setOpenMintingModal] = React.useState<boolean>(false);

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
      {openMintingModal && (
        <MintRewardModal onClose={() => setOpenMintingModal(false)} /> // force modal to unmount
      )}
      <section className="mt-12 mr-10 grid grid-cols-1 items-center gap-4 overflow-hidden rounded-xl bg-[#081824] bg-[url('/images/inventory/header-bg.png')] bg-cover py-6 px-8 xl:grid-cols-[1fr_auto_1fr] xl:gap-2">
        <div className="space-y-2 text-center xl:col-start-2">
          <p className="text-[20px] font-extrabold leading-[1.3] text-white">
            <Trans>Minting is now live!</Trans>
          </p>
          <p className="text-light text-[16px] font-normal">
            <Trans>You can now mint your rewards on the Myria L2 chain!</Trans>
          </p>
        </div>
        <div className="flex justify-center xl:justify-end">
          <button
            className="btn-lg body-14-bold btn-primary mr-4 py-[9px]"
            onClick={() => setOpenMintingModal(true)}>
            <Trans>MINT MY REWARDS</Trans>
          </button>
        </div>
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
