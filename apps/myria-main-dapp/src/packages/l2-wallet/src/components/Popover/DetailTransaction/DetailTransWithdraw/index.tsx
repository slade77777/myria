import { Trans } from '@lingui/macro';
import moment from 'moment';
import React from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
import { FORMAT_DATE } from 'src/utils';
import { DF_TRANSACTION_TYPE, STATUS_HISTORY } from '../../L2Wallet/MainScreen';
interface TProps {
  transactionDetail: any;
}
enum Token {
  ETHEREUM = 'Ethereum',
}
export default function DetailTransWithdraw({ transactionDetail }: TProps) {
  const renderTitle = (transactionDetail: any) => {
    if (transactionDetail.status === STATUS_HISTORY.FAILED) {
      return DF_TRANSACTION_TYPE[transactionDetail?.type]?.titleFailed;
    }
    return DF_TRANSACTION_TYPE[transactionDetail?.type]?.titleHistoryDetail;
  };

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
        {renderTitle(transactionDetail)}
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
        {/* Withdraw token */}
        {transactionDetail.name !== Token.ETHEREUM && (
          <div className="mb-4 flex justify-between">
            <span className="text-base/9">
              <Trans>Item</Trans>
            </span>
            <span className="text-primary/6 ml-1">
              {transactionDetail.tokenName || 'NFT'}
            </span>
          </div>
        )}
        <div className="flex justify-between ">
          <span className="text-base/9">
            <Trans>Amount</Trans>
          </span>
          <span className="text-base/10 flex items-center">
            {transactionDetail.name === Token.ETHEREUM && (
              <DAOIcon size={16} className="mb-[2px]" />
            )}
            <span className="ml-1">{transactionDetail.amount}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
