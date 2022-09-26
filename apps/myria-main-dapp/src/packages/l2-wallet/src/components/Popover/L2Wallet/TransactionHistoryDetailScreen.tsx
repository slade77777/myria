import { Trans } from '@lingui/macro';
import moment from 'moment';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { getNetworkId } from 'src/services/myriaCoreSdk';
import { FORMAT_DATE, getExplorerForAddress, truncateAddress } from 'src/utils';
import { convertQuantizedAmountToEth } from '../../../utils/Converter';
import ArrowRightLeftIcon from '../../Icons/ArrowRightLeftIcon';
import {
  DF_TRANSACTION_TYPE,
  STATUS_HISTORY,
  TRANSACTION_TYPE,
} from './MainScreen';
interface TProps {
  goBack: React.MouseEventHandler<HTMLButtonElement>;
  transactionDetail: any;
  starkKeyUser: string;
}

export default function TransactionHistoryDetailScreen({
  transactionDetail,
  starkKeyUser,
}: TProps) {
  const startKey = `0x${starkKeyUser}`;
  const [etherLinkContract, setEtherLinkContract] = useState<string>();
  useEffect(() => {
    const setLink = async () => {
      const networkId = await getNetworkId();
      if (!networkId || !transactionDetail?.transactionHash) return '';
      setEtherLinkContract(
        getExplorerForAddress(
          transactionDetail?.transactionHash,
          networkId,
          'transaction',
        ),
      );
    };
    setLink();
  }, [transactionDetail?.transactionHash]);

  const renderTitle = (transactionDetail: any) => {
    const startKey = `0x${starkKeyUser}`;
    if (
      transactionDetail.type === TRANSACTION_TYPE.SETTLEMENT &&
      transactionDetail.partyAOrder?.publicKey === startKey
    ) {
      return 'NFT Sale';
    }
    if (
      transactionDetail?.type &&
      transactionDetail.status === STATUS_HISTORY.FAILED
    ) {
      return DF_TRANSACTION_TYPE[transactionDetail?.type]?.titleFailed;
    }
    if (transactionDetail?.type === 'RoyaltyTransferRequest') {
      return 'Creator Earning Received';
    }
    return DF_TRANSACTION_TYPE[transactionDetail?.type]?.titleHistoryDetail;
  };

  const renderAmount = useCallback(
    (type: string, amount: number, item: any) => {
      switch (type) {
        case 'SettlementRequest':
          return convertQuantizedAmountToEth(item.partyBOrder.amountSell);
        default:
          return amount;
      }
    },
    [],
  );
  console.log('transactionDetail', transactionDetail);
  return (
    <div className="text-base/10 mt-[29px]">
      {transactionDetail.type !== TRANSACTION_TYPE.SETTLEMENT && (
        <div className="mx-auto flex h-16 w-16 justify-center">
          {transactionDetail.status === STATUS_HISTORY.FAILED
            ? DF_TRANSACTION_TYPE[transactionDetail.type]?.iconFailed
            : DF_TRANSACTION_TYPE[transactionDetail.type]?.iconReceived}
        </div>
      )}
      {transactionDetail.type === TRANSACTION_TYPE.SETTLEMENT && (
        <>
          {transactionDetail.status === STATUS_HISTORY.FAILED ? (
            <div className="flex items-center justify-center ">
              <img
                className="w-[83px] flex-none"
                src={'/assets/images/nft.svg'}
                alt="token_icon"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <ArrowRightLeftIcon />
            </div>
          )}
        </>
      )}
      <div className="text-base/10 mt-6 text-center text-2xl">
        {renderTitle(transactionDetail)}
      </div>
      {(transactionDetail.status === STATUS_HISTORY.SUCCESS ||
        transactionDetail.status === STATUS_HISTORY.COMPLETED) && (
        <div className="text-base/9 mt-6 text-center text-sm">
          Transaction completed{' '}
          {moment(transactionDetail.createdAt).format(FORMAT_DATE)}
        </div>
      )}
      {transactionDetail.status === STATUS_HISTORY.FAILED && (
        <div className="text-base/9 mt-6 text-center text-sm">
          Transaction failed{' '}
          {moment(transactionDetail.createdAt).format(FORMAT_DATE)}
        </div>
      )}

      {(transactionDetail.status === STATUS_HISTORY.IN_PROGRESS ||
        transactionDetail.status === STATUS_HISTORY.IN_PROGRESS_VALIDATING ||
        transactionDetail.status === STATUS_HISTORY.PREPARE) && (
        <div className="text-base/9 mt-6 text-center text-sm">
          Transaction started{' '}
          {moment(transactionDetail.createdAt).format(FORMAT_DATE)}
        </div>
      )}
      <div className="bg-base/2/50 mt-8 rounded-lg p-4 text-sm">
        {(transactionDetail.name !== 'Ethereum' ||
          transactionDetail.transactionType ===
            TRANSACTION_TYPE.ROYALTYTRANSFER) && (
          <div className="mb-4 flex justify-between">
            <span className="text-base/9">
              <Trans>Item</Trans>
            </span>
            <span className="text-primary/6 ml-1">NFT</span>
          </div>
        )}

        {transactionDetail.transactionType !== TRANSACTION_TYPE.SETTLEMENT &&
          transactionDetail.transactionType !==
            TRANSACTION_TYPE.ROYALTYTRANSFER && (
            <div className="flex justify-between ">
              <span className="text-base/9">
                <Trans>Amount</Trans>
              </span>
              <span className="text-base/10 flex items-center">
                {transactionDetail.name === 'Ethereum' && (
                  <DAOIcon size={16} className="mb-[2px]" />
                )}
                <span className="ml-1">
                  {renderAmount(
                    transactionDetail.type,
                    transactionDetail.amount,
                    transactionDetail,
                  )}
                </span>
              </span>
            </div>
          )}
        {(transactionDetail.transactionType === TRANSACTION_TYPE.SETTLEMENT ||
          transactionDetail.transactionType ===
            TRANSACTION_TYPE.ROYALTYTRANSFER) && (
          <>
            <div className="mb-4 flex justify-between">
              <span className="text-base/9">
                <Trans>Total sale price</Trans>
              </span>
              <span className="text-base/10 flex items-center">
                <DAOIcon size={16} className="mb-[2px]" />
                <span className="ml-1">
                  {renderAmount(
                    transactionDetail.type,
                    transactionDetail.amount,
                    transactionDetail,
                  )}
                </span>
              </span>
            </div>
            {transactionDetail.partyAOrder?.feeInfo && (
              <>
                <div className="mb-4 flex justify-between">
                  <span className="text-base/9">
                    <Trans>Proceeds from sale</Trans>
                  </span>
                  <span className="text-base/10 flex items-center">
                    <DAOIcon size={16} className="mb-[2px]" />
                    <span className="ml-1">
                      {convertQuantizedAmountToEth(
                        transactionDetail.partyAOrder.amountBuy,
                      )}
                    </span>
                  </span>
                </div>
                <div className="mb-4 flex justify-between">
                  <span className="text-base/9">
                    <Trans>Earnings paid to creator</Trans>
                  </span>
                  <span className="text-base/10 flex items-center">
                    <DAOIcon size={16} className="mb-[2px]" />
                    <span className="ml-1">
                      {convertQuantizedAmountToEth(
                        transactionDetail.partyAOrder.feeInfo.feeLimit,
                      )}
                    </span>
                  </span>
                </div>
              </>
            )}
            {transactionDetail.transactionType === 'RoyaltyTransferRequest' && (
              <div className="mb-4 flex justify-between">
                <span className="text-base/9">
                  <Trans>Creator earnings</Trans>
                </span>
                <span className="text-base/10 flex items-center">
                  <DAOIcon size={16} className="mb-[2px]" />
                  <span className="ml-1">
                    {convertQuantizedAmountToEth(
                      transactionDetail.quantizedAmount,
                    )}
                  </span>
                </span>
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <span className="text-base/9">
                <Trans>Sold to</Trans>
              </span>
              <span className="ml-1">
                {transactionDetail.transactionType ===
                TRANSACTION_TYPE.ROYALTYTRANSFER
                  ? truncateAddress(transactionDetail.starkKey)
                  : truncateAddress(transactionDetail.partyBOrder?.publicKey)}
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="text-base/9">
                <Trans>Transaction ID</Trans>
              </span>
              <span className="text-primary/6 ml-1">
                {transactionDetail.transactionId}
              </span>
            </div>
          </>
        )}
        {transactionDetail.transactionType === TRANSACTION_TYPE.DEPOSIT &&
          transactionDetail.status === STATUS_HISTORY.SUCCESS && (
            <div className="mt-4 flex justify-between">
              <span className="text-base/9 text-sm">Transaction ID</span>
              <a
                className="text-primary/6 flex cursor-pointer items-center text-base"
                target="_blank"
                href={etherLinkContract}
                rel="noreferrer"
              >
                <Trans>View</Trans>
              </a>
            </div>
          )}
      </div>
    </div>
  );
}
