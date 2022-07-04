import React from 'react';
import { useQuery } from 'react-query';
import Inventory from 'src/components/marketplace/Inventory';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import { assetModule } from 'src/services/myriaCore';
import testavatarImg from './testavatar.png';

function InventoryPage() {
  const { user } = useAuthenticationContext();
  const { address } = useWalletContext();
  const starkKey = '0xf8c6635f9cfe85f46759dc2eebe71a45b765687e35dbe5e74e8bde347813ef'; // MOCK
  const { data } = useQuery(['marketplaceInventory', starkKey], () => {
    if (starkKey) {
      return assetModule?.getAssetByStarkKey(starkKey);
    }
    return null;
  });

  const rawData = data?.data;

  console.log(rawData);

  const items: NFTItemType[] = React.useMemo(() => {
    if (rawData instanceof Array) {
      return rawData.map((item) => ({
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
  }, [rawData]);

  if (!address) return 'Need to connect wallet';

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
