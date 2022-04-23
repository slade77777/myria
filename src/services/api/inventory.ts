export type InventoryType = {
  id: string;
  image: string;
  name: string;
  rarity: 'COMMON' | 'EPIC' | 'ULTRA RARE';
  type: 'CHEST';
  qty: string;
  maxSupply: string;
  isOpened: boolean;
};

export type InventoryItemCreditType = {
  type: 'CREDITS';
  amount: number;
};

export type InventoryItemType = Omit<InventoryType, 'type' | 'isOpened'> & {
  type: 'SIGIL' | 'TITLE';
};

export type OpenInventoryType = InventoryType & {
  items: (InventoryItemType | InventoryItemCreditType)[];
};

const inventories: InventoryType[] = Array(9)
  .fill(0)
  .map((_, index) => ({
    id: String(index),
    image: '/images/our-games/metarush_op.png',
    name: 'Common Alliance Chest',
    rarity: 'COMMON',
    type: 'CHEST',
    qty: '2,056',
    maxSupply: '10,000',
    isOpened: Math.random() > 0.5 ? true : false
  }));

// MOCK
export const getInventory = () => {
  return new Promise<InventoryType[]>((resolve) => {
    setTimeout(() => resolve(inventories), 2000);
  });
};

export const openChest = (chestId: string) => {
  console.log('Opening chest', chestId);
  return new Promise<OpenInventoryType>((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...inventories[0],
          items: [
            {
              id: '1',
              image: '/images/nodes/sigil/alliance-1.png',
              name: 'x1 Rare Demonic Hell Widget',
              rarity: 'COMMON',
              type: 'SIGIL',
              qty: '2,056',
              maxSupply: '10,000'
            },
            {
              id: '2',
              image: '/images/nodes/sigil/alliance-1.png',
              name: 'x1 Rare Demonic Hell Title',
              rarity: 'COMMON',
              type: 'TITLE',
              qty: '2,056',
              maxSupply: '10,000'
            },
            {
              type: 'CREDITS',
              amount: 1000
            }
          ]
        }),
      2000
    );
  });
};
