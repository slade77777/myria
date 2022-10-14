import { Trans } from '@lingui/macro';
import moment from 'moment';
import React from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { FORMAT_DATE, truncateAddress } from 'src/utils';
import { convertQuantizedAmountToEth } from '../../../../utils/Converter';
import { DF_TRANSACTION_TYPE, STATUS_HISTORY } from '../../L2Wallet/MainScreen';
import { ToolTipInfo } from '../ToolTipInfo';
interface TProps {
  transactionDetail: any;
}
export default function DetailTransRoyaltyTransfer({
  transactionDetail,
}: TProps) {
  return (
    <div className="text-base/10 mt-[29px]">
      {/* Icon */}
      <div className="mx-auto flex h-16 w-16 justify-center">
        {transactionDetail.status === STATUS_HISTORY.FAILED
          ? DF_TRANSACTION_TYPE[transactionDetail.type]?.iconFailed
          : DF_TRANSACTION_TYPE[transactionDetail.type]?.iconReceived}
      </div>
      {/* Title */}
      <div className="text-base/10 mt-6 text-center text-2xl">
        <span>
          <Trans>Creator Earnings Received</Trans>
        </span>
      </div>
      {/* Date */}
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
      {/* Detail */}
      <div className="bg-base/2/50 mt-8 rounded-lg p-4 text-sm">
        {/* Royalty */}
        <div className="mb-4 flex justify-between">
          <span className="text-base/9">
            <Trans>Item</Trans>
          </span>
          <span className="text-primary/6 ml-1">NFT</span>
        </div>
        {/* Royalty */}
        <>
          <div className="mb-4 flex justify-between">
            <span className="text-base/9">
              <Trans>Total sale price</Trans>
            </span>
            <span className="text-base/10 flex items-center">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">
                {convertQuantizedAmountToEth(
                  transactionDetail.tokenSellInfo.buyerAmountSell,
                )}
              </span>
            </span>
          </div>
          {transactionDetail.partyAOrder?.feeInfo && (
            <>
              <div className="mb-4 flex justify-between">
                <span className="text-base/9">
                  <Trans>Seller Proceeds</Trans>
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
                <span className="text-base/9 flex items-center">
                  <Trans>Earnings paid to creator</Trans>
                  <ToolTipInfo
                    isPurchase
                    percentage={
                      (transactionDetail.partyAOrder.feeInfo.feeLimit /
                        transactionDetail.partyBOrder.amountSell) *
                      100
                    }
                  />
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
          <div className="mb-4 flex justify-between">
            <span className="text-base/9 flex items-center">
              <Trans>Creator earnings</Trans>
              <ToolTipInfo
                percentage={
                  (transactionDetail.quantizedAmount /
                    transactionDetail.tokenSellInfo.buyerAmountSell) *
                  100
                }
              />
            </span>
            <span className="text-base/10 flex items-center">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">
                {convertQuantizedAmountToEth(transactionDetail.quantizedAmount)}
              </span>
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-base/9">
              <Trans>Sold to</Trans>
            </span>
            <span className="ml-1">
              {truncateAddress(transactionDetail.starkKey)}
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
      </div>
    </div>
  );
}
