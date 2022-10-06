import { Trans } from '@lingui/macro';
import lodash from 'lodash';
import {
  AssetDetailsResponse,
  CreateOrderEntity,
  FeeType,
  SignableOrderInput,
  TradesRequestTypes
} from 'myria-core-sdk';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import ArrowUpIcon from 'src/components/icons/ArrowUpIcon';
import BackIcon from 'src/components/icons/BackIcon';
import DAOIcon from 'src/components/icons/DAOIcon';
import MintedIcon from 'src/components/icons/MintedIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import { Loading } from 'src/components/Loading';
import Modal from 'src/components/Modal';
import Tooltip from 'src/components/Tooltip';
import { useWalletContext } from 'src/context/wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import truncateString from 'src/helper';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { TokenType } from 'src/packages/l2-wallet/src/common/type';
import { CompletedIcon, ProgressIcon } from 'src/packages/l2-wallet/src/components/Icons';
import { StatusWithdrawNFT } from 'src/types/marketplace';
import { formatNumber2digits, formatPrice, getRarityColor, validatedImageAssets } from 'src/utils';
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
import { collectionModule } from 'src/services/myriaCore';
import { useL2WalletContext } from 'src/context/l2-wallet';
import ShareAssetDetailModal from 'src/components/ShareAssetDetailModal';
import MessageCopyModal from '../MessageModal/MessageCopyModal';
import BottomSheet from '../MobileView/BottomSheet';
import ShareMobile from '../MobileView/ShareMobile';
import useCheckMobileView from 'src/hooks/useCheckMobileView';
import SorryActionMobile from '../MobileView/SorryActionMobile';

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
  onShowPopover?: any;
}

export enum AssetStatus {
  BUY_NOW,
  SALE,
  MODIFY,
  UNCONNECTED,
  UNCONNECTED_NOT_SALE
}

export enum WithDrawStatus {
  MINTED = 'MINTED',
  PENDING = 'WITHDRAWING',
  COMPLETED = 'WITHDRAWAL_COMPLETED'
}
const QUANTUM = '10000000000';
const INTERVAL_DURATION = 2 * 60 * 1000;

const ItemAttribution = ({ keyword = 'RARITY', val = 'Ultra Rare' }) => {
  return (
    <div className="border-base/6 bg-base/3 rounded-lg border p-4 text-center">
      <p className="text-blue/6 text-xs font-normal uppercase">{keyword}</p>
      <Tooltip>
        <Tooltip.Trigger asChild className="cursor-pointer focus:outline-none">
          <p className="line-clamp-1 break-words text-sm font-medium">{val}</p>
        </Tooltip.Trigger>
        <Tooltip.Content side="top" className="bg-base/3  mt-[-4px] max-w-[256px]">
          <p className="text-base/9">
            <Trans>{val}</Trans>
          </p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
};

function AssetDetails({ id }: Props) {
  const router = useRouter();
  const { isMobile } = useCheckMobileView();
  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', +id],
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const assetModule = moduleFactory.getAssetOnchainManager();
      const [assetDetails, listOrder] = await Promise.all([
        assetModule?.getAssetById(id), //getAssetDetail by assetId
        assetModule?.getAssetEqualMetadataById({ assetId: +id }) //getListOrder by assetId
      ]);
      handleSetValueNFT({ ...assetDetails?.data, name: 'Sigil NFT' });
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
  const { connectL2Wallet, handleSetFirstPurchase, handleDisplayPopoverWithdrawNFT } =
    useL2WalletContext();

  const assetDetails = data?.assetDetails;

  const collectionID = data?.assetDetails?.collectionId;

  const {
    data: collection,
    isLoading: collectionLoading,
    refetch: collectionRefetch
  } = useQuery(
    ['collectionDetail'],
    async () => {
      const collectionID = assetDetails?.collectionId;
      if (collectionID) {
        const result: any = await collectionModule?.getCollectionById(collectionID);
        return { ...result?.data };
      } else return null;
    },
    {
      enabled: !!collectionID
    }
  );

  const ownedBy = useMemo(() => {
    if (assetDetails?.owner?.starkKey == starkKey) {
      return <Trans>You</Trans>;
    }
    return truncateString(`${assetDetails?.owner?.starkKey}`);
  }, [assetDetails?.owner?.starkKey, starkKey]);
  const listOrder = useMemo(() => data?.listOrder, [data?.listOrder]);
  const titleBack = useMemo(() => {
    const result = router?.asPath.includes('inventory') ? (
      <span>
        <Trans>BACK TO INVENTORY</Trans>
      </span>
    ) : (
      <span>
        <Trans>BACK</Trans>
      </span>
    );
    return result;
  }, [router]);

  const { data: moreCollectionList } = useQuery(
    ['moreCollection', assetDetails?.collectionId],
    async () => {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const collectionModule = moduleFactory.getCollectionManager();
      // more from this Collection (status:'FOR_SALE')
      const res = await collectionModule?.getAssetByCollectionId({
        assetType: 'FOR_SALE',
        collectionId: Number(assetDetails?.collectionId)
      });
      console.log('Response ->', res);
      // get only 4 elements
      let counter = 0;
      return res?.data.items.filter((item: any, index: number) => {
        if (counter > 4) return;
        return item.id != assetDetails?.id && counter++;
      });
    },
    {
      enabled: !!assetDetails?.collectionId //dependence by assetDetails?.collectionId
    }
  );

  const attributes = useMemo(() => {
    const resultArray: any[] = [];
    if (assetDetails && !lodash.isEmpty(assetDetails.metadata)) {
      lodash.map(assetDetails?.metadata, (val, key) => {
        if (!key.toLowerCase().includes('url') && !key.toLowerCase().includes('description')) {
          resultArray.push({ key, val }); // remove all key what has 'url'.
        }
      });
    } else {
      // @ts-ignore
      lodash.map(assetDetails?.metadataOptional?.attributes, (val, key) => {
        const metadataOptionalAttributes = Object.values(val);
        resultArray.push({
          key: metadataOptionalAttributes?.[1],
          val: metadataOptionalAttributes?.[0]
        });
      });
    }
    return resultArray;
  }, [assetDetails?.metadata]);
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
  const [showMessageCopied, setShowMessageCopied] = useState(false);
  const [openShareMobile, setOpenShareMobile] = useState(false);
  const [openSorryMobile, setOpenSorryMobile] = useState(false);
  const [payloadDataTrade, setPayloadDataTrade] = useState({});

  const [showShareModal, setShowShareModal] = useState(false);

  const { data: etheCost = 0 } = useEtheriumPrice();
  const { address, onConnectCompaign } = useWalletContext();
  const { loginByWalletMutation } = useAuthenticationContext();
  // wait update sdk
  const bgImage = assetDetails?.metadata ? (assetDetails?.metadata as any)?.rarity : 'Common';
  const rarityColor = getRarityColor(bgImage);
  const {
    status: withdrawalStatus,
    setStatus: setWithdrawalStatus,
    handleSetValueNFT
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
    const orderModule = moduleFactory.getOrderManager();
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

      const orderModule = moduleFactory.getOrderManager();
      if (!address || !assetDetails) return;
      const signableFee =
        (assetDetails.fee && assetDetails?.fee?.length) > 0
          ? [
              {
                address: assetDetails?.fee[0].address,
                percentage: assetDetails?.fee[0].percentage,
                feeType: FeeType.ROYALTY
              }
            ]
          : undefined;

      const payload: SignableOrderInput = {
        orderType: 'SELL',
        ethAddress: address,
        assetRefId: parseInt(id, 10),
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
        includeFees: signableFee ? true : false,
        fees: signableFee
      };
      const signature = await orderModule?.signableOrder(payload);
      const feeSign = signature?.feeInfo
        ? {
            feeLimit: signature?.feeInfo?.feeLimit,
            feeToken: signature?.feeInfo?.assetId,
            feeVaultId: signature?.feeInfo?.sourceVaultId
          }
        : undefined;

      const feeData = signature?.feeInfo
        ? [
            {
              feeType: FeeType.ROYALTY,
              percentage: assetDetails?.fee[0].percentage,
              address: address
            }
          ]
        : undefined;

      if (signature) {
        const paramCreateOrder: CreateOrderEntity = {
          assetRefId: parseInt(id, 10),
          orderType: 'SELL',
          feeSign: feeSign,
          includeFees: feeData ? true : false,
          amountSell: signature.amountSell,
          amountBuy: signature.amountBuy,
          sellerStarkKey: starkKey,
          vaultIdSell: signature.vaultIdSell,
          vaultIdBuy: signature.vaultIdBuy,
          sellerAddress: address,
          assetIdBuy: signature.assetIdBuy,
          assetIdSell: signature.assetIdSell,
          fees: feeData
        };
        console.log('CreateOrderParams -> ', paramCreateOrder);
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

      if (balance > 0) {
        if (
          withdrawalStatus != StatusWithdrawNFT.COMPLETED &&
          withdrawalStatus !== StatusWithdrawNFT.FAILED
        ) {
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

    const orderModule = moduleFactory.getOrderManager();
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
    const orderModule = moduleFactory.getOrderManager();
    const tradeModule = moduleFactory.getTradeManager();

    if (!address || !tradeData?.order.orderId || !assetDetails) return;

    try {
      const signableFee =
        (assetDetails?.fee && assetDetails?.fee?.length) > 0
          ? [
              {
                address: assetDetails?.fee[0].address,
                percentage: assetDetails?.fee[0].percentage,
                feeType: FeeType.ROYALTY
              }
            ]
          : undefined;

      // const totalQuantizedAmount = convertAmountToQuantizedAmount(
      //   assetDetails?.order.nonQuantizedAmountBuy
      // );

      const signableOrderInput: SignableOrderInput = {
        orderType: 'BUY',
        ethAddress: address,
        assetRefId: assetDetails.id,
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
        includeFees: signableFee ? true : false,
        fees: signableFee
      };
      console.log('Before Signable Order -> ', signableOrderInput);
      const signableOrder = await orderModule?.signableOrder(signableOrderInput);
      console.log('Signable Order -> ', signableOrder);

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
        includeFees: signableFee ? true : false,
        feeInfo: [
          {
            feeLimit: signableOrder?.feeInfo?.feeLimit || '',
            assetId: signableOrder?.feeInfo?.assetId || '',
            sourceVaultId: Number(signableOrder?.feeInfo?.sourceVaultId)
          }
        ]
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

  const handleWithdraw = async () => {
    handleSetValueNFT(assetDetails);
    handleDisplayPopoverWithdrawNFT(true);
    onTrackingNoPriceItem('MKP Item Withdrawal Selected');
  };

  const withDrawStatus = (status: string | boolean | undefined) => {
    switch (status) {
      case WithDrawStatus.PENDING:
        return {
          icon: (
            <ProgressIcon size={18} isNotAnimate={true} className="text-blue/6 " strokeWidth="5" />
          ),
          tooltipContent: 'Withdrawal in progress'
        };
      case WithDrawStatus.COMPLETED:
        return {
          icon: <CompletedIcon className="text-gray/6" />,
          tooltipContent: 'Withdrawal complete'
        };

      default:
        return {
          icon: <ArrowUpIcon />,
          tooltipContent: 'Withdraw this NFT to L1 wallet'
        };
    }
  };

  const formatDataTrade = (listOrder: any) => {
    const isOrder = Array.isArray(listOrder.order);
    const payloadDataTrade = {
      order: {
        orderId: isOrder ? listOrder?.order[0].id : listOrder?.order.orderId,
        amountSell: isOrder
          ? listOrder?.order[0].nonQuantizedAmountSell
          : listOrder?.order.nonQuantizedAmountSell,
        amountBuy: isOrder
          ? listOrder?.order[0].nonQuantizedAmountBuy
          : listOrder?.order.nonQuantizedAmountBuy
      },
      tokenId: listOrder.tokenId,
      tokenAddress: listOrder.tokenAddress
    };

    return payloadDataTrade;
  };

  const back = () => {
    if (sessionStorage.getItem('prevPath')) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="max-w-content bg-base/2 mx-auto w-full py-[58px]  pt-[104px] text-white md:pt-[133px] px-6 lg:px-0">
      <button
        onClick={() => {
          back();
        }}
        className="mb-9 lg:mb-14 items-center">
        <div className="flex items-center">
          <BackIcon />
          <span className="ml-[6px] text-sm font-normal leading-[17px]">{titleBack}</span>
        </div>
      </button>
      <div className="flex-row gap-[104px] lg:flex">
        {/* container */}
        <div className="w-[620px]">
          <div className="relative flex h-[620px] w-full items-center justify-center rounded-[12px]  lg:h-[620px] ">
            <div
              className="z-2 absolute h-full w-full max-w-[620px] max-h-[620px] rounded-[12px] bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url(${validatedImageAssets(
                  assetDetails?.imageUrl,
                  assetDetails
                )})`
              }}
            />
          </div>
        </div>
        <div className="lg:w-[540px] w-full mt-6 lg:mt-0">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <img src={avatar.src} className="h-[24px] w-[24px]" />
              <Link href={`/marketplace/collection/?id=${collection?.publicId}`}>
                <span className="text-light ml-2 cursor-pointer text-base">
                  {assetDetails?.creator?.name}
                </span>
              </Link>
            </div>
            <div className="flex gap-x-6 ">
              {status === AssetStatus.SALE && starkKey === assetDetails?.owner?.starkKey && (
                <Tooltip>
                  <Tooltip.Trigger
                    asChild
                    className="hover:bg-base/5 cursor-pointer focus:outline-none ">
                    <div
                      className="bg-base/3 flex h-10 w-10 cursor-pointer items-center justify-center rounded"
                      onClick={() => {
                        assetDetails?.status === WithDrawStatus.MINTED && handleWithdraw();
                      }}>
                      {withDrawStatus(assetDetails?.status)?.icon}
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="top" className="bg-base/3  mt-[-4px] max-w-[256px]">
                    <Tooltip.Arrow className="fill-base/3 " width={16} height={8} />
                    <p className="text-base/9">
                      <Trans> {withDrawStatus(assetDetails?.status)?.tooltipContent}</Trans>
                    </p>
                  </Tooltip.Content>
                </Tooltip>
              )}
              <div
                className="w-10 p-3 rounded cursor-pointer bg-base/3"
                onClick={() => {
                  isMobile ? setOpenShareMobile(!openShareMobile) : setShowShareModal(true);
                }}>
                <ShareIcon />
                <BottomSheet
                  open={openShareMobile}
                  setOpen={setOpenShareMobile}
                  snapPoints={[280, 0]}>
                  <div className="flex h-full flex-col">
                    <ShareMobile onCloseModal={() => setOpenShareMobile(false)} />
                  </div>
                </BottomSheet>
              </div>
            </div>
          </div>
          <div className="mb-9 flex flex-col items-start">
            {/* detail asset */}
            <span className="mt-6 text-[28px] font-bold">{assetDetails?.name}</span>
            <div className="text-light mt-6 flex text-sm font-normal">
              <span>
                <Trans>Token ID</Trans>: {assetDetails?.tokenId}
              </span>
              <span className="mx-6">|</span>
              <span>
                <Trans>Owned by</Trans> {ownedBy}
              </span>
            </div>
            <div className="bg-base/3 border-base/6 text-light mt-6 flex flex-row items-center rounded-[5px] border px-3 py-2 text-sm font-normal">
              <MintedIcon />
              <span className="ml-[5px]">Minted: {assetDetails?.totalMintedAssets}</span>
            </div>
          </div>
          {status === AssetStatus.BUY_NOW && (
            <BuyNow
              currentPrice={currentPrice?.toString()}
              currentUSDPrice={currentUSDPrice}
              setStatus={() => {
                if (isMobile) {
                  setOpenSorryMobile(!openSorryMobile);
                } else {
                  onTrackingItem({ eventName: 'MKP Item Buy Now Selected' });
                  setAssetBuy({
                    name: assetDetails?.name || '',
                    price: String(currentPrice)
                  });
                  setPayloadDataTrade(formatDataTrade({ ...assetDetails }));
                  setShowPopup(true);
                }
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
                // handle if the first purchase
                handleSetFirstPurchase(true);
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
              onShowPopover={() => handleDisplayPopoverWithdrawNFT(true)}
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
          <BottomSheet open={openSorryMobile} setOpen={setOpenSorryMobile} snapPoints={[280, 0]}>
            <SorryActionMobile onCloseModal={() => setOpenSorryMobile(false)} />
          </BottomSheet>
        </div>
        {attributes.length > 0 && (
          <div className="text-white lg:hidden">
            {/* list stat */}
            <div className="mt-10 mb-4 text-lg font-bold">
              <Trans>Attributes</Trans>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {attributes.map(({ key, val }) => {
                return <ItemAttribution key={key} keyword={key} val={val} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 lg:mt-16">
        <AssetList
          title={'More from this collection'}
          items={moreCollectionList?.map((elm: any) => {
            const item: NFTItemType = {
              id: `${elm.id}`,
              collection: {
                ...elm.collection, // api hasn't response this field yet. Keep any to not get error currently.
                name: assetDetails?.collectionName
              },
              rarity: (elm.metadata as any).rarity,
              name: elm.name || '',
              image_url: elm.imageUrl || elm?.metadataOptional?.image || '',
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
            setShowMessage(true);
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
          assetName={assetDetails?.name}
        />
      )}
      <MessageModal
        isShowMessage={showWithdrawalMessage}
        setIsShowMessage={() => setShowWithdrawalMessage(false)}>
        <MessageWithdrawalNftModal onClose={() => setShowWithdrawalMessage(false)} />
      </MessageModal>
      {showMessage && (
        <MessageModal isShowMessage={showMessage} setIsShowMessage={() => setShowMessage(false)}>
          <MessagePurchaseModal
            assetName={assetDetails?.name}
            onClose={() => setShowMessage(false)}
          />
        </MessageModal>
      )}
      {showMessageEdit && (
        <MessageModal
          isShowMessage={showMessageEdit}
          setIsShowMessage={() => setShowMessageEdit(false)}>
          <MessageEditListingModal
            assetName={assetDetails?.name}
            onClose={() => setShowMessageEdit(false)}
          />
        </MessageModal>
      )}
      {showModal && (
        <ModalEditListing
          status={status}
          onSubmit={status === AssetStatus.MODIFY ? onSubmitModifyOrder : onSubmitCreateOrder}
          items={assetDetails}
          ethereum={etheCost}
          imgSrc={validatedImageAssets(assetDetails?.imageUrl, assetDetails)}
          open={showModal}
          onClose={handleCloseModal}
          rarityColor={rarityColor}
        />
      )}
      {showMessageModify.isShow && (
        <MessageModal
          isShowMessage={showMessageModify.isShow}
          setIsShowMessage={() => setShowMessageModify({ ...showMessageModify, isShow: false })}>
          <MessageListingPriceModal
            price={showMessageModify.newPrice}
            assetName={assetDetails?.name}
          />
        </MessageModal>
      )}
      {showMessageUnlist && (
        <MessageModal
          isShowMessage={showMessageUnlist}
          setIsShowMessage={() => setShowMessageUnlist(false)}>
          <MessageUnlist assetName={assetDetails?.name} />
        </MessageModal>
      )}
      <ShareAssetDetailModal
        open={showShareModal}
        onClose={() => {
          setShowShareModal(false);
        }}
        onShowMessageCopied={() => setShowMessageCopied(true)}
      />
      {showMessageCopied && (
        <MessageModal
          isShowMessage={showMessageCopied}
          setIsShowMessage={() => setShowMessageCopied(false)}>
          <MessageCopyModal />
        </MessageModal>
      )}
    </div>
  );
}

const ItemForSale: React.FC<IProp & { trackWithDraw?: () => void }> = ({
  setStatus,
  starkKey,
  assetDetails
}) => {
  return (
    <div className="mb-12">
      <div>
        <span className="text-light mt-9 mb-4 text-lg">
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
          {assetDetails?.status == WithDrawStatus.PENDING ? (
            <>
              <div className="btn-disabled mb-[10px] mt-[40px] flex h-[56px] w-full items-center justify-center rounded-[8px] text-[16px] font-bold">
                <Trans>WITHDRAWAL IN PROGRESS</Trans>
              </div>
            </>
          ) : assetDetails?.status == WithDrawStatus.COMPLETED ? (
            <>
              <div className="btn-disabled mb-[10px] mt-[40px] flex h-[56px] w-full items-center justify-center rounded-[8px] text-[16px] font-bold">
                <Trans>WITHDRAW COMPLETED</Trans>
              </div>
            </>
          ) : (
            <>
              <button
                className="bg-primary/6 text-base/1 mb-[10px] mt-10 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg text-base font-bold"
                onClick={setStatus}>
                <Trans>LIST ITEM FOR SALE</Trans>
              </button>
            </>
          )}
        </>
      )}
      <span className="text-light mt-[10px] text-sm">
        <Trans>Assets remain in your wallet when you list them on Myria Marketplace</Trans>
      </span>
    </div>
  );
};

const ItemNotForSale: React.FC<IProp> = ({}) => {
  return (
    <div className="mb-12">
      <div>
        <span className="text-light mt-9 mb-4 text-lg">
          <Trans>Market Status</Trans>
        </span>
        <div className="mt-5 flex flex-row items-center">
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
    <div className="mb-12">
      <div>
        <span className="text-light mt-9 mb-4 text-lg">
          <Trans>Current price</Trans>
        </span>
        <div className="flex flex-row items-center">
          <DAOIcon className="mr-2" />
          <span className="text-[28px] font-bold">{currentPrice}</span>
          <span className="text-light mb-[5px] ml-2 self-end text-sm">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-10 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg text-base font-bold"
        onClick={setStatus}>
        <Trans>MODIFY LISTING</Trans>
      </button>
      <button
        className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-lg border text-base font-bold text-white"
        onClick={setShowUnlist}>
        <Trans>UNLIST THIS ITEM</Trans>
      </button>
    </div>
  );
};

const BuyNow: React.FC<IProp> = ({ currentPrice, currentUSDPrice, setStatus }) => {
  return (
    <div className="mb-12">
      <div>
        <span className="text-light mt-9 mb-4 text-lg">
          <Trans>Current price</Trans>
        </span>
        <div className="flex flex-row items-center">
          <DAOIcon className="mr-2" />
          <span className="text-[28px] font-bold">{currentPrice}</span>
          <span className="text-light mb-[5px] ml-2 self-end text-sm">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-6 lg:mt-10 flex h-12 lg:h-14 w-full cursor-pointer items-center justify-center rounded-lg text-base font-bold"
        onClick={setStatus}>
        <Trans>BUY NOW</Trans>
      </button>
    </div>
  );
};

const ConnectWalletToBuy: React.FC<IProp> = ({ currentPrice, currentUSDPrice, setStatus }) => {
  return (
    <div className="mb-12">
      <div>
        <span className="text-light mt-9 mb-4 text-lg">
          <Trans>Current price</Trans>
        </span>
        <div className="flex flex-row items-center">
          <DAOIcon className="mr-2" />
          <span className="text-[28px] font-bold">{currentPrice}</span>
          <span className="text-light mb-[5px] ml-1 self-end text-sm">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-10 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg text-base font-bold"
        onClick={setStatus}>
        <Trans>Connect Wallet To Buy</Trans>
      </button>
    </div>
  );
};

const UnlistModal: React.FC<any> = ({
  open,
  onClose,
  onHandleCancel,
  onHandleUnlist,
  assetName
}) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={'Unlist Your NFT?'} className="mt-0 shadow-[0_0_40px_10px_#0000004D]">
        <UnlistModalContent
          onHandleCancel={onHandleCancel}
          onHandleUnlist={onHandleUnlist}
          assetName={assetName}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AssetDetails;
