import React from 'react';
import { InfoCircleIcon, ProgressIcon } from '../../Icons';

type Props = {
  okHandler: any;
};

export default function WithdrawInProgressScreen({ okHandler }: Props) {
  return (
    <div className="mt-[29px]">
      <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
        <ProgressIcon size={64} className="w-full text-[#9ECEAB]" />
      </div>

      <div className="mt-[24px] text-center text-[24px] text-white">
        Withdrawal in progress
      </div>
      <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[16px] text-white">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>2 ETH</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span>Estimated completion</span>
          <span>10-20 hours</span>
        </div>
        <span className="text-[13px] text-[#777777]">Next batch in 15:20</span>
        <div className="mt-[13px] flex justify-between">
          <span>Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="mt-4 flex rounded-[8px] border border-[#D9D9D9] py-4 px-[14px]">
        <div className="mr-[9px] flex-none">
          <InfoCircleIcon />
        </div>
        <div className="text-[12px] text-[#777777]">
          Your withdrawal is now in progress. You will receive a notification
          once your funds are ready to be claimed.
        </div>
      </div>
      <div className="mt-[78px] flex justify-end">
        <button
          className="flex w-[126px] items-center justify-center rounded-[8px] bg-[#F5B941] px-[20px] py-[12px] text-[16px] font-bold text-[#040B10]"
          onClick={() => {
            okHandler();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
