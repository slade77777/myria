import { Trans } from '@lingui/macro';
import DAOIcon from 'src/components/icons/DAOIcon';
import MintedIcon from 'src/components/icons/MintedIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import truncateString from 'src/helper';
import { formatNumber, formatNumber2digits } from 'src/utils';
import AssetList from '../AssetList';
import { NFTItemType } from '../NftItem/type';
import AssetDetailTab from './AssetDetailTab';
import testavatarImg from './testavatar.png';
const walletAddress = '0x7Ec5A82Ca092f3397877134a711dDc698Bb2b089'
interface Props {
  id: string
}

const detailData = {
  collectionName: 'Myriaverse Sigil Event',
  assetName: 'Ultra Rare Vector Prime Sigil',
  mintedQuantity: 10000,
  tokenId: 1907,
  amountBuy: 2,
  usdPrice: 2274.23
};

const ItemAttribution = () => {
  return (
    <div className='bg-base/3 rounded-[8px] text-center p-[16px] border border-base/6'>
      <p className='uppercase text-blue/6'>RARITY</p>
      <p className='font-medium'>Ultra Rare</p>
    </div>
  )
}
function AssetDetails({ id }: Props) {
  const { collectionName, assetName, mintedQuantity, tokenId, amountBuy, usdPrice } = detailData;
  const mintedQuantityConverted =formatNumber(mintedQuantity);
  const currentPrice = formatNumber2digits(amountBuy)
  const currentUSDPrice = formatNumber2digits(usdPrice);


  return (
    <div className="w-full bg-[#050E15] py-[58px] text-white px-6 md:px-12 xl:px-16 pt-[104px] md:pt-[133px]">
      <div className='flex flex-row  space-x-28 mx-auto max-w-content'>
        {/* container */}
        <div className='w-[620px]'>
          {/* left */}
          <div className="bg-[url('/images/inventory/sigil.png')] bg-no-repeat w-full  h-[620px] 
          bg-center rounded-[3px] border-[3px] border-base/5 ">
            {/* img */}
          </div>
          <div className='text-white'>
            {/* list stat */}
            <div className='mt-[40px] mb-[16px] text-[18px] font-bold'>
              <Trans>Attributes</Trans>
            </div>
            <div className='grid grid-cols-4 gap-4'>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
                return <ItemAttribution key={val} />
              })}
            </div>
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
                <span className='ml-[8px] text-[16px]'>{collectionName}</span>
              </div>
              <div className='w-[40px] p-[10px]'>
                <ShareIcon />
              </div>
            </div>
            <div className='flex flex-col items-start'>
              {/* detail asset */}
              <span className='mt-[24px] text-[28px] font-bold'>{assetName}</span>
              <div className='mt-[24px] flex flex-row justify-between w-[300px]'>
                <span>Token ID: {tokenId}</span>
                <span>|</span>
                <span>{truncateString(walletAddress)}</span>
              </div>

              <div className='mt-[24px] flex flex-row items-center px-[12px] py-[8px] rounded-[5px] bg-base/3 border-base/6 border'>
                <MintedIcon />
                <span className='ml-[5px]'>{mintedQuantityConverted} Minted</span>
              </div>

              <span className='text-light text-[18px] mt-[36px] mb-[16px]'>Current price</span>
              <div className='flex flex-row items-center'>
                <DAOIcon className="mr-[8px]" />
                <span className='text-[28px] font-bold'>{currentPrice}
                </span>
                <span className='text-[14px] ml-1 text-light self-end mb-[5px]'>{'(~$'}{currentUSDPrice}{')'}
                </span>
              </div>
            </div>
            <div className='flex bg-primary/6 mb-[48px] mt-[40px] h-[56px] justify-center items-center rounded-[8px] text-base/1 font-bold text-[16px]'>
              <Trans>BUY NOW</Trans>
            </div>
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
    </div>
  );
}

export default AssetDetails;
