import { useMutation, useQuery } from 'react-query';
import http from 'src/services/http';

export type AssetStatus = 'off-chain' | 'on-chain';

export type Rarity = 'common' | 'ultra_rare';

export type AssetTypeType = 'sigil' | 'title' | 'chest' | 'credits';

type AssetBaseType = {
  alliance: string;
  collection: string;
  id: string;
  image_url: string;
  rarity: Rarity;
  status: AssetStatus;
  name: string;
  type: AssetTypeType;
};

export type AssetSigilType = AssetBaseType & {
  type: 'sigil';
};

export type AssetTitleType = AssetBaseType & {
  type: 'title';
};

export type AssetCreditType = Omit<
  AssetBaseType,
  'alliance' | 'collection' | 'rarity' | 'status' | 'name'
> & {
  amount: number;
  type: 'credits';
};

export type ChestItemSigilType = Omit<AssetSigilType, 'alliance'>;

export type ChestItemTitleType = Omit<AssetTitleType, 'alliance'>;

export type ChestItemCreditType = AssetCreditType;

export type AssetChestType = AssetBaseType & {
  opened: boolean;
  content: (ChestItemCreditType | ChestItemSigilType | ChestItemTitleType)[];
  type: 'chest';
};

export type AssetType = AssetSigilType | AssetTitleType | AssetChestType;

export type OpenChestContent = AssetSigilType | AssetTitleType | AssetCreditType;

const getInventory = async () => {
  const data = await http.get(`/v1/sigil/users/assets?pageSize=10`).then((res) => res.data?.data);

  if (data instanceof Array) {
    return (data as AssetType[]).filter((asset) =>
      (['chest', 'sigil', 'title'] as AssetTypeType[]).includes(asset.type)
    );
  }
};

const openChest = async (lootboxId: string) => {
  const data = await http
    .post(`/v1/sigil/users/lootbox`, {
      lootbox_id: lootboxId
    })
    .then((res) => res.data?.data);
  
  if (data?.content) {
    return data.content as OpenChestContent[]
  }
};

export const inventoryQueryKeys = {
  inventory_getInventory: 'inventory_getInventory'
};

export const useInventoryQuery = () => {
  const inventoryQuery = useQuery(inventoryQueryKeys.inventory_getInventory, () => getInventory());
  const inventoryOpenChestMutation = useMutation(openChest);

  return {
    inventoryQuery,
    inventoryOpenChestMutation
  };
};
