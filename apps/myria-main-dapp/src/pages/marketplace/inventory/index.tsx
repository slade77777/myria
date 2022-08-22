import React, { useEffect } from 'react';
import Inventory from 'src/components/marketplace/Inventory';
import { NFTItemType } from 'src/components/marketplace/NftItem/type';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import avatar from 'public/images/marketplace/avatar.png';
import { useRouter } from 'next/router';
import useMarketplaceInventory from 'src/hooks/useMarketplaceInventory';
import { useSelector } from 'react-redux';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import truncateString from 'src/helper';
import Page from 'src/components/Page';
import useCheckMobileView from 'src/hooks/useCheckMobileView';
import MessageMobileView from 'src/components/marketplace/Modals/MessageMobileView';

function InventoryPage() {
  const { isMobile, isResolution, setIsSolution } = useCheckMobileView();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = '0x' + starkKeyUser;
  const { user, userProfileQuery } = useAuthenticationContext();
  const { address } = useWalletContext();
  const { rawData, refetch, isFetching } = useMarketplaceInventory(starkKey);
  const router = useRouter();
  useEffect(() => {
    if (userProfileQuery.isFetched && !user?.wallet_id) {
      router.push('/marketplace');
    }
  }, [router, user?.wallet_id, userProfileQuery.isFetched]);

  const items: NFTItemType[] = React.useMemo(() => {
    if (rawData instanceof Array) {
      return rawData.map((item) => ({
        id: item.id,
        rarity: item.metadata?.rarity,
        name: item.name || 'Untitled',
        image_url: item.imageUrl,
        collection: item.collection?.name,
        creator: truncateString(item.collection.ownerPublicKey),
        creatorImg: avatar.src, // MOCK
        priceETH: +item?.order?.nonQuantizedAmountBuy
      }));
    }
    return [];
  }, [rawData]);

  // if (!address) return null;

  if (isMobile) {
    return <MessageMobileView isShow={isResolution} handleClose={() => setIsSolution(false)} />;
  }

  return (
    <Page includeFooter={false}>
      <Inventory
        userAddress={user?.wallet_id ? user?.wallet_id : address}
        userAvatar={avatar.src}
        userName={user?.user_name || 'Unknown'}
        userJoinDate={user?.date_registered}
        items={items}
        assetLoading={isFetching}
      />
    </Page>
  );
}

export default InventoryPage;
