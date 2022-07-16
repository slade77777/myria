import React from 'react';
import { InfoCircleIcon, Arrow2Icon, Arrow3Icon } from '../../Icons';

interface TProps {
  goBack: React.MouseEventHandler<HTMLButtonElement>;
  transactionDetail: any;
}

export default function TransactionHistoryDetailScreen({
  goBack,
  transactionDetail,
}: TProps) {
  return (
    <div className="mt-[29px] text-white">
      <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
        <Arrow3Icon
          direction="bottom"
          className="mr-1 text-[#9AC9E3]"
          size={60}
        />
      </div>

      <div className="mt-[24px] text-center text-[24px] text-white">
        {transactionDetail.type}
      </div>
      {transactionDetail.status === 'success' ? (
        <div className="text-center text-[14px] text-[#A1AFBA]">
          Transaction completed {transactionDetail.updatedAt}
        </div>
      ) : (
        <div className="text-center text-[14px] text-[#A1AFBA]">
          Transaction started {transactionDetail.createdAt}
        </div>
      )}

      <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[16px]">
        <div className="flex justify-between">
          <span className="text-[14px] text-[#A1AFBA]">Amount</span>
          <div className="flex items-center">
            <img
              src="/assets/images/eth.png"
              width={18}
              className="mr-2"
              alt="eth_image"
            />
            <span>{transactionDetail.amount}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-[14px] text-[#A1AFBA]">Transaction ID</span>
          <div className="flex items-center text-[#F5B941]">View</div>
        </div>
      </div>
    </div>
  );
}
