import React from 'react';
import cn from 'classnames';
import { InfoCircleIcon, ProgressIcon } from '../../Icons';

type Props = {
  amount: number;
  selectedToken: any;
  depositInProgress: boolean;
  successHandler: any;
};

export default function DepositInProgressScreen({
  amount,
  selectedToken,
  depositInProgress,
  successHandler,
}: Props) {
  return (
    <div className="mt-[29px]">
      <div className="flex w-[64px] h-[64px] justify-center mt-[57px] mx-auto">
        <ProgressIcon size={64} className="text-[#777777] w-full" />
      </div>
      <div className="text-center text-white text-[24px] mt-[24px]">
        Deposit in progress
      </div>
      <div className="bg-[rgba(5,14,21,0.5)] py-2 px-4 rounded-[8px] text-white text-[16px] mt-[32px]">
        <div className="flex justify-between">
          <span className="text-[rgba(255,255,255,0.6)]">Amount</span>
          <span>
            {amount} {selectedToken.short}
          </span>
        </div>
        <div className="flex justify-between mt-[13px]">
          <span className="text-[rgba(255,255,255,0.6)]">
            Estimated completion
          </span>
          <span>1-2 minutes</span>
        </div>
        <div className="flex justify-between mt-[13px]">
          <span className="text-[rgba(255,255,255,0.6)]">Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="flex py-4 px-[14px] border-[#D9D9D9] border rounded-[8px] mt-4">
        <div className="flex-none mr-[9px]">
          <InfoCircleIcon />
        </div>
        <div className="text-[#777777] text-[12px]">
          Your deposit has been confirmed and is now in progress. You will
          receive a notification once the deposit is complete.
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          disabled={depositInProgress}
          className={cn(
            'text-[16px] w-full pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center',
            depositInProgress
              ? 'bg-[#737373] text-white'
              : 'bg-[#F5B941] text-[#040B10]',
          )}
          onClick={() => {
            successHandler();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
