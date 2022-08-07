import { Trans } from '@lingui/macro';
import lodash from 'lodash';
import {
  CreateOrderEntity,
  SignableOrderInput
} from 'myria-core-sdk/dist/types/src/types/OrderTypes';
import { TradesRequestTypes } from 'myria-core-sdk/dist/types/src/types/TradesTypes';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BackIcon from 'src/components/icons/BackIcon';
import DAOIcon from 'src/components/icons/DAOIcon';
import MintedIcon from 'src/components/icons/MintedIcon';
import OwnerAssetIcon from 'src/components/icons/OwnerAssetIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import { Loading } from 'src/components/Loading';
import Modal from 'src/components/Modal';
import { useWalletContext } from 'src/context/wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import truncateString from 'src/helper';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { TokenType } from 'src/packages/l2-wallet/src/common/type';
import { StatusWithdrawNFT } from 'src/types/marketplace';
import { formatNumber2digits, formatPrice, getRarityColor, validatedImage } from 'src/utils';
import AssetList from '../AssetList';
import MessageListingPriceModal from '../MessageModal/MessageListingPrice';
import MessageModal from '../MessageModal/MessageModal';
import MessagePurchaseModal from '../MessageModal/MessagePurchaseModal';
import MessageUnlist from '../MessageModal/MessageUnlist';
import MessageWithdrawalNftModal from '../MessageModal/MessageWithdrawalNftModal';
import { MessageEditListingModal, ModalEditListing } from '../Modals';
import UnlistModalContent from '../Modals/UnlistModal';
import { NFTItemType } from '../NftItem/type';
import AssetDetailTab from './AssetDetailTab';
import PurchaseModal from './PurchaseModal';
import avatar from '../../../../public/images/marketplace/avatar.png';
import { useGA4 } from '../../../lib/ga';
import { useAuthenticationContext } from '../../../context/authentication';
import { NFTItemAction, NFTItemNoPriceAction } from '../../../lib/ga/use-ga/event';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { AssetDetailsResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { useL2WalletContext } from 'src/context/l2-wallet';
import LearnMoreWithdrawNFT from '../Modals/LearnMoreWithdrawNFT';

interface Props {
  id: string;
}

interface IProp {
  currentPrice?: string;
  currentUSDPrice?: string;
  setStatus?: () => void;
  starkKey?: string;
  assetDetails?: AssetDetailsResponse;
  setShowUnlist?: any;
}

export enum AssetStatus {
  BUY_NOW,
  SALE,
  MODIFY,
  UNCONNECTED,
  UNCONNECTED_NOT_SALE
}
const QUANTUM = '10000000000';
const INTERVAL_DURATION = 2 * 60 * 1000;

const ItemAttribution = ({ keyword = 'RARITY', val = 'Ultra Rare' }) => {
  return (
    <div className="border-base/6 bg-base/3 rounded-[8px] border py-4 text-center">
      <p className="text-blue/6 uppercase">{keyword}</p>
      <p className="font-medium">{val}</p>
    </div>
  );
};

function AssetDetails({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', id],
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const assetModule = moduleFactory.getAssetModule();
      const [assetDetails, listOrder] = await Promise.all([
        assetModule?.getAssetById(id), //getAssetDetail by assetId
        assetModule?.getAssetEqualMetadataById({ assetId: +id }) //getListOrder by assetId
      ]);
      handleSetValueNFT(assetDetails?.data);

      return { assetDetails: assetDetails?.data, listOrder: listOrder?.data };
    },
    {
      enabled: !!id
    }
  );
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = useMemo(() => `0x${starkKeyUser}`, [starkKeyUser]);
  const { connectL2Wallet, disconnectL2Wallet } = useL2WalletContext();

  const assetDetails = useMemo(() => data?.assetDetails, [data?.assetDetails]);
  const ownedBy = useMemo(() => {
    if (assetDetails?.owner?.starkKey == starkKey) {
      return <Trans>You</Trans>;
    }
    return truncateString(`${assetDetails?.owner?.starkKey}`);
  }, [assetDetails?.owner?.starkKey, starkKey]);
  const listOrder = useMemo(() => data?.listOrder, [data?.listOrder]);
  const titleBack = useMemo(
    () =>
      assetDetails?.collectionName ? (
        <span>
          <Trans>BACK TO</Trans> {assetDetails.collectionName.toUpperCase()}
        </span>
      ) : (
        <span>
          <Trans>BACK</Trans>
        </span>
      ),
    [assetDetails]
  );

  const { data: moreCollectionList } = useQuery(
    ['moreCollection', assetDetails?.collectionId],
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const collectionModule = moduleFactory.getCollectionModule();
      // more from this Collection (status:'FOR_SALE')
      const res = await collectionModule?.getAssetByCollectionId({
        assetType: 'FOR_SALE',
        collectionId: Number(assetDetails?.collectionId)
      });
      return res?.data;
    },
    {
      enabled: !!assetDetails?.collectionId //dependence by assetDetails?.collectionId
    }
  );

  const attributes = useMemo(() => {
    const resultArray: any[] = [];
    lodash.map(assetDetails?.metadataOptional, (val, key) => {
      if (!key.toLowerCase().includes('url')) {
        resultArray.push({ key, val }); // remove all key what has 'url'.
      }
    });
    return resultArray;
  }, [assetDetails?.metadataOptional]);
  // the status will be get from based on the order Object in API get assetDetails

  const [status, setStatus] = useState<AssetStatus>(AssetStatus.UNCONNECTED);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showWithdrawalMessage, setShowWithdrawalMessage] = useState(false);
  const [showMessageEdit, setShowMessageEdit] = useState(false);
  const [showModalUnlist, setShowModalUnlist] = useState(false);
  const [showMessageModify, setShowMessageModify] = useState({ isShow: false, newPrice: 0 });
  const [showMessageUnlist, setShowMessageUnlist] = useState(false);
  const [payloadDataTrade, setPayloadDataTrade] = useState({});
  const { data: etheCost = 0 } = useEtheriumPrice();
  const { address, onConnect, onConnectCompaign } = useWalletContext();
  const { loginByWalletMutation } = useAuthenticationContext();
  // wait update sdk
  const bgImage = assetDetails?.metadataOptional
    ? (assetDetails?.metadataOptional as any)?.rarity
    : 'common';
  const rarityColor = getRarityColor(bgImage);
  const {
    isWithdrawing,
    status: withdrawalStatus,
    setStatus: setWithdrawalStatus,
    handleSetValueNFT,
    isShowLearnMore,
    handleLearnMore
  } = useWithDrawNFTContext();
  const [assetBuy, setAssetBuy] = useState<{
    name: string;
    price: string;
  }>({
    name: '',
    price: ''
  });

  const currentPrice = useMemo(() => {
    if (!assetDetails?.order?.nonQuantizedAmountBuy) return '0';
    const price = parseFloat(assetDetails?.order?.nonQuantizedAmountBuy);
    const amountPrice = price > 0 ? price : 0;

    return formatPrice(amountPrice);
  }, [assetDetails?.order]);

  const currentUSDPrice = useMemo(() => {
    if (!assetDetails?.order?.nonQuantizedAmountBuy) return;
    const price = parseFloat(assetDetails?.order?.nonQuantizedAmountBuy);
    return formatNumber2digits(price * etheCost);
  }, [assetDetails?.order?.nonQuantizedAmountBuy, etheCost]);

  const { event } = useGA4();
  const { user } = useAuthenticationContext();
  const handleCloseModal = useCallback(() => {
    setShowModal((showModal) => !showModal);
  }, [setShowModal]);
  const onTrackingItem = useCallback(
    ({
      eventName,
      newEthPrice,
      newUsdPrice
    }: {
      eventName: NFTItemAction;
      newEthPrice?: number;
      newUsdPrice?: number;
    }) => {
      const ifModify = eventName === 'MKP Item Listing Modify Completed';
      const ethPrice = assetDetails?.order?.nonQuantizedAmountBuy;
      const usdPrice = ethPrice ? +ethPrice * etheCost : 0;
      event(eventName, {
        myria_id: user?.user_id,
        wallet_address: `_${address}`,
        item_name: assetDetails?.name || '',
        item_id: `${assetDetails?.id}`,
        collection_name: assetDetails?.collectionName,
        collection_author: assetDetails?.creator?.name,
        item_owner: assetDetails?.owner?.ethAddress || '',
        item_price_eth: ifModify ? newEthPrice && +newEthPrice : ethPrice ? +ethPrice : 0,
        item_price_usd: ifModify ? newUsdPrice && +newUsdPrice : usdPrice ? +usdPrice : 0,
        ...(ifModify
          ? {
              old_price_eth: ethPrice && +ethPrice,
              old_price_usd: usdPrice && +usdPrice
            }
          : {})
      });
    },
    [
      address,
      assetDetails?.collectionName,
      assetDetails?.creator?.name,
      assetDetails?.id,
      assetDetails?.name,
      assetDetails?.order?.nonQuantizedAmountBuy,
      assetDetails?.owner?.ethAddress,
      etheCost,
      event,
      user?.user_id
    ]
  );
  const onSubmitModifyOrder = async ({ price }: { price: string }) => {
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;
    const orderModule = moduleFactory.getOrderModule();
    if (!address) return;
    const result = await orderModule?.updateOrderPrice(assetDetails?.order.orderId + '', {
      newAmountBuy: price,
      sellerStarkKey: starkKey,
      sellerWalletAddress: address,
      nonQuantizedAmountBuy: ''
    });

    if (result) {
      setShowMessageModify({
        ...showMessageModify,
        isShow: true,
        newPrice: (result as any).nonQuantizedAmountBuy
      });
      setShowModal(false);
      refetch();
      onTrackingItem({
        eventName: 'MKP Item Listing Modify Completed',
        newEthPrice: parseFloat(price),
        newUsdPrice: +price * etheCost
      });
    }
  };
  const onSubmitCreateOrder = useCallback(
    async ({ price }) => {
      onTrackingItem({ eventName: 'MKP Item Listing Confirmed' });
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const orderModule = moduleFactory.getOrderModule();
      if (!address) return;
      const payload: SignableOrderInput = {
        orderType: 'SELL',
        ethAddress: address,
        starkKey: starkKey,
        tokenSell: {
          type: TokenType.MINTABLE_ERC721,
          data: {
            tokenId: assetDetails?.tokenId,
            tokenAddress: assetDetails?.tokenAddress
          }
        },
        amountSell: '1',
        tokenBuy: {
          type: TokenType.ETH,
          data: {
            quantum: QUANTUM
          }
        },
        amountBuy: price + '',
        includeFees: false
      };
      const signature = await orderModule?.signableOrder(payload);
      if (signature) {
        const paramCreateOrder: CreateOrderEntity = {
          assetRefId: parseInt(id, 10),
          orderType: 'SELL',
          fees: [{}],
          includeFees: false,
          amountSell: signature.amountSell,
          amountBuy: signature.amountBuy,
          sellerStarkKey: starkKey,
          vaultIdSell: signature.vaultIdSell,
          vaultIdBuy: signature.vaultIdBuy,
          sellerAddress: address,
          assetIdBuy: signature.assetIdBuy,
          assetIdSell: signature.assetIdSell
        };
        const res = await orderModule?.createOrder(paramCreateOrder);
        if (res) {
          setShowModal(false);
          setStatus(AssetStatus.MODIFY);
          setShowMessageEdit(true);
          onTrackingItem({ eventName: 'MKP Item Listing Completed' });
          refetch();
        }
      }
    },
    [
      address,
      assetDetails?.tokenAddress,
      assetDetails?.tokenId,
      id,
      onTrackingItem,
      refetch,
      starkKey
    ]
  );
  useEffect(() => {
    // cronjob run every 2 minutes
    const getBalance = async () => {
      if (!starkKeyUser || !address || !assetDetails?.assetMintId) return;
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawalModule = moduleFactory.getWithdrawModule();

      const balance = await withdrawalModule.getWithdrawalBalance(
        address.toLowerCase(),
        assetDetails?.assetMintId + ''
      );
      console.log(balance);

      if (balance > 0) {
        if (withdrawalStatus != StatusWithdrawNFT.COMPLETED) {
          setShowWithdrawalMessage(true);
        }
        return true;
      }
      return false;
    };
    getBalance(); // call the first time
    const withdrawalInterval = setInterval(() => {
      getBalance().then((res) => {
        if (res) {
          clearInterval(withdrawalInterval);
        }
      });
    }, INTERVAL_DURATION);
    return () => clearInterval(withdrawalInterval);
  }, [
    address,
    assetDetails,
    assetDetails?.assetMintId,
    assetDetails?.id,
    handleSetValueNFT,
    setWithdrawalStatus,
    starkKey,
    starkKeyUser
  ]);

  useEffect(() => {
    let currentStatus: number = AssetStatus.UNCONNECTED;

    if (assetDetails?.order) {
      // item for sale
      if (starkKey === assetDetails?.owner?.starkKey) {
        currentStatus = AssetStatus.MODIFY; // connected and own NFT
      } else if (starkKey.length > 2) {
        currentStatus = AssetStatus.BUY_NOW; // connected and not own NFT
      } else {
        currentStatus = AssetStatus.UNCONNECTED; // not connected
      }
    } else {
      // item not for sale
      if (starkKey === assetDetails?.owner?.starkKey) {
        // connected and own NFT
        currentStatus = AssetStatus.SALE;
      } else {
        currentStatus = AssetStatus.UNCONNECTED_NOT_SALE; // not connected
      }
    }
    setStatus(currentStatus);
  }, [address, assetDetails?.order, assetDetails?.owner?.starkKey, starkKey]);

  const onHandleUnlist = async () => {
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;

    const orderModule = moduleFactory.getOrderModule();
    if (!address || !assetDetails?.order.orderId) return;
    const result = await orderModule?.deleteOrderById({
      orderId: assetDetails?.order.orderId,
      sellerWalletAddress: address
    });
    if (result) {
      setShowModalUnlist(false);
      setShowMessageUnlist(true);
      refetch();
      setStatus(AssetStatus.SALE);
    }
  };

  const onTrackingNoPriceItem = useCallback(
    (eventName: NFTItemNoPriceAction) => {
      event(eventName, {
        myria_id: user?.user_id,
        wallet_address: `_${address}`,
        item_name: assetDetails?.name || '',
        item_id: `${assetDetails?.id}`,
        collection_name: assetDetails?.collectionName,
        collection_author: assetDetails?.creator?.name
      });
    },
    [
      address,
      assetDetails?.collectionName,
      assetDetails?.creator?.name,
      assetDetails?.id,
      assetDetails?.name,
      event,
      user?.user_id
    ]
  );

  const onTrackingConnectWallet = useCallback(() => {
    event('MKP Connect to Buy Selected', {
      item_name: assetDetails?.name || '',
      item_id: `${assetDetails?.id}`,
      collection_name: assetDetails?.collectionName,
      collection_author: assetDetails?.creator?.name
    });
  }, [
    assetDetails?.collectionName,
    assetDetails?.creator?.name,
    assetDetails?.id,
    assetDetails?.name,
    event
  ]);

  const handleCreateTrade = async (tradeData: any) => {
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;
    const orderModule = moduleFactory.getOrderModule();
    const tradeModule = moduleFactory.getTradeModule();
    if (!address || !tradeData?.order.orderId) return;

    try {
      const signableOrderInput: SignableOrderInput = {
        orderType: 'BUY',
        ethAddress: address,
        starkKey,
        tokenBuy: {
          type: TokenType.MINTABLE_ERC721,
          data: {
            tokenId: tradeData?.tokenId,
            tokenAddress: tradeData?.tokenAddress
          }
        },
        amountBuy: `${tradeData?.order.amountSell}`,
        amountSell: `${tradeData?.order.amountBuy}`,
        tokenSell: {
          type: TokenType.ETH,
          data: {
            quantum: QUANTUM
          }
        },
        includeFees: false
      };
      const signableOrder = await orderModule?.signableOrder(signableOrderInput);
      if (!signableOrder) return;
      const payloadTrade: TradesRequestTypes = {
        orderId: tradeData?.order.orderId,
        amountBuy: signableOrder.amountBuy,
        amountSell: signableOrder.amountSell,
        vaultIdSell: signableOrder.vaultIdSell,
        vaultIdBuy: signableOrder.vaultIdBuy,
        starkKey,
        buyerAddress: address,
        assetIdSell: signableOrder.assetIdSell,
        assetIdBuy: signableOrder.assetIdBuy,
        includeFees: false
      };

      // code below will use in the future
      const resultCreateTrade = tradeModule?.createTrades(payloadTrade);
      return resultCreateTrade;
    } catch (e) {
      throw new Error('Signable order failure with error');
    }
  };

  const handleBuyNowItem = (data: any) => {
    setAssetBuy({
      name: data.name,
      price: formatPrice(Number(data?.order[0]?.nonQuantizedAmountBuy))
    });
    setPayloadDataTrade(formatDataTrade(data));
    setShowPopup(true);
  };

  const formatDataTrade = (listOrder: any) => {
    const isOrder = Array.isArray(listOrder.order);
    const payloadDataTrade = {
      order: {
        orderId: isOrder ? listOrder?.order[0].id : listOrder?.order.orderId,
        amountSell: isOrder ? listOrder?.order[0].amountSell : listOrder?.order.amountSell,
        amountBuy: isOrder ? listOrder?.order[0].amountBuy : listOrder?.order.amountBuy
      },
      tokenId: listOrder.tokenId,
      tokenAddress: listOrder.tokenAddress
    };

    return payloadDataTrade;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="max-w-content mx-auto w-full bg-base/2 py-[58px] px-6 pt-[104px] text-white md:px-12 md:pt-[133px] xl:px-16">
      <button onClick={router.back} className="mb-14 items-center">
        <div className="flex">
          <BackIcon />
          <span className="ml-[6px] font-normal text-[14px]">{titleBack}</span>
        </div>
      </button>
      <div className="flex flex-row space-x-28">
        {/* container */}
        <div className="w-[620px]">
          <div className="relative flex h-[620px] w-full items-center justify-center lg:h-[620px]  rounded-[12px] ">
            <div className="absolute h-full w-full bg-[#081824] rounded-[12px]" />
            <div
              className="z-1 absolute h-full w-full opacity-[0.3] rounded-[12px]"
              style={{ backgroundColor: rarityColor }}
            />
            <div
              className="z-2 absolute h-[372px] w-[372px] bg-cover bg-center bg-no-repeat  rounded-[12px]"
              style={{
                backgroundImage: `url(${validatedImage(assetDetails?.imageUrl)})`
              }}
            />
          </div>
          {attributes.length > 0 && (
            <div className="text-white">
              {/* list stat */}
              <div className="mt-10 mb-4 text-[18px] font-bold">
                <Trans>Attributes</Trans>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {attributes.map(({ key, val }) => {
                  return <ItemAttribution key={key} keyword={key} val={val} />;
                })}
              </div>
            </div>
          )}
        </div>
        <div className="w-[620px]">
          {/* right */}
          <div>
            {/* very top */}
            <div className="flex flex-row items-center justify-between">
              {/* first row */}
              <div className="flex flex-row items-center">
                <img src={avatar.src} className="h-[24px] w-[24px]" />
                <span className="text-light ml-[8px] text-base">
                  {assetDetails?.collectionName}
                </span>
              </div>
              <div
                className="bg-base/3 w-10 cursor-pointer rounded p-[10px]"
                onClick={() => {
                  toast('The function is not ready yet!');
                }}>
                <ShareIcon />
              </div>
            </div>
            <div className="mb-[36px] flex flex-col items-start">
              {/* detail asset */}
              <span className="mt-6 text-[28px] font-bold">{assetDetails?.name}</span>
              <div className="text-light mt-6 flex">
                <span>
                  <Trans>Token ID</Trans>: {assetDetails?.tokenId}
                </span>
                <span className="mx-6">|</span>
                <span>
                  <Trans>Owned by</Trans> {ownedBy}
                </span>
              </div>

              <div className="text-light flex gap-6">
                <div className="bg-base/3 border-base/6 mt-6 flex flex-row items-center rounded-[5px] border px-3 py-2">
                  <MintedIcon />
                  <span className="ml-[5px]">Minted: {assetDetails?.totalMintedAssets}</span>
                </div>
                <div className="bg-base/3 border-base/6 mt-6 flex flex-row items-center rounded-[5px] border px-3 py-2">
                  <OwnerAssetIcon />
                  <span className="ml-[5px]">
                    Owner: {truncateString(`${assetDetails?.owner?.ethAddress}`)}
                  </span>
                </div>
              </div>
            </div>
            {status === AssetStatus.BUY_NOW && (
              <BuyNow
                currentPrice={currentPrice?.toString()}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => {
                  onTrackingItem({ eventName: 'MKP Item Buy Now Selected' });
                  setAssetBuy({
                    name: assetDetails?.name || '',
                    price: String(currentPrice)
                  });
                  setPayloadDataTrade(formatDataTrade({ ...assetDetails }));
                  setShowPopup(true);
                }}
              />
            )}
            {status === AssetStatus.UNCONNECTED && (
              <ConnectWalletToBuy
                currentPrice={currentPrice?.toString()}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => {
                  onTrackingConnectWallet();
                  onConnectCompaign('B2C Marketplace');
                  if (loginByWalletMutation.isError) {
                    loginByWalletMutation.mutate();
                  }
                  connectL2Wallet();
                }}
              />
            )}
            {status === AssetStatus.SALE && (
              <ItemForSale
                starkKey={starkKey}
                assetDetails={assetDetails}
                setStatus={() => {
                  setShowModal(true);
                  onTrackingNoPriceItem('MKP Item Listing Selected');
                }}
                trackWithDraw={() => onTrackingNoPriceItem('MKP Item Withdrawal Selected')}
              />
            )}
            {status === AssetStatus.UNCONNECTED_NOT_SALE && <ItemNotForSale />}
            {status === AssetStatus.MODIFY && (
              <ModifyListing
                currentPrice={currentPrice?.toString()}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => {
                  onTrackingItem({ eventName: 'MKP Item Listing Modify Selected' });
                  setShowModal(true);
                }}
                setShowUnlist={() => {
                  onTrackingItem({ eventName: 'MKP Item Unlisting Selected' });
                  setShowModalUnlist(true);
                }}
              />
            )}
          </div>
          <div className="border-blue/3 border-t">
            {/* TAB */}
            <AssetDetailTab
              data={listOrder?.items}
              assetDetails={assetDetails}
              onBuyNow={handleBuyNowItem}
              etheCost={etheCost}
              isModifing={status === AssetStatus.MODIFY}
            />
          </div>
        </div>
      </div>
      <div className="mt-[64px]">
        <AssetList
          title={'More from this collection'}
          items={moreCollectionList?.items?.map((elm, index: number) => {
            const item: NFTItemType = {
              id: `${elm.id}`,
              rarity: (elm.metadata as any).rarity,
              name: elm.name || '',
              image_url: elm.imageUrl || '',
              // @ts-ignore need update sdk AssetByCollectionType
              creator: elm.creator?.name || '',
              creatorImg: avatar.src,
              priceETH: +elm.order.nonQuantizedAmountBuy // +elm... to convert string to number
            };
            return item;
          })}
        />
      </div>
      {showPopup && (
        <PurchaseModal
          open={showPopup}
          onCreate={async () => {
            onTrackingItem({ eventName: 'MKP Check Out Confirmed' });
            await handleCreateTrade(payloadDataTrade);
          }}
          onClose={() => {
            setShowPopup(false);
          }}
          onCloseMessage={() => {
            onTrackingItem({ eventName: 'MKP Check Out Canceled' });
            setShowPopup(false);
          }}
          assetBuy={assetBuy}
          setChangeStatusSuccess={() => {
            refetch();
          }}
        />
      )}
      {showModalUnlist && (
        <UnlistModal
          open={showModalUnlist}
          onClose={() => setShowModalUnlist(false)}
          onHandleUnlist={onHandleUnlist}
          onHandleCancel={() => setShowModalUnlist(false)}
        />
      )}
      <MessageModal
        isShowMessage={showWithdrawalMessage}
        setIsShowMessage={() => setShowWithdrawalMessage(false)}>
        <MessageWithdrawalNftModal onClose={() => setShowWithdrawalMessage(false)} />
      </MessageModal>
      {showMessage && (
        <MessageModal isShowMessage={showMessage} setIsShowMessage={() => setShowMessage(false)}>
          <MessagePurchaseModal />
        </MessageModal>
      )}
      {showMessageEdit && (
        <MessageModal
          isShowMessage={showMessageEdit}
          setIsShowMessage={() => setShowMessageEdit(false)}>
          <MessageEditListingModal />
        </MessageModal>
      )}
      {showModal && (
        <ModalEditListing
          status={status}
          onSubmit={status === AssetStatus.MODIFY ? onSubmitModifyOrder : onSubmitCreateOrder}
          items={assetDetails}
          ethereum={etheCost}
          imgSrc={assetDetails?.imageUrl}
          open={showModal}
          onClose={handleCloseModal}
        />
      )}
      {showMessageModify.isShow && (
        <MessageModal
          isShowMessage={showMessageModify.isShow}
          setIsShowMessage={() => setShowMessageModify({ ...showMessageModify, isShow: false })}>
          <MessageListingPriceModal price={showMessageModify.newPrice} />
        </MessageModal>
      )}
      {showMessageUnlist && (
        <MessageModal
          isShowMessage={showMessageUnlist}
          setIsShowMessage={() => setShowMessageUnlist(false)}>
          <MessageUnlist />
        </MessageModal>
      )}
      {isShowLearnMore && (
        <LearnMoreWithdrawNFTModal
          open={isShowLearnMore}
          onClose={() => {
            handleLearnMore(false);
            const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
            triggerWithdraw?.click();
          }}
        />
      )}
    </div>
  );
}

const ItemForSale: React.FC<IProp & { trackWithDraw?: () => void }> = ({
  setStatus,
  starkKey,
  assetDetails,
  trackWithDraw
}) => {
  const { isWithdrawing, handleSetValueNFT } = useWithDrawNFTContext();

  const handleWithdraw = async () => {
    handleSetValueNFT(assetDetails);
    const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
    triggerWithdraw?.click();
    trackWithDraw?.();
  };

  return (
    <div className="mb-[48px]">
      <div>
        <span className="text-light mt-[36px] mb-[16px] text-[18px]">
          <Trans>Market Status</Trans>
        </span>
        <div className="mt-[20px] flex flex-row items-center">
          <span className="text-[28px] font-bold">
            <Trans>Not for Sale</Trans>
          </span>
        </div>
      </div>
      {starkKey === assetDetails?.owner?.starkKey && (
        <>
          {assetDetails?.status == 'WITHDRAWING' && isWithdrawing ? (
            <>
              <button
                disabled
                className="btn-disabled mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold">
                <Trans>LIST ITEM FOR SALE</Trans>
              </button>
              <button className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white">
                <Trans>WITHDRAWAL IN PROGRESS</Trans>
              </button>
            </>
          ) : assetDetails?.status == 'WITHDRAWAL_COMPLETED' ? (
            <>
              <button className="my-[10px] flex h-[56px] w-full items-center justify-center rounded-[8px] border text-[16px] font-bold text-white">
                <Trans>WITHDRAW COMPLETED</Trans>
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
                onClick={setStatus}>
                <Trans>LIST ITEM FOR SALE</Trans>
              </button>
              <button
                className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white"
                onClick={handleWithdraw}>
                <Trans>WITHDRAW</Trans>
              </button>
            </>
          )}
        </>
      )}
      <span className="text-light mt-[10px] text-[14px]">
        <Trans>Assets remain in your wallet when you list on Myria Marketplace</Trans>
      </span>
    </div>
  );
};

const ItemNotForSale: React.FC<IProp> = ({}) => {
  return (
    <div className="mb-[48px]">
      <div>
        <span className="text-light mt-[36px] mb-[16px] text-[18px]">
          <Trans>Market Status</Trans>
        </span>
        <div className="mt-[20px] flex flex-row items-center">
          <span className="text-[28px] font-bold">
            <Trans>Not for Sale</Trans>
          </span>
        </div>
      </div>
    </div>
  );
};

const ModifyListing: React.FC<IProp> = ({
  currentPrice,
  currentUSDPrice,
  setStatus,
  setShowUnlist
}) => {
  return (
    <div className="mb-[48px]">
      <div>
        <span className="text-light mt-[36px] mb-[16px] text-[18px]">
          <Trans>Current price</Trans>
        </span>
        <div className="flex flex-row items-center">
          <DAOIcon className="mr-[8px]" />
          <span className="text-[28px] font-bold">{currentPrice}</span>
          <span className="text-light mb-[5px] ml-2 self-end text-[14px]">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
        onClick={setStatus}>
        <Trans>MODIFY LISTING</Trans>
      </button>
      <button
        className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white"
        onClick={setShowUnlist}>
        <Trans>UNLIST THIS ITEM</Trans>
      </button>
    </div>
  );
};

const BuyNow: React.FC<IProp> = ({ currentPrice, currentUSDPrice, setStatus }) => {
  return (
    <div className="mb-[48px]">
      <div>
        <span className="text-light mt-[36px] mb-[16px] text-[18px]">
          <Trans>Current price</Trans>
        </span>
        <div className="flex flex-row items-center">
          <DAOIcon className="mr-[8px]" />
          <span className="text-[28px] font-bold">{currentPrice}</span>
          <span className="text-light mb-[5px] ml-2 self-end text-[14px]">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
        onClick={setStatus}>
        <Trans>BUY NOW</Trans>
      </button>
    </div>
  );
};

const ConnectWalletToBuy: React.FC<IProp> = ({ currentPrice, currentUSDPrice, setStatus }) => {
  return (
    <div className="mb-[48px]">
      <div>
        <span className="text-light mt-[36px] mb-[16px] text-[18px]">
          <Trans>Current price</Trans>
        </span>
        <div className="flex flex-row items-center">
          <DAOIcon className="mr-[8px]" />
          <span className="text-[28px] font-bold">{currentPrice}</span>
          <span className="text-light mb-[5px] ml-1 self-end text-[14px]">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
        onClick={setStatus}>
        <Trans>Connect Wallet To Buy</Trans>
      </button>
    </div>
  );
};

const UnlistModal: React.FC<any> = ({ open, onClose, onHandleCancel, onHandleUnlist }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={'Unlist Your NFT?'} className="mt-0 shadow-[0_0_40px_10px_#0000004D]">
        <UnlistModalContent onHandleCancel={onHandleCancel} onHandleUnlist={onHandleUnlist} />
      </Modal.Content>
    </Modal>
  );
};

const LearnMoreWithdrawNFTModal: React.FC<any> = ({ open, onClose }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={'Learn More'} className="mt-0 shadow-[0_0_40px_10px_#0000004D]">
        <LearnMoreWithdrawNFT />
      </Modal.Content>
    </Modal>
  );
};

export default AssetDetails;
