import { Trans } from '@lingui/macro';
import lodash from 'lodash';
import { IMyriaClient, Modules, MyriaClient } from 'myria-core-sdk';
import {
  CreateOrderEntity,
  SignableOrderInput
} from 'myria-core-sdk/dist/types/src/types/OrderTypes';
import { TradesRequestTypes } from 'myria-core-sdk/dist/types/src/types/TradesTypes';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DAOIcon from 'src/components/icons/DAOIcon';
import MintedIcon from 'src/components/icons/MintedIcon';
import OwnerAssetIcon from 'src/components/icons/OwnerAssetIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import { Loading } from 'src/components/Loading';
import Modal from 'src/components/Modal';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { TokenType } from 'src/packages/l2-wallet/src/common/type';
import { formatNumber2digits, validatedImage } from 'src/utils';
import AssetList from '../AssetList';
import MessageListingPriceModal from '../MessageModal/MessageListingPrice';
import MessageModal from '../MessageModal/MessageModal';
import MessagePurchaseModal from '../MessageModal/MessagePurchaseModal';
import MessageUnlist from '../MessageModal/MessageUnlist';
import { MessageEditListingModal, ModalEditListing } from '../Modals';
import UnlistModalContent from '../Modals/UnlistModal';
import { NFTItemType } from '../NftItem/type';
import AssetDetailTab from './AssetDetailTab';
import PurchaseModal from './PurchaseModal';
import testavatarImg from './testavatar.png';
import BackIcon from 'src/components/icons/BackIcon';
import Link from 'next/link';
interface Props {
  id: string;
}

interface IProp {
  currentPrice?: string;
  currentUSDPrice?: string;
  setStatus?: () => void;
  starkKey?: string;
  assetDetails?: any;
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

const ItemAttribution = ({ keyword = 'RARITY', val = 'Ultra Rare' }) => {
  return (
    <div className="border-base/6 bg-base/3 rounded-[8px] border py-4 text-center">
      <p className="text-blue/6 uppercase">{keyword}</p>
      <p className="font-medium">{val}</p>
    </div>
  );
};

function AssetDetails({ id }: Props) {
  const { data, isLoading, refetch } = useQuery(
    ['assetDetail', id],
    async () => {
      const client: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
        web3: window.web3
      };
      const myriaClient = new MyriaClient(client);
      const moduleFactory = new Modules.ModuleFactory(myriaClient);
      const assetModule = moduleFactory.getAssetModule();
      const [assetDetails, listOrder] = await Promise.all([
        assetModule?.getAssetById(id), //getAssetDetail by assetId
        assetModule?.getAssetEqualMetadataById({ assetId: +id }) //getListOrder by assetId
      ]);
      return { assetDetails: assetDetails?.data, listOrder: listOrder?.data };
    },
    {
      enabled: !!id
    }
  );

  const assetDetails = useMemo(() => data?.assetDetails, [data?.assetDetails]);
  const listOrder = useMemo(() => data?.listOrder, [data?.listOrder]);

  const { data: moreCollectionList } = useQuery(
    ['moreCollection', assetDetails?.collectionId],
    async () => {
      const client: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
        web3: window.web3
      };

      const myriaClient = new MyriaClient(client);
      const moduleFactory = new Modules.ModuleFactory(myriaClient);
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

  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = `0x${starkKeyUser}`;
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

  const currentPrice = useMemo(() => {
    return formatNumber2digits(Number(assetDetails?.order?.amountBuy));
  }, [assetDetails?.order]);

  const [status, setStatus] = useState<AssetStatus>(AssetStatus.UNCONNECTED);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageEdit, setShowMessageEdit] = useState(false);
  const [showModalUnlist, setShowModalUnlist] = useState(false);
  const [showMessageModify, setShowMessageModify] = useState(false);
  const [showMessageUnlist, setShowMessageUnlist] = useState(false);
  const { data: etheCost = 0 } = useEtheriumPrice();
  const { address, onConnect } = useWalletContext();
  const [assetBuy, setAssetBuy] = useState<{
    name: string;
    price: string;
  }>({
    name: '',
    price: ''
  });

  const currentUSDPrice = useMemo(
    () => formatNumber2digits(Number(assetDetails?.order?.amountBuy) * etheCost),
    [assetDetails?.order?.amountBuy, etheCost]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal((showModal) => !showModal);
  }, [setShowModal]);
  const onSubmitModifyOrder = async ({ price }: { price: string }) => {
    const client: IMyriaClient = {
      provider: window.web3.currentProvider,
      networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
      web3: window.web3
    };

    const myriaClient = new MyriaClient(client);
    const moduleFactory = new Modules.ModuleFactory(myriaClient);
    const orderModule = moduleFactory.getOrderModule();
    if (!address) return;
    const result = await orderModule?.updateOrderPrice(assetDetails?.order.orderId + '', {
      newAmountBuy: price,
      sellerStarkKey: starkKey,
      sellerWalletAddress: address
    });
    if (result) {
      setShowMessageModify(true);
    }
  };
  const onSubmitCreateOrder = useCallback(
    async ({ price }) => {
      const client: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
        web3: window.web3
      };

      const myriaClient = new MyriaClient(client);
      const moduleFactory = new Modules.ModuleFactory(myriaClient);
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
        amountSell: price + '',
        tokenBuy: {
          type: TokenType.ETH,
          data: {
            quantum: QUANTUM
          }
        },
        amountBuy: '1',
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
          refetch();
        }
      }
    },
    [address, assetDetails?.tokenAddress, assetDetails?.tokenId, id, refetch, starkKey]
  );

  useEffect(() => {
    let currentStatus: number = AssetStatus.UNCONNECTED;
    if (assetDetails?.order) {
      // item for sale
      if (starkKey === assetDetails?.owner?.starkKey) {
        currentStatus = AssetStatus.MODIFY; // connected and own NFT
      } else {
        currentStatus = AssetStatus.BUY_NOW; // connected and not own NFT
      }
      if (!(address && address?.length > 0)) {
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
    const client: IMyriaClient = {
      provider: window.web3.currentProvider,
      networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
      web3: window.web3
    };

    const myriaClient = new MyriaClient(client);
    const moduleFactory = new Modules.ModuleFactory(myriaClient);
    const orderModule = moduleFactory.getOrderModule();
    if (!address || !assetDetails?.order.orderId) return;
    const result = await orderModule?.deleteOrderById({
      orderId: assetDetails?.order.orderId,
      sellerWalletAddress: address
    });
    if (result) {
      setStatus(AssetStatus.SALE);
      setShowModalUnlist(false);
      setShowMessageUnlist(true);
      refetch();
    }
  };

  const handleCreateTrade = async (tradeData: any) => {
    const client: IMyriaClient = {
      provider: window.web3.currentProvider,
      networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
      web3: window.web3
    };

    const myriaClient = new MyriaClient(client);
    const moduleFactory = new Modules.ModuleFactory(myriaClient);
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
      price: formatNumber2digits(Number(data?.order[0]?.amountBuy))
    });
    setShowPopup(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }
  const propsConfirmPriceModal =
    status === AssetStatus.MODIFY
      ? {
          title: 'Modify Listing',
          titleConfirm: 'CONFIRMING CHANGE',
          labelInput: 'Listing Price'
        }
      : {
          title: 'List your item for sale',
          titleConfirm: 'CONFIRMING YOUR LISTING',
          labelInput: 'Listing Price'
        };
  return (
    <div className="w-full bg-[#050E15] py-[58px] px-6 pt-[104px] text-white md:px-12 md:pt-[133px] xl:px-16">
      <div className="w-full flex flex-row max-w-content mx-auto mb-14">
        <BackIcon />
        <Link href={`/marketplace`}>
          <a href={`/marketplace`}>
            <span className="ml-[6px] font-normal text-[14px]">
              <Trans>BACK TO MYRIAVERSE COLLECTION</Trans>
            </span>
          </a>
        </Link>
      </div>
      <div className="max-w-content mx-auto  flex flex-row space-x-28">
        {/* container */}
        <div className="w-[620px]">
          {/* left */}
          <div
            className=" border-base/5 h-[620px]  w-full
          rounded-[3px] border-[3px] bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${validatedImage(assetDetails?.imageUrl)})` }}
          >
            {/* img */}
          </div>
          {attributes.length > 0 && (
            <div className="text-white">
              {/* list stat */}
              <div className="mt-[40px] mb-[16px] text-[18px] font-bold">
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
                <img src={testavatarImg.src} className="h-[24px] w-[24px]" />
                <span className="ml-[8px] text-[16px] text-light">
                  {assetDetails?.collectionName}
                </span>
              </div>
              <div
                className="w-[40px] p-[10px] bg-base/3 rounded cursor-pointer"
                onClick={() => {
                  toast('The function is not ready yet!');
                }}
              >
                <ShareIcon />
              </div>
            </div>
            <div className="mb-[36px] flex flex-col items-start">
              {/* detail asset */}
              <span className="mt-[24px] text-[28px] font-bold">{assetDetails?.name}</span>
              <div className="mt-[24px] flex w-[325px] flex-row justify-between text-light">
                <span>Token ID: {assetDetails?.tokenId}</span>
                <span>|</span>
                <span>Owned by {truncateString(`${assetDetails?.owner?.starkKey}`)}</span>
              </div>

              <div className="flex gap-6 text-light">
                <div className="bg-base/3 border-base/6 mt-[24px] flex flex-row items-center rounded-[5px] border px-[12px] py-[8px]">
                  <MintedIcon />
                  <span className="ml-[5px]">Minted: {assetDetails?.totalMintedAssets}</span>
                </div>
                <div className="bg-base/3 border-base/6 mt-[24px] flex flex-row items-center rounded-[5px] border px-[12px] py-[8px]">
                  <OwnerAssetIcon />
                  <span className="ml-[5px]">
                    Owner: {truncateString(`${assetDetails?.owner?.ethAddress}`)}
                  </span>
                </div>
              </div>
            </div>
            {status === AssetStatus.BUY_NOW && (
              <BuyNow
                currentPrice={currentPrice.toString()}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => {
                  setAssetBuy({
                    name: assetDetails?.name || '',
                    price: currentPrice
                  });
                  setShowPopup(true);
                }}
              />
            )}
            {status === AssetStatus.UNCONNECTED && (
              <ConnectWalletToBuy
                currentPrice={currentPrice.toString()}
                currentUSDPrice={currentUSDPrice}
                setStatus={onConnect}
              />
            )}
            {status === AssetStatus.SALE && (
              <ItemForSale
                starkKey={starkKey}
                assetDetails={assetDetails}
                setStatus={() => {
                  setShowModal(true);
                }}
              />
            )}
            {status === AssetStatus.UNCONNECTED_NOT_SALE && <ItemNotForSale />}
            {status === AssetStatus.MODIFY && (
              <ModifyListing
                currentPrice={currentPrice.toString()}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => {
                  setShowModal(true);
                }}
                setShowUnlist={() => setShowModalUnlist(true)}
              />
            )}
          </div>
          <div className="border-blue/3 border-t">
            {/* TAB */}
            <AssetDetailTab
              data={listOrder?.items}
              description={assetDetails?.description}
              tokenId={assetDetails?.tokenId}
              assetType={assetDetails?.assetType}
              status={status}
              fee={assetDetails?.fee}
              contractAddress={assetDetails?.tokenAddress}
              onBuyNow={handleBuyNowItem}
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
              rarity: 'rare',
              name: elm.name || '',
              image_url: elm.imageUrl || '',
              creator: truncateString(elm.owner),
              creatorImg: testavatarImg.src,
              priceETH: +elm.order.amountBuy // +elm... to convert string to number
            };
            return item;
          })}
        />
      </div>
      {showPopup && (
        <PurchaseModal
          open={showPopup}
          onCreate={() => {
            return handleCreateTrade(assetDetails);
          }}
          onClose={() => setShowPopup(false)}
          onCloseMessage={() => {
            setShowPopup(false);
          }}
          assetBuy={assetBuy}
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
      {showMessage && (
        <MessageModal isShowMessage={showMessage} setIsShowMessage={() => setShowMessage(false)}>
          <MessagePurchaseModal />
        </MessageModal>
      )}
      {showMessageEdit && (
        <MessageModal
          isShowMessage={showMessageEdit}
          setIsShowMessage={() => setShowMessageEdit(false)}
        >
          <MessageEditListingModal />
        </MessageModal>
      )}
      {showModal && (
        <ModalEditListing
          {...propsConfirmPriceModal}
          onSubmit={status === AssetStatus.MODIFY ? onSubmitModifyOrder : onSubmitCreateOrder}
          items={assetDetails}
          ethereum={etheCost}
          imgSrc={assetDetails?.imageUrl}
          open={showModal}
          onClose={handleCloseModal}
        />
      )}
      {showMessageModify && (
        <MessageModal
          isShowMessage={showMessageModify}
          setIsShowMessage={() => setShowMessageModify(false)}
        >
          <MessageListingPriceModal />
        </MessageModal>
      )}
      {showMessageUnlist && (
        <MessageModal
          isShowMessage={showMessageUnlist}
          setIsShowMessage={() => setShowMessageUnlist(false)}
        >
          <MessageUnlist />
        </MessageModal>
      )}
    </div>
  );
}

const ItemForSale: React.FC<IProp> = ({ setStatus, starkKey, assetDetails }) => {
  const triggerPopover = () => {
    const btn = document.getElementById('trigger-popover');
    const btnWithdraw = document.getElementById('trigger-withdraw');
    btn?.click();
    btnWithdraw?.click();
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
          <button
            className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
            onClick={setStatus}
          >
            <Trans>LIST ITEM FOR SALE</Trans>
          </button>
          <button
            className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white"
            onClick={triggerPopover}
          >
            <Trans>WITHDRAW</Trans>
          </button>
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
          <span className="text-light mb-[5px] ml-1 self-end text-[14px]">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
        onClick={setStatus}
      >
        <Trans>MODIFY LISTING</Trans>
      </button>
      <button
        className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white"
        onClick={setShowUnlist}
      >
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
          <span className="text-light mb-[5px] ml-1 self-end text-[14px]">
            {'(~$'}
            {currentUSDPrice}
            {')'}
          </span>
        </div>
      </div>
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
        onClick={setStatus}
      >
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
        onClick={setStatus}
      >
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

export default AssetDetails;
