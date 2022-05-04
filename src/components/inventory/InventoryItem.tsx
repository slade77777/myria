import React from 'react';
import OpenInventoryChestModal from './OpenChest';
import { Trans } from '@lingui/macro';
import Image from 'next/image';
import Badge from 'src/components/Badge';
import CheckIcon from 'src/components/icons/CheckIcon';
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon';
import Overlay from 'src/components/overlay/Overlay';
import { AssetType, OpenChestContent, useInventoryQuery } from './useInventoryQuery';
import Button from '../core/Button';

interface Props {
  item: AssetType;
}

const InventoryItem = ({ item }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { inventoryOpenChestMutation } = useInventoryQuery();
  const [openedChest, setOpenedChest] = React.useState<OpenChestContent[] | undefined>();

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
        <Overlay className="h-[200px] w-full lg:h-[248px]">
          <Image src="/images/nodes/insignia/alliance_sigilB.png" alt="" layout="fill" objectFit="cover" />
        </Overlay>
        <div className="p-6">
          <span className="mb-4 block text-[20px] font-extrabold">{item.name}</span>
          <div className="mb-6 flex items-center justify-between">
            <Badge>
              <span className='uppercase'>
                <Trans>{item.rarity}</Trans>
              </span>
            </Badge>
            <span className="text-[16px] font-normal text-light">
              2056
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-normal text-light">
              <Trans>{item.collection}</Trans>
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
                onClick={() => handleOpenChest('6b220221-205f-4d0e-a023-25e6a1812436')}>
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
