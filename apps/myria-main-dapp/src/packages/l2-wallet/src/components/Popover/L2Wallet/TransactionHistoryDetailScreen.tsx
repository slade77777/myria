import React, {  } from 'react';
import {
  TRANSACTION_TYPE,
} from './MainScreen';
import DetailTransDeposit from '../DetailTransaction/DetailTransDeposit';
import DetailTransPurchase from '../DetailTransaction/DetailTransPurchase';
import DetailTransTransfer from '../DetailTransaction/DetailTransTransfer';
import DetailTransMint from '../DetailTransaction/DetailTransMint';
import DetailTransRoyaltyTransfer from '../DetailTransaction/DetailTransRoyaltyTransfer';
import DetailTransWithdraw from '../DetailTransaction/DetailTransWithdraw';
interface TProps {
  goBack: React.MouseEventHandler<HTMLButtonElement>;
  transactionDetail: any;
  starkKeyUser: string;
}
export default function TransactionHistoryDetailScreen({
  transactionDetail,
  starkKeyUser,
}: TProps) {

  const lookupRenderer = {
    [TRANSACTION_TYPE.SETTLEMENT]: <DetailTransPurchase transactionDetail={transactionDetail} starkKeyUser={starkKeyUser} />,
    [TRANSACTION_TYPE.DEPOSIT]: <DetailTransDeposit transactionDetail={transactionDetail} />,
    [TRANSACTION_TYPE.TRANSFER]: <DetailTransTransfer transactionDetail={transactionDetail} />,
    [TRANSACTION_TYPE.ROYALTYTRANSFER]: <DetailTransRoyaltyTransfer transactionDetail={transactionDetail} />,
    [TRANSACTION_TYPE.MINT]: <DetailTransMint transactionDetail={transactionDetail} />,
    [TRANSACTION_TYPE.WITHDRAWAL]: <DetailTransWithdraw transactionDetail={transactionDetail} />,
  }
  return (
    <div className="text-base/10 mt-[29px]">
    {lookupRenderer[transactionDetail.type]}
    </div>
  );
}
