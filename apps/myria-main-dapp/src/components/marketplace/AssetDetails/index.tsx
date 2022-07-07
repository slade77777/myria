import { Trans } from '@lingui/macro';
import { AssetListResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DAOIcon from 'src/components/icons/DAOIcon';
import MintedIcon from 'src/components/icons/MintedIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import { Loading } from 'src/components/Loading';
import Modal from 'src/components/Modal';
import truncateString from 'src/helper';
import { assetModule } from 'src/services/myriaCore';
import { formatNumber2digits, validatedImage } from 'src/utils';
import AssetList from '../AssetList';
import MessageModal from '../MessageModal/MessageModal';
import MessagePurchaseModal from '../MessageModal/MessagePurchaseModal';
import { NFTItemType } from '../NftItem/type';
import PurchasePopover from '../PurchasePopover';
import AssetDetailTab from './AssetDetailTab';
import testavatarImg from './testavatar.png';
interface Props {
  id: string
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
  BUY_NOW, SALE, MODIFY
}

const ItemAttribution = () => {
  return (
    <div className='bg-base/3 rounded-[8px] text-center p-[16px] border border-base/6'>
      <p className='uppercase text-blue/6'>RARITY</p>
      <p className='font-medium'>Ultra Rare</p>
    </div>
  )
}
const SHOW_MESSAGE_TIME = 5000;
function AssetDetails({}: Props) {
  const router = useRouter()
  const id = router.query?.id 
  const { amountBuy, usdPrice } = detailData;
  const currentPrice = formatNumber2digits(amountBuy)
  const currentUSDPrice = formatNumber2digits(usdPrice);

  const { data, isLoading, error } = useQuery(['assetDetail', id], () => {
    if (id) {
      return assetModule?.getAssetById(`${id}`);
    }
    return null;
  })
  const assetDetail: AssetListResponse| undefined = data?.data

  // the status will be get from based on the order Object in API get assetDetails 
  
  const [status, setStatus] = useState<number>(AssetStatus.BUY_NOW);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleClosePopup = () => {
    setShowPopup(false);
    setStatus(AssetStatus.SALE);
    setShowMessage(true);
    setTimeout(() => {
      // setShowMessage(false);
    }, SHOW_MESSAGE_TIME);
  }
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full bg-[#050E15] py-[58px] text-white px-6 md:px-12 xl:px-16 pt-[104px] md:pt-[133px]">
      <div className='flex flex-row  space-x-28 mx-auto max-w-content'>
        {/* container */}
        <div className='w-[620px]'>
          {/* left */}
          <div className=" bg-no-repeat w-full  h-[620px] 
          bg-center rounded-[3px] border-[3px] border-base/5 "
            style={{ backgroundImage: `url(${validatedImage(assetDetail?.imageUrl)})` }}
          >
            {/* img */}
          </div>
          <div className='text-white'>
            {/* list stat */}
            <div className='mt-[40px] mb-[16px] text-[18px] font-bold'>
              <Trans>Attributes</Trans>
            </div>
            {
              !assetDetail?.metadata ? <div className='grid grid-cols-4 gap-4'>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
                  return <ItemAttribution key={val} />
                })}
              </div> : <div className='text-[28px] text-center italic'>
                <Trans>No attributes</Trans>
              </div>
            }

          </div>
        </div>
        <div className='w-[620px]'>
          {/* right */}
          <div>
            {/* very top */}
            <div className='flex flex-row justify-between items-center'>
              {/* first row */}
              <div className='flex flex-row'>
                <img src={testavatarImg.src} className='h-[24px] w-[24px]' />
                <span className='ml-[8px] text-[16px]'>{assetDetail?.collection?.name}</span>
              </div>
              <div className='w-[40px] p-[10px]'>
                <ShareIcon />
              </div>
            </div>
            <div className='flex flex-col items-start mb-[36px]'>
              {/* detail asset */}
              <span className='mt-[24px] text-[28px] font-bold'>{assetDetail?.name}</span>
              <div className='mt-[24px] flex flex-row justify-between w-[300px]'>
                <span>Token ID: {assetDetail?.tokenId}</span>
                <span>|</span>
                <span>{truncateString(`${assetDetail?.starkKey}`)}</span>
              </div>

              <div className='mt-[24px] flex flex-row items-center px-[12px] py-[8px] rounded-[5px] bg-base/3 border-base/6 border'>
                <MintedIcon />
                <span className='ml-[5px]'>{'NaN'} Minted</span>
              </div>
            </div>
            {
              status === AssetStatus.BUY_NOW && <BuyNow currentPrice={currentPrice} currentUSDPrice={currentUSDPrice} setStatus={() => setShowPopup(true)}/>
            }
            {
              status === AssetStatus.SALE && <ItemForSale setStatus={() => setStatus(AssetStatus.BUY_NOW)}/>
            }
            {
              status === AssetStatus.MODIFY && <ModifyListing currentPrice={currentPrice} currentUSDPrice={currentUSDPrice} setStatus={() => setStatus(AssetStatus.BUY_NOW)}/>
            }
          </div>
          <div className='border-t border-blue/3'>
            {/* TAB */}
            <AssetDetailTab />
          </div>
        </div>
      </div>
      <div className='mt-[24px]'>
        <AssetList title={'More from this collection'}  items={Array(4)
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
        })} />
      </div>
      {
        showPopup && <PurchaseModal open={showPopup} onClose={() => setShowPopup(false)} onCloseMessage={handleClosePopup} currentPrice={currentPrice}/>
      }
      {
        showMessage && <MessageModal isShowMessage={showMessage} setIsShowMessage={() => setShowMessage(false)}>
          <MessagePurchaseModal/>
        </MessageModal>
      }
    </div>
  );
}

const ItemForSale: React.FC<IProp> = ({setStatus}) => {
  return (
    <div className='mb-[48px]'>
      <div>
        <span className='text-light text-[18px] mt-[36px] mb-[16px]'><Trans>Market Status</Trans></span>
        <div className='flex flex-row items-center mt-[20px]'>
          <span className='text-[28px] font-bold'><Trans>Not for Sale</Trans></span>
        </div>
      </div>
      <button className='flex bg-primary/6 mb-[10px] mt-[40px] h-[56px] justify-center items-center rounded-[8px] text-base/1 font-bold text-[16px] w-full cursor-pointer'
        onClick={setStatus}>
        <Trans>LIST ITEM FOR SALE</Trans>
      </button>
      <button className='flex border my-[10px] h-[56px] justify-center items-center rounded-[8px] text-white font-bold text-[16px] w-full cursor-pointer'>
        <Trans>WITHDRAW</Trans>
      </button>
      <span className='mt-[10px] text-light text-[14px]'>
        <Trans>Assets remain in your wallet when you list on Myria Marketplace</Trans>
      </span>
    </div>
  )
}

const ModifyListing: React.FC<IProp> = ({currentPrice, currentUSDPrice, setStatus}) => {
  return (
    <div className='mb-[48px]'>
      <div>
        <span className='text-light text-[18px] mt-[36px] mb-[16px]'><Trans>Current price</Trans></span>
          <div className='flex flex-row items-center'>
            <DAOIcon className="mr-[8px]" />
            <span className='text-[28px] font-bold'>{currentPrice}</span>
            <span className='text-[14px] text-light self-end mb-[5px] ml-1'>{'(~$'}{currentUSDPrice}{')'}</span>
          </div>
      </div>
      <button className='flex bg-primary/6 mb-[10px] mt-[40px] h-[56px] justify-center items-center rounded-[8px] text-base/1 font-bold text-[16px] w-full cursor-pointer'
        onClick={setStatus}>
        <Trans>MODIFY LISTING</Trans>
      </button>
      <button className='flex border my-[10px] h-[56px] justify-center items-center rounded-[8px] text-white font-bold text-[16px] w-full cursor-pointer'>
        <Trans>UNLIST THIS ITEM</Trans>
      </button>
    </div>
  )
}

const BuyNow: React.FC<IProp> = ({currentPrice, currentUSDPrice, setStatus}) => {
  return (
    <div className='mb-[48px]'>
      <div>
        <span className='text-light text-[18px] mt-[36px] mb-[16px]'><Trans>Current price</Trans></span>
          <div className='flex flex-row items-center'>
            <DAOIcon className="mr-[8px]" />
            <span className='text-[28px] font-bold'>{currentPrice}</span>
            <span className='text-[14px] text-light self-end mb-[5px] ml-1'>{'(~$'}{currentUSDPrice}{')'}</span>
          </div>
      </div>
      <button className='flex bg-primary/6 mb-[10px] mt-[40px] h-[56px] justify-center items-center rounded-[8px] text-base/1 font-bold text-[16px] w-full cursor-pointer'
        onClick={setStatus}>
        <Trans>BUY NOW</Trans>
      </button>
    </div>
  )
}

const PurchaseModal: React.FC<any> = ({open, onClose, currentPrice, onCloseMessage}) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title={"Purchase"} className="shadow-[0_0_40px_10px_#0000004D] w-[468px]">
        <PurchasePopover currentPrice={currentPrice} onCloseMessage={onCloseMessage}/>
      </Modal.Content>
    </Modal>
  )
}


export default AssetDetails;
