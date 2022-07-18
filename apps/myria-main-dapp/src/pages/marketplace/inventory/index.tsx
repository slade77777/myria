import React, { useEffect } from 'react';
import Inventory from 'src/components/marketplace/Inventory';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import testavatarImg from './testavatar.png';
import { useRouter } from 'next/router';
import useMarketplaceInventory from 'src/hooks/useMarketplaceInventory';
import {useSelector} from "react-redux";
import { RootState } from 'src/packages/l2-wallet/src/app/store';

function InventoryPage() {
  const { user } = useAuthenticationContext();
  const { address } = useWalletContext();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push('/marketplace');
    }
  }, [address, router]);

  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = '0x' + starkKeyUser;
  const { rawData } = useMarketplaceInventory(starkKey);

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
