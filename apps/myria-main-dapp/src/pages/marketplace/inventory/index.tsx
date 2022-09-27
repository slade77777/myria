import React, { useEffect, useMemo } from 'react';
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
import { getItemsPagination } from 'src/utils';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';

function InventoryPage() {
  const { isMobile, isResolution, setIsSolution } = useCheckMobileView();
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const starkKey = `0x${localStarkKey}`;
  const { user, userProfileQuery } = useAuthenticationContext();
  const { address } = useWalletContext();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, result } =
    useMarketplaceInventory(starkKey);
  const router = useRouter();
  useEffect(() => {
    if (userProfileQuery.isFetched && !user?.wallet_id) {
      router.push('/marketplace');
    }
  }, [router, user?.wallet_id, userProfileQuery.isFetched]);
  const { items } = getItemsPagination(result?.data?.pages || []); // using this "items" to render
  const totalItems = useMemo(() => {
    try {
      return result.data?.pages[0]?.data.meta.totalItems || 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }, [result.data?.pages]);

  const totalForSaleItems = useMemo(() => {
    try {
      return result.data?.pages[0]?.data.meta.totalAssetsForSale || 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }, [result.data?.pages]);
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
        items={items.map((item: any) => ({
          id: item.id,
          rarity: item.metadata?.rarity,
          collection: item.collection,
          name: item.name || 'Untitled',
          image_url: item.imageUrl,
          creator: truncateString(item.collection.ownerPublicKey),
          creatorImg: avatar.src, // MOCK
          priceETH: +item?.order?.nonQuantizedAmountBuy
        }))}
        assetLoading={result.isFetched}
        hasMore={!isFetchingNextPage && hasNextPage}
        fetchNextPage={fetchNextPage}
        totalItems={totalItems}
        totalForSaleItems={totalForSaleItems}
      />
    </Page>
  );
}

export default InventoryPage;
