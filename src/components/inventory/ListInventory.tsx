import React from 'react';
import clsx from 'clsx';
import { useInventoryQuery } from './useInventoryQuery';
import { LoadingStandBy } from '../Loading';
import InventoryItem from './InventoryItem';

const ListInventory = () => {
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
      {inventories.map((item, index) => (
        <InventoryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ListInventory;