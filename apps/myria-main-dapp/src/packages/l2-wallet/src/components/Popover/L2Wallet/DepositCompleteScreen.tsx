import React from 'react';
import { InfoCircleIcon, TickCircleIcon } from '../../Icons';

type Props = {
  amount: Number;
  successHandler: any;
  selectedToken: any;
};

export default function DepositCompleteScreen({
  amount,
  successHandler,
  selectedToken,
}: Props) {
  return (
    <div className="mt-[29px]">
      <div className="mt-[57px] flex justify-center">
        <TickCircleIcon className="text-[#9ECEAB]" />
      </div>

      <div className="mt-[24px] text-center text-[24px] text-white">
        Deposit complete
      </div>
      <div className="text-base/9 mt-4 text-center text-[14px]">
        Your funds are now available in your Myria wallet.
      </div>
      <div className="mt-[32px] rounded-[8px] bg-[rgba(154,201,227,0.1)] py-2 px-4 text-[16px] text-white">
        <div className="flex justify-between">
          <span className="text-[rbga(255,255,255,0.6)]">Amount</span>
          <span>
            {amount} {selectedToken.short}
          </span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-[rbga(255,255,255,0.6)]">Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="mt-4 flex rounded-[8px] border border-[rgba(154,201,227,0.2)] py-4 px-[14px]">
        <div className="mr-[9px] flex-none">
          <InfoCircleIcon className="text-[#9AC9E3]" />
        </div>
        <div className="text-[12px] text-[#9AC9E3]">
          Your deposit is now complete and your funds have been added to your
          Myria wallet
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          onClick={() => {
            successHandler();
          }}
          className="flex w-full items-center justify-center rounded-[8px] bg-[#F5B941] py-[13px] pt-[15px] text-[16px] font-bold text-white"
        >
          OK
        </button>
      </div>
    </div>
  );
}
