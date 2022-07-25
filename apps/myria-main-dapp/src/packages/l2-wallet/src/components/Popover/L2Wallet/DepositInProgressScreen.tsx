import React from 'react';
import cn from 'classnames';
import { InfoCircleIcon, ProgressIcon, ArrowIcon } from '../../Icons';

type Props = {
  amount: number;
  selectedToken: any;
  depositInProgress: boolean;
  successHandler: any;
  goBack: any;
};

export default function DepositInProgressScreen({
  amount,
  selectedToken,
  depositInProgress,
  successHandler,
  goBack,
}: Props) {
  return (
    <div>
      <div
        className="mt-[-32px] flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
        <ProgressIcon size={64} className="w-full text-[#9AC9E3]" />
      </div>
      <div className="mt-[24px] text-center text-[24px] text-white">
        Deposit in progress
      </div>
      <div className="mt-4 px-[29px] text-center text-[14px] text-[#A1AFBA]">
        You will receive a notification once the deposit is complete
      </div>
      <div className="mt-4 rounded-[8px] bg-[rgba(5,14,21,0.5)] py-2 px-4 text-[16px] text-white">
        <div className="flex justify-between">
          <span className="text-[rgba(255,255,255,0.6)]">Amount</span>
          <span>
            {amount} {selectedToken.short}
          </span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span className="text-[rgba(255,255,255,0.6)]">
            Estimated completion
          </span>
          <span>1-2 minutes</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span className="text-[rgba(255,255,255,0.6)]">Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      {/* <div className="mt-4 flex rounded-[8px] border border-[#D9D9D9] py-4 px-[14px]">
        <div className="mr-[9px] flex-none">
          <InfoCircleIcon />
        </div>
        <div className="text-[12px] text-[#777777]">
          Your deposit has been confirmed and is now in progress. You will
          receive a notification once the deposit is complete.
        </div>
      </div> */}
      <div className="mt-[103px]">
        <button
          disabled={depositInProgress}
          className={cn(
            'flex w-full items-center justify-center rounded-[8px] py-[13px] pt-[15px] text-[16px] font-bold',
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
