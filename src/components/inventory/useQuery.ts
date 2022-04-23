import { useMutation, QueryClient, useQuery } from "react-query";
import { getInventory, openChest } from "src/services/api/inventory";

export const inventoryQueryKeys = {
  inventory_getInventory: 'inventory_getInventory',
};

export const useInventoryQuery = () => {
  const inventoryQuery = useQuery(inventoryQueryKeys.inventory_getInventory, getInventory);
  const inventoryOpenChestMutation = useMutation(openChest);

  return {
    inventoryQuery,
    inventoryOpenChestMutation
  }
}
