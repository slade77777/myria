import React from 'react';
import OpenInventoryChestModal from './OpenChest';
import { Trans } from '@lingui/macro';
import Image from 'next/image';
import Badge from 'src/components/Badge';
import CheckIcon from 'src/components/icons/CheckIcon';
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon';
import Overlay from 'src/components/overlay/Overlay';
import { useInventoryQuery } from './useQuery';
import Button from '../core/Button';
import { InventoryType, OpenInventoryType } from 'src/services/api/inventory';

interface Props {
  item: InventoryType;
}

const InventoryItem = ({ item }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { inventoryOpenChestMutation } = useInventoryQuery();
  const [openedChest, setOpenedChest] = React.useState<OpenInventoryType | undefined>();

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
      />
      <div className="block h-[444px] w-full max-w-[328px] overflow-hidden rounded-[5px] bg-brand-deep-blue">
        <Overlay className="h-[200px] w-full lg:h-[248px]">
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
            {item.isOpened ? (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
