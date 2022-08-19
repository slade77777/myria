import { Trans } from '@lingui/macro';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import { EqualMetadataByAssetIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DAOIcon from 'src/components/icons/DAOIcon';
import EnternalLinkIcon from 'src/components/icons/EnternalLinkIcon';
import truncateString from 'src/helper';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import {
  capitalizeFirstLetter,
  formatPrice,
  formatUSDPrice,
  getExplorerForAddress
} from 'src/utils';
import { AssetDetailsResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { getNetworkId } from 'src/services/myriaCoreSdk';

type Prop = {
  data: EqualMetadataByAssetIdResponse | any;
  onBuyNow: (data: EqualMetadataByAssetIdResponse) => void;
  etheCost: number;
  isModifing: boolean;
  assetDetails: AssetDetailsResponse | undefined;
};

const AssetDetailTab: FC<Prop> = ({ data = [], onBuyNow, etheCost, isModifing, assetDetails }) => {
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = `0x${starkKeyUser}`;
  const [etherLinkContract, setEtherLinkContract] = useState<string>();

  const convertPrice = (isPriceUSD: boolean) => {
    let convertPrice;
    if (assetDetails) {
      const priceConverted = formatPrice(parseFloat(assetDetails?.order?.nonQuantizedAmountBuy));
      const usdPriceConverted = `$${formatUSDPrice(parseFloat(priceConverted) * etheCost)}`;
      convertPrice = isPriceUSD ? usdPriceConverted : priceConverted;
    }
    return convertPrice;
  };
  useEffect(() => {
    const setLink = async () => {
      const networkId = await getNetworkId();
      if (!networkId || !assetDetails?.tokenAddress) return '';
      setEtherLinkContract(getExplorerForAddress(assetDetails?.tokenAddress, networkId));
    };
    setLink();
  }, [assetDetails?.tokenAddress]);

  return (
    <Root defaultValue="Listing">
      <List className="my-6">
        <Trigger
          className="text-base/9 border-primary/6 px-4 py-[12.5px] text-base"
          value="Listing">
          Listing
        </Trigger>
        <Trigger
          className="text-base/9 border-primary/6 mx-2 px-4 py-[12.5px] text-base"
          value="Description">
          Description
        </Trigger>
        <Trigger
          className="text-base/9 border-primary/6 px-4 py-[12.5px] text-base"
          value="Details">
          Details
        </Trigger>
      </List>
      <Content value="Listing">
        <div className="relative max-h-[338px] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-base/9 bg-base/2 sticky text-[14px] font-medium">
              <tr>
                <th scope="col" className="py-3 pr-6 w-1/4">
                  Price
                </th>
                <th scope="col" className="py-3 pr-6 w-1/4">
                  USD Price
                </th>
                <th scope="col" className="py-3 pr-6 w-1/4">
                  Owner
                </th>
                <th scope="col" className="w-1/4 py-3 pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="border-blue/3 max-h-[100px] overflow-scroll border-b">
              {assetDetails && isModifing && (
                <tr className="border-blue/3 border-t text-base font-normal text-white h-[65px]">
                  <td className="whitespace-nowrap py-3 pr-6 overflow-hidden w-1/4">
                    <p className="flex flex-row items-center gap-[7px] truncate">
                      <DAOIcon size={16} /> {convertPrice(false)}
                    </p>
                  </td>
                  <td className="py-4 pr-6 truncate w-1/4">{convertPrice(true)}</td>
                  <td className="py-4 pr-6 truncate w-1/4">
                    <Trans>You</Trans>
                  </td>
                  <td className="py-4 pr-6 truncate w-1/4 text-right"></td>
                </tr>
              )}
              {data?.map((elm: EqualMetadataByAssetIdResponse | any, _idx: number) => {
                const isOrder = Array.isArray(elm?.order);
                const priceConverted = formatPrice(
                  parseFloat(
                    isOrder
                      ? elm?.order[0]?.nonQuantizedAmountBuy
                      : elm?.order?.nonQuantizedAmountBuy
                  )
                );
                const usdPriceConverted = formatUSDPrice(parseFloat(priceConverted) * etheCost);
                const ownerName = truncateString(elm?.creatorStarkKey);
                return (
                  <tr
                    key={_idx}
                    className="border-blue/3 border-t text-[16px] font-normal text-white">
                    <td className="whitespace-nowrap py-4 pr-6 overflow-hidden w-1/4">
                      <p className="flex flex-row items-center gap-[7px] truncate">
                        <DAOIcon size={16} className="mb-[2px]" /> {priceConverted}
                      </p>
                    </td>
                    <td className="py-4 pr-6 truncate w-1/4">${usdPriceConverted}</td>
                    <td className="py-4 pr-6 truncate w-1/4">
                      {elm?.starkKey !== starkKey ? ownerName : <Trans>You</Trans>}
                    </td>
                    <td className="py-4 pr-6 truncate w-1/4 text-right">
                      {starkKeyUser && elm?.starkKey !== starkKey && (
                        <button
                          onClick={() => onBuyNow(elm)}
                          className="rounded-[8px] border border-white/[0.4] px-4 py-[5px] font-bold">
                          <Trans>Buy Now</Trans>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Content>
      <Content value="Description">
        <p className="max-w-full">{capitalizeFirstLetter(assetDetails?.description)}</p>
      </Content>
      <Content value="Details">
        <div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-base font-normal">
            <Trans>Contract Address</Trans>
            <a
              target={'_blank'}
              href={etherLinkContract}
              className="text-blue/6 flex cursor-pointer flex-row items-center gap-[3px] font-medium"
              rel="noreferrer">
              <span>{assetDetails ? truncateString(assetDetails?.tokenAddress) : ''}</span>
              <EnternalLinkIcon />
            </a>
          </div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-base font-normal">
            <Trans>Token ID</Trans>
            <span className="font-medium text-white">{assetDetails?.tokenId}</span>
          </div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-base font-normal">
            <Trans>Token Standard</Trans>
            <span className="font-medium text-white">{assetDetails?.assetType}</span>
          </div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-base font-normal">
            <Trans>Creator Fees</Trans>
            <span className="font-medium text-white">
              {assetDetails && assetDetails?.fee.length > 0
                ? assetDetails?.fee[0].percentage + '%'
                : 'Free'}
            </span>
          </div>
        </div>
      </Content>
    </Root>
  );
};

export default AssetDetailTab;
