import React, { useMemo } from 'react';
import OpenInventoryChestModal from './OpenChest';
import { AssetType, OpenChestContent, useInventoryQuery } from './useInventoryQuery';
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

  const handleClaim = async () => {
    const openedChest = await inventoryOpenChestMutation.mutateAsync(item.id);
    setOpenedChest(openedChest);
    setOpen(true);
    onClaimed();
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
        buttonText={claimable ? t`OPEN` : t`CLAIMED`}
        titleText={item.name}
        onClaim={claimable ? handleClaim : undefined}
        disableClaimingAnimation
        isBlurButton={!claimable}
      />
    </div>
  );
};

export default InventoryItem;
