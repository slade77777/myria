import { Trans } from '@lingui/macro';
import moment from 'moment';
import DAOIcon from 'src/components/icons/DAOIcon';
import { FORMAT_DATE } from 'src/utils';
import { convertQuantizedAmountToEth } from '../../../../utils/Converter';
import ArrowRightLeftIcon from '../../../Icons/ArrowRightLeftIcon';
import { DF_TRANSACTION_TYPE, STATUS_HISTORY } from '../../L2Wallet/MainScreen';
import { ToolTipInfo } from '../ToolTipInfo';
interface TProps {
  transactionDetail: any;
  starkKeyUser: string;
}
export default function DetailTransPurchase({
  transactionDetail,
  starkKeyUser,
}: TProps) {
  const renderTitle = (transactionDetail: any) => {
    const startKey = `0x${starkKeyUser}`;

    if (transactionDetail.partyAOrder?.publicKey === startKey) {
      // Sell
      return 'NFT Sale';
    }
    if (transactionDetail.status === STATUS_HISTORY.FAILED) {
      return DF_TRANSACTION_TYPE[transactionDetail.type].titleFailed;
    }
    return DF_TRANSACTION_TYPE[transactionDetail.type].titleHistoryDetail;
  };

  return (
    <div className="text-base/10 mt-[29px]">
      {/* Icon */}
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
        {/* Purchase, Sell */}
        <div className="mb-4 flex justify-between">
          <span className="text-base/9">
            <Trans>Item</Trans>
          </span>
          <span className="text-primary/6 ml-1">NFT</span>
        </div>
        {/* Purchase, Sell */}
        <>
          <div className="mb-4 flex justify-between">
            <span className="text-base/9">
              <Trans>Total sale price</Trans>
            </span>
            <span className="text-base/10 flex items-center">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">
                {convertQuantizedAmountToEth(
                  transactionDetail.partyBOrder.amountSell,
                )}
              </span>
            </span>
          </div>
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
