import React, { useMemo } from 'react';
import OpenInventoryChestModal from './OpenChest';
import { AssetType, OpenChestContent, useInventoryQuery } from './useInventoryQuery';
import { toast } from 'react-toastify';
import NftBox from '../sigil/NftReward/NftBox';
import { t } from '@lingui/macro';

interface Props {
  item: AssetType;
  onClaimed: () => void;
}

const InventoryItem = ({ item, onClaimed }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { inventoryOpenChestMutation } = useInventoryQuery();
  const [openedChest, setOpenedChest] = React.useState<OpenChestContent[] | undefined>();
  const claimable = useMemo(() => item.type === 'chest' && !item.opened, [item])

  const handleOpenChest = async (chestId: string) => {
    if (!claimable) {
      return;
    }

    try {
      const openedChest = await inventoryOpenChestMutation.mutateAsync(chestId);
      console.log(openedChest)
      setOpenedChest(openedChest);
      setOpen(true);
      onClaimed();
      toast(t`Claim success`, { type: 'success' });
    } catch (e) {
      toast(t`Claim fail, please try again.`, { type: 'error' });
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
      <NftBox
        imageUrl={item.image_url}
        buttonText={claimable ? t`CLAIM NOW` : t`CLAIMED`}
        titleText={item.name}
        onClaim={() => handleOpenChest(item.id)}
        isClaiming={inventoryOpenChestMutation.isLoading}
        isBlurButton={!claimable}
      />
    </div>
  );
};

export default InventoryItem;
