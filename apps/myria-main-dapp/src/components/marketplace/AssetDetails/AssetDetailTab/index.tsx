import { Trans } from '@lingui/macro';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import {
  EqualMetadataByAssetIdResponse,
  FeeTypes
} from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { FC } from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import EnternalLinkIcon from 'src/components/icons/EnternalLinkIcon';
import truncateString from 'src/helper';
import { formatNumber2digits } from 'src/utils';
import { AssetStatus } from '..';

type Prop = {
  description?: string;
  contractAddress?: string;
  tokenId?: string | number;
  assetType?: string;
  data: EqualMetadataByAssetIdResponse | any;
  status: AssetStatus;
  fee?: FeeTypes[];
  onBuyNow: (data: EqualMetadataByAssetIdResponse) => void;
};

const AssetDetailTab: FC<Prop> = ({
  description = '',
  contractAddress = '',
  tokenId = '',
  status,
  assetType = '',
  data = [],
  fee = [],
  onBuyNow
}) => {
  return (
    <Root defaultValue="Listing">
      <List className="my-[24px]">
        <Trigger
          className="text-base/9 border-primary/6 px-[16px] py-[12.5px] text-[16px]"
          value="Listing">
          Listing
        </Trigger>
        <Trigger
          className="text-base/9 border-primary/6 mx-[8px] px-[16px] py-[12.5px] text-[16px]"
          value="Description">
          Description
        </Trigger>
        <Trigger
          className="text-base/9 border-primary/6 px-[16px] py-[12.5px] text-[16px]"
          value="Details">
          Details
        </Trigger>
      </List>
      <Content value="Listing">
        <div className="relative max-h-[300px] overflow-x-auto shadow-md sm:rounded-lg">
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
                <th scope="col" className="py-3 pr-6 w-1/4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="border-blue/3 max-h-[100px] overflow-scroll border-b">
              {data?.map((elm: EqualMetadataByAssetIdResponse | any, _idx: number) => {
                const isOrder = Array.isArray(elm?.order);
                const priceConverted = formatNumber2digits(
                  isOrder ? elm?.order[0]?.nonQuantizedAmountBuy : elm?.order?.nonQuantizedAmountBuy
                );
                const usdPriceConverted = formatNumber2digits(
                  isOrder ? elm?.order[0]?.amountBuyUsd : elm?.order?.amountBuyUsd
                );
                const ownerName = truncateString(elm?.creatorStarkKey);
                return (
                  <tr
                    key={_idx}
                    className="border-blue/3 border-t text-[16px] font-normal text-white"
                  >
                    <td className="whitespace-nowrap py-4 pr-6 overflow-hidden w-1/4">
                      <p className="flex flex-row items-center gap-[7px] truncate">
                        <DAOIcon /> {priceConverted}
                      </p>
                    </td>
                    <td className="py-4 pr-6 truncate w-1/4">${usdPriceConverted}</td>
                    <td className="py-4 pr-6 truncate w-1/4">{ownerName}</td>
                    <td className="py-4 pr-6 truncate w-1/4 text-right">
                      {status === AssetStatus.BUY_NOW && (
                        <button
                          onClick={() => onBuyNow(elm)}
                          className="rounded-[8px] border border-white/[0.4] px-[16px] py-[5px] font-bold">
                          <Trans>Buy now</Trans>
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
        <p className="max-w-full">{description}</p>
      </Content>
      <Content value="Details">
        <div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-[16px] font-normal">
            <Trans>Contract Address</Trans>
            <div className="text-blue/6 flex flex-row items-center gap-[3px] font-medium">
              <span>{truncateString(contractAddress)}</span>
              <EnternalLinkIcon />
            </div>
          </div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-[16px] font-normal">
            <Trans>Token ID</Trans>
            <span className="font-medium text-white">{tokenId}</span>
          </div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-[16px] font-normal">
            <Trans>Token Standard</Trans>
            <span className="font-medium text-white">{assetType}</span>
          </div>
          <div className="text-base/9 border-blue/3 flex flex-row items-center justify-between border-b py-[16px] text-[16px] font-normal">
            <Trans>Creator Fees</Trans>
            <span className="font-medium text-white">
              {fee.length > 0 ? fee[0].percentage + '%' : 'Free'}
            </span>
          </div>
        </div>
      </Content>
    </Root>
  );
};

export default AssetDetailTab;
