import { Item } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { useQuery } from 'react-query';
import { marketplaceApiClient } from 'src/client';
import Inventory from 'src/components/marketplace/Inventory';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import testavatarImg from './testavatar.png';

function InventoryPage() {
  const { user } = useAuthenticationContext();
  const { address } = useWalletContext();
  const starkKey = '0xf8c6635f9cfe85f46759dc2eebe71a45b765687e35dbe5e74e8bde347813ef'; // MOCK
  const { data } = useQuery(['marketplaceInventory', starkKey], () => {
    if (starkKey) {
      return marketplaceApiClient
        .get(`/v1/assets/stark-key/${starkKey}`)
        .then((res) => res.data && res.data.data);
    }
    return null;
  });

  const items: NFTItemType[] = React.useMemo(() => {
    if (data instanceof Array) {
      return data.map((item) => ({
        id: item.id,
        rarity: item.metadata?.rarity,
        name: item.name || 'Untitled',
        image_url: item.imageUrl,
        collection: item.collection?.name,
        creator: item.collection?.project?.name,
        creatorImg: testavatarImg.src, // MOCK
        priceETH: Math.round(Math.random() * 5) // MOCK
      }));
    }
    return [];
  }, [data]);

  if (!address) return null;

  return (
    <Inventory
      userAddress={address}
      userAvatar={testavatarImg.src}
      userName={user?.user_name || 'Unknown'}
      userJoinDate={user?.date_registered}
      items={items}
    />
  );
}

export default InventoryPage;
