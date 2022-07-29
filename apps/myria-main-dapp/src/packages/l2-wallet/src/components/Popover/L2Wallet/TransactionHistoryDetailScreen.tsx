import React from 'react';
import { InfoCircleIcon, Arrow2Icon, Arrow3Icon } from '../../Icons';
import DAOIcon from 'src/components/icons/DAOIcon';
interface TProps {
  goBack: React.MouseEventHandler<HTMLButtonElement>;
  transactionDetail: any;
}

export default function TransactionHistoryDetailScreen({
  goBack,
  transactionDetail,
}: TProps) {
  return (
    <div className="text-base/10 mt-[29px]">
      <div className="mx-auto flex h-16 w-16 justify-center">
        <Arrow3Icon direction="bottom" className="text-blue/6 mr-1" size={60} />
      </div>

      <div className="text-base/10 mt-6 text-center text-2xl">
        {transactionDetail.type}
      </div>
      {transactionDetail.status === 'success' ? (
        <div className="text-base/9 text-center text-sm">
          Transaction completed {transactionDetail.updatedAt}
        </div>
      ) : (
        <div className="text-base/9 text-center text-sm">
          Transaction started {transactionDetail.createdAt}
        </div>
      )}

      <div className="bg-base/2 mt-8 rounded-lg p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-base/9">Amount</span>
          <span className="text-base/10 flex items-center">
            <DAOIcon size={12} className="mb-[2px]" />
            <span className="ml-1">{transactionDetail.amount}</span>
          </span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-base/9 text-sm">Transaction ID</span>
          <div className="text-primary/6 flex cursor-pointer items-center">
            View
          </div>
        </div>
      </div>
    </div>
  );
}
