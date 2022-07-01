import React, { useMemo } from 'react';
import { AssetType, OpenChestContent, useInventoryQuery } from './useInventoryQuery';
import NftBox from '../sigil/NftReward/NftBox';
import { t } from '@lingui/macro';

interface Props {
  item: AssetType;
  onClaimed: (item: AssetType, openedChest?: OpenChestContent[]) => void;
}

const InventoryItem = ({ item, onClaimed }: Props) => {
  const { inventoryOpenChestMutation } = useInventoryQuery();
  const claimable = useMemo(() => item.type === 'chest' && !item.opened, [item])
  const handleClaim = React.useCallback(async () => {
    const openedChest = await inventoryOpenChestMutation.mutateAsync(item.id);
    onClaimed(item, openedChest);
  }, [item, onClaimed, inventoryOpenChestMutation]);

  return (
    <div className="snap-start">
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
