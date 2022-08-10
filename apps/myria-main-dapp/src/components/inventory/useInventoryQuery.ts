import { useMutation, useQuery } from 'react-query';
import http from 'src/client';
import { RarityType } from 'src/types/sigil';

export type AssetStatus = 'off-chain' | 'on-chain';

export type Rarity = RarityType;

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
  'alliance' | 'collection' | 'rarity' | 'status' | 'name' | 'image_url'
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

export type GetInventoryParams = {
  collection?: string[];
  type?: string[];
  rarity?: string[];
  status?: string[];
};

const getInventory = async (params?: GetInventoryParams) => {
  const data = await http
    .get(`sigil/users/assets?pageSize=100`, { params })
    .then((res) => res.data?.data);

  if (data instanceof Array) {
    return (data as AssetType[]).filter((asset) =>
      (['chest', 'sigil', 'title'] as AssetTypeType[]).includes(asset.type)
    );
  }
};

const openChest = async (lootboxId: string) => {
  const data = await http
    .post(`sigil/users/lootbox`, {
      lootbox_id: lootboxId
    })
    .then((res) => res.data?.data);

  if (data?.content) {
    return data.content as OpenChestContent[];
  }
};

const mintReward = async () => {
  return http.post('/sigil/l2/mint');
};

export const inventoryQueryKeys = {
  inventory_getInventory: 'inventory_getInventory'
};

export const useInventoryQuery = ({
  getInventoryParams
}: { getInventoryParams?: GetInventoryParams } = {}) => {
  const inventoryQuery = useQuery(
    [inventoryQueryKeys.inventory_getInventory, getInventoryParams],
    () => getInventory(getInventoryParams)
  );
  const inventoryOpenChestMutation = useMutation(openChest);
  const mintRewardMutation = useMutation(mintReward);

  return {
    inventoryQuery,
    inventoryOpenChestMutation,
    mintRewardMutation
  };
};
