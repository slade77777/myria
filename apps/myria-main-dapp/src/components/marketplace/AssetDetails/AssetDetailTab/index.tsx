import { Trans } from '@lingui/macro';
import {Content, List, Root, Tabs, Trigger} from '@radix-ui/react-tabs';
import DAOIcon from 'src/components/icons/DAOIcon';
import EnternalLinkIcon from 'src/components/icons/EnternalLinkIcon';
import truncateString from 'src/helper';
const walletAddress = '0x7Ec5A82Ca092f3397877134a711dDc698Bb2b089'
const listAssetOrders = [
  {
    amountSell: 1,
    amountBuy: 2,
    usdPrice: 2402,
    owner: '0x8926Db5c7CA7A849aFCfc0b7462c44977Df18cCE'
  },
  {
    amountSell: 1,
    amountBuy: 2,
    usdPrice: 2402,
    owner: '0x8926Db5c7CA7A849aFCfc0b7462c44977Df18cCE'
  },
  {
    amountSell: 1,
    amountBuy: 2,
    usdPrice: 2402,
    owner: '0x8926Db5c7CA7A849aFCfc0b7462c44977Df18cCE'
  },
  {
    amountSell: 1,
    amountBuy: 2,
    usdPrice: 2402,
    owner: '0x8926Db5c7CA7A849aFCfc0b7462c44977Df18cCE'
  },
  {
    amountSell: 1,
    amountBuy: 2,
    usdPrice: 2402,
    owner: '0x8926Db5c7CA7A849aFCfc0b7462c44977Df18cCE'
  },
]
export default () => (
  <Root defaultValue="Listing">
    <List className='my-[24px]'>
      <Trigger className='text-base/9 text-[16px] px-[16px] py-[12.5px] focus:border-b-[2px] border-primary/6 focus:text-primary/6' value="Listing">Listing</Trigger>
      <Trigger className='text-base/9 text-[16px] px-[16px] py-[12.5px] focus:border-b-[2px] border-primary/6 focus:text-primary/6 mx-[8px]' value="Description">Description</Trigger>
      <Trigger className='text-base/9 text-[16px] px-[16px] py-[12.5px] focus:border-b-[2px] border-primary/6 focus:text-primary/6' value="Details">Details</Trigger>
    </List>
    <Content value="Listing">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[300px]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-[14px] font-medium text-base/9 sticky bg-base/2">
            <tr>
              <th scope="col" className="pr-6 py-3">
                Price
              </th>
              <th scope="col" className="pr-6 py-3">
                USD Price
              </th>
              <th scope="col" className="pr-6 py-3">
                Owner
              </th>
              <th scope="col" className="pr-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className='max-h-[100px] overflow-scroll border-b border-blue/3'>
            {listAssetOrders.map((elm,_idx) => {
              const priceConverted = Number(elm.amountBuy).toLocaleString('en',{minimumFractionDigits: 2})
              const usdPriceConverted = Number(elm.usdPrice).toLocaleString('en',{minimumFractionDigits: 2})
              const ownerName = truncateString(elm.owner)
              return <tr className="font-normal text-white text-[16px] border-t border-blue/3">
              <td className="pr-6 py-4 whitespace-nowrap">
                <div className='flex flex-row gap-[7px] items-center'>
                  <DAOIcon/> {priceConverted}
                </div>
              </td>
              <td className="pr-6 py-4">
                ${usdPriceConverted}
              </td>
              <td className="pr-6 py-4">
                {ownerName}
              </td>
              <td className="pr-6 py-4 text-right">
                <button className="font-bold border border-white/[0.4] rounded-[8px] px-[16px] py-[5px]"><Trans>Buy now</Trans></button>
              </td>
            </tr>
            })}

          </tbody>
        </table>
      </div>

    </Content>
    <Content value="Description">
      <p className='max-w-full'>
      Flannel mlkshk four loko squid shoreditch. Ennui adaptogen kombucha chia, gastropub disrupt YOLO tumblr hexagon copper mug hashtag neutra four dollar toast. Myria helps blockchain projects scale. I'm baby marfa locavore craft beer, vinyl brooklyn skateboard banh mi master cleanse raclette aesthetic air plant VHS cornhole biodiesel. Swag adaptogen viral palo santo quinoa. Butcher whatever cray live-edge heirloom. Artisan jean shorts pinterest blue bottle chambray. VHS four loko flannel gentrify, ennui drinking vinegar blue bottle hammock mlkshk beard authentic.
      </p>
    </Content>
    <Content value="Details">
      <div>
        <div className='flex flex-row items-center text-[16px] text-base/9 font-normal justify-between border-b border-blue/3 py-[16px]'>
          <Trans>Contract Address</Trans>
          <div className='flex flex-row items-center font-medium text-blue/6 gap-[3px]'>
            <span>{truncateString(walletAddress)}</span>
            <EnternalLinkIcon />
          </div>
        </div>
        <div className='flex flex-row items-center text-[16px] text-base/9 font-normal justify-between border-b border-blue/3 py-[16px]'>
          <Trans>Token ID</Trans>
          <span className='font-medium text-white' >{'1907'}</span>
        </div>
        <div className='flex flex-row items-center text-[16px] text-base/9 font-normal justify-between border-b border-blue/3 py-[16px]'>
          <Trans>Token Standard</Trans>
          <span className='font-medium text-white' >{'ERC-20'}</span>
        </div>
        <div className='flex flex-row items-center text-[16px] text-base/9 font-normal justify-between border-b border-blue/3 py-[16px]'>
          <Trans>Creator Fees</Trans>
          <span className='font-medium text-white' >{'Free'}</span>
        </div>
      </div>
    </Content>
  </Root >
);