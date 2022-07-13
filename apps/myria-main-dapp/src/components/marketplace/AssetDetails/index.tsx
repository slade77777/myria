import { Trans } from '@lingui/macro';
import axios from 'axios';
import { AssetListResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import DAOIcon from 'src/components/icons/DAOIcon';
import MintedIcon from 'src/components/icons/MintedIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import { Loading } from 'src/components/Loading';
import Modal from 'src/components/Modal';
import truncateString from 'src/helper';
import { useEtheriumPrice } from 'src/hooks/useEtheriumPrice';
import { assetModule } from 'src/services/myriaCore';
import { formatNumber2digits, validatedImage } from 'src/utils';
import AssetList from '../AssetList';
import MessageModal from '../MessageModal/MessageModal';
import MessagePurchaseModal from '../MessageModal/MessagePurchaseModal';
import { MessageEditListingModal, ModalEditListing } from '../Modals';
import { NFTItemType } from '../NftItem/type';
import PurchasePopover from '../PurchasePopover';
import AssetDetailTab from './AssetDetailTab';
import testavatarImg from './testavatar.png';
interface Props {
  id: string;
}

interface IProp {
  currentPrice?: string;
  currentUSDPrice?: string;
  setStatus?: () => void;
}

const detailData = {
  collectionName: 'Myriaverse Sigil Event',
  assetName: 'Ultra Rare Vector Prime Sigil',
  mintedQuantity: 10000,
  tokenId: 1907,
  amountBuy: 2,
  usdPrice: 2274.23
};

enum AssetStatus {
  BUY_NOW,
  SALE,
  MODIFY
}

const ItemAttribution = () => {
  return (
    <div className="border-base/6 bg-base/3 rounded-[8px] border p-[16px] text-center">
      <p className="text-blue/6 uppercase">RARITY</p>
      <p className="font-medium">Ultra Rare</p>
    </div>
  );
};
const SHOW_MESSAGE_TIME = 5000;
function AssetDetails({ id }: Props) {
  const { data: assetDetails, isLoading } = useQuery(
    ['assetDetail', id],
    async () => {
      const res = await assetModule?.getAssetById(id);
      return res?.data;
    },
    {
      enabled: !!id
    }
  );
  const currentPrice = formatNumber2digits(
    Number((assetDetails?.order as unknown as AssetListResponse['order'][])?.[0].amountSell ?? 0)
  );

  // the status will be get from based on the order Object in API get assetDetails

  const [status, setStatus] = useState(AssetStatus.BUY_NOW);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageEdit, setShowMessageEdit] = useState(false);
  const { data: etheCost = 0 } = useEtheriumPrice();

  const currentUSDPrice = useMemo(
    () => formatNumber2digits(+currentPrice * etheCost),
    [currentPrice, etheCost]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal((showModal) => !showModal);
  }, [setShowModal]);

  const handelEditListingSubmit = useCallback(
    (data) => {
      setTimeout(() => {
        handleCloseModal();
        setShowMessageEdit(true);
      }, 2000);
    },
    [handleCloseModal]
  );

  const handleClosePopup = () => {
    setShowPopup(false);
    setStatus(AssetStatus.SALE);
    setShowMessage(true);
    setTimeout(() => {}, SHOW_MESSAGE_TIME);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full bg-[#050E15] py-[58px] px-6 pt-[104px] text-white md:px-12 md:pt-[133px] xl:px-16">
      <div className="max-w-content mx-auto  flex flex-row space-x-28">
        {/* container */}
        <div className="w-[620px]">
          {/* left */}
          <div
            className=" border-base/5 h-[620px]  w-full
          rounded-[3px] border-[3px] bg-center bg-no-repeat "
            style={{ backgroundImage: `url(${validatedImage(assetDetails?.imageUrl)})` }}>
            {/* img */}
          </div>
          <div className="text-white">
            {/* list stat */}
            <div className="mt-[40px] mb-[16px] text-[18px] font-bold">
              <Trans>Attributes</Trans>
            </div>
            {!assetDetails?.metadata ? (
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
                  return <ItemAttribution key={val} />;
                })}
              </div>
            ) : (
              <div className="text-center text-[28px] italic">
                <Trans>No attributes</Trans>
              </div>
            )}
          </div>
        </div>
        <div className="w-[620px]">
          {/* right */}
          <div>
            {/* very top */}
            <div className="flex flex-row items-center justify-between">
              {/* first row */}
              <div className="flex flex-row">
                <img src={testavatarImg.src} className="h-[24px] w-[24px]" />
                <span className="ml-[8px] text-[16px]">{assetDetails?.collection?.name}</span>
              </div>
              <div className="w-[40px] p-[10px]">
                <ShareIcon />
              </div>
            </div>
            <div className="mb-[36px] flex flex-col items-start">
              {/* detail asset */}
              <span className="mt-[24px] text-[28px] font-bold">{assetDetails?.name}</span>
              <div className="mt-[24px] flex w-[300px] flex-row justify-between">
                <span>Token ID: {assetDetails?.tokenId}</span>
                <span>|</span>
                <span>{truncateString(`${assetDetails?.starkKey}`)}</span>
              </div>

              <div className="flex gap-6">
                <div className="bg-base/3 border-base/6 mt-[24px] flex flex-row items-center rounded-[5px] border px-[12px] py-[8px]">
                  <MintedIcon />
                  <span className="ml-[5px]">Minted {'10,000'}</span>
                </div>
                <div className="bg-base/3 border-base/6 mt-[24px] flex flex-row items-center rounded-[5px] border px-[12px] py-[8px]">
                  <MintedIcon />
                  <span className="ml-[5px]">Owner: {'1,000'}</span>
                </div>
              </div>
            </div>
            {status === AssetStatus.BUY_NOW && (
              <BuyNow
                currentPrice={currentPrice}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => setShowPopup(true)}
              />
            )}
            {status === AssetStatus.SALE && (
              <ItemForSale
                setStatus={() => {
                  setStatus(AssetStatus.BUY_NOW);
                  setShowModal(true);
                }}
              />
            )}
            {status === AssetStatus.MODIFY && (
              <ModifyListing
                currentPrice={currentPrice}
                currentUSDPrice={currentUSDPrice}
                setStatus={() => {
                  setShowModal(true);
                }}
              />
            )}
          </div>
          <div className="border-blue/3 border-t">
            {/* TAB */}
            <AssetDetailTab />
          </div>
        </div>
      </div>
      <div className="mt-[24px]">
        <AssetList
          title={'More from this collection'}
          items={Array(4)
            .fill(0)
            .map((_, index) => {
              const item: NFTItemType = {
                id: `${index}`,
                rarity: 'rare',
                name: 'Common Alliance Chest',
                image_url: 'https://myria.com/seo/defaultImage.png',
                creator: 'Myria',
                creatorImg: testavatarImg.src,
                priceETH: Math.round(Math.random() * 5)
              };
              return item;
            })}
        />
      </div>
      {showPopup && (
        <PurchaseModal
          open={showPopup}
          onClose={() => setShowPopup(false)}
          onCloseMessage={handleClosePopup}
          currentPrice={currentPrice}
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
          setIsShowMessage={() => setShowMessageEdit(false)}>
          <MessageEditListingModal />
        </MessageModal>
      )}
      {showModal && (
        <ModalEditListing
          title="List your item for sale"
          titleConfirm="CONFIRMING YOUR LISTING"
          labelInput="Listing Price"
          onSubmit={handelEditListingSubmit}
          items={assetDetails}
          open={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

const ItemForSale: React.FC<IProp> = ({ setStatus }) => {
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
      <button
        className="bg-primary/6 text-base/1 mb-[10px] mt-[40px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] text-[16px] font-bold"
        onClick={setStatus}>
        <Trans>LIST ITEM FOR SALE</Trans>
      </button>
      <button className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white">
        <Trans>WITHDRAW</Trans>
      </button>
      <span className="text-light mt-[10px] text-[14px]">
        <Trans>Assets remain in your wallet when you list on Myria Marketplace</Trans>
      </span>
    </div>
  );
};

const ModifyListing: React.FC<IProp> = ({ currentPrice, currentUSDPrice, setStatus }) => {
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
        <Trans>MODIFY LISTING</Trans>
      </button>
      <button className="my-[10px] flex h-[56px] w-full cursor-pointer items-center justify-center rounded-[8px] border text-[16px] font-bold text-white">
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
        onClick={setStatus}>
        <Trans>BUY NOW</Trans>
      </button>
    </div>
  );
};

type PurchaseModalProps = {
  open: boolean;
  onClose: () => void;
  currentPrice: string;
  onCloseMessage: () => void;
};
const PurchaseModal: React.FC<PurchaseModalProps> = ({
  open,
  onClose,
  currentPrice,
  onCloseMessage
}) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={'Purchase'} className="w-[468px] shadow-[0_0_40px_10px_#0000004D]">
        <PurchasePopover currentPrice={currentPrice} onCloseMessage={onCloseMessage} />
      </Modal.Content>
    </Modal>
  );
};

export default AssetDetails;
