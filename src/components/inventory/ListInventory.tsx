import React from 'react';
import OpenInventoryChestModal from './OpenChest';
import clsx from 'clsx';
import { useInventoryQuery } from './useQuery';
import { LoadingStandBy } from '../Loading';
import InventoryItem from './InventoryItem';

const ListInventory = () => {
  const [open, setOpen] = React.useState(false);
  const { inventoryQuery } = useInventoryQuery();
  const inventories = inventoryQuery.data || [];

  if (inventoryQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingStandBy />
      </div>
    );
  }

  return (
    <div className={clsx('mt-7 grid grid-cols-3 gap-x-6 gap-y-8')}>
      <OpenInventoryChestModal open={open} onClose={() => setOpen(false)} />
      {inventories.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListInventory;
