import React from 'react';
import OpenInventoryChestModal from './OpenChest';
import { Trans } from '@lingui/macro';
import CheckIcon from 'src/components/icons/CheckIcon';
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon';
import { AssetType, OpenChestContent, useInventoryQuery } from './useInventoryQuery';
import Button from '../core/Button';
import RarityBadge from '../RarityBadge';
import { getRarityColor } from 'src/utils';

interface Props {
  item: AssetType;
}

const InventoryItem = ({ item }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { inventoryOpenChestMutation } = useInventoryQuery();
  const [openedChest, setOpenedChest] = React.useState<OpenChestContent[] | undefined>();
  const rarityColor = getRarityColor(item.rarity);

  const handleOpenChest = async (chestId: string) => {
    try {
      const openedChest = await inventoryOpenChestMutation.mutateAsync(chestId);
      setOpenedChest(openedChest);
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="snap-start">
      <OpenInventoryChestModal
        open={open}
        onClose={() => setOpen(false)}
        openedChest={openedChest}
        chestName={item.name}
      />
      <div className="block h-[444px] w-full max-w-[328px] overflow-hidden rounded-[5px] bg-brand-deep-blue">
        <div
          className="relative flex h-[200px] w-full items-center justify-center lg:h-[248px]">
          <div className="absolute h-full w-full bg-[#081824]" />
          <div className="z-1 absolute h-full w-full opacity-[0.3]" style={{ backgroundColor: rarityColor }} />
          <div
            className="z-2 absolute h-full w-full"
            style={{
              background: "linear-gradient(139.51deg, #FFFFFF 17.35%, rgba(255, 255, 255, 0) 55.49%)",
              mixBlendMode: "soft-light",
            }}
          />
          <img className="absolute z-3" src={item.image_url} alt="" width="50%" height="auto" />
        </div>
        <div className="p-6">
          <span className="mb-4 block text-[20px] font-extrabold">{item.name}</span>
          <div className="mb-6 flex items-center justify-between">
            <RarityBadge rarity={item.rarity} />
            {/* <span className="text-[16px] font-normal text-light">2056</span> */}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-normal text-light">
              {item.collection}
            </span>
            {item.type === 'chest' ? (
              item.opened ? (
                <div className="flex items-center font-bold text-green">
                  <span className="mr-2 w-[22px]">
                    <CheckIcon />
                  </span>
                  <span>
                    <Trans>Claimed</Trans>
                  </span>
                </div>
              ) : (
                <Button
                  loading={inventoryOpenChestMutation.isLoading}
                  className="btn-sm btn-primary flex items-center"
                  onClick={() => handleOpenChest(item.id)}>
                  <span className="relative top-[1px]">
                    <Trans>OPEN NOW</Trans>
                  </span>
                  <span className="w-[22px]">
                    <ChevronRightIcon />
                  </span>
                </Button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
