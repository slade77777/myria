import React from 'react';
import { InfoCircleIcon, ProgressIcon } from '../../Icons';

type Props = {
  okHandler: any;
};

export default function WithdrawInProgressScreen({ okHandler }: Props) {
  return (
    <div className="mt-[29px]">
      <div className="flex w-[64px] h-[64px] justify-center mt-[57px] mx-auto">
        <ProgressIcon size={64} className="text-[#9ECEAB] w-full" />
      </div>

      <div className="text-center text-white text-[24px] mt-[24px]">
        Withdrawal in progress
      </div>
      <div className="bg-[#050E15] p-4 rounded-[8px] text-white text-[16px] mt-[32px]">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>2 ETH</span>
        </div>
        <div className="flex justify-between mt-[13px]">
          <span>Estimated completion</span>
          <span>10-20 hours</span>
        </div>
        <span className="text-[13px] text-[#777777]">Next batch in 15:20</span>
        <div className="flex justify-between mt-[13px]">
          <span>Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="flex py-4 px-[14px] border-[#D9D9D9] border rounded-[8px] mt-4">
        <div className="flex-none mr-[9px]">
          <InfoCircleIcon />
        </div>
        <div className="text-[#777777] text-[12px]">
          Your withdrawal is now in progress. You will receive a notification
          once your funds are ready to be claimed.
        </div>
      </div>
      <div className="mt-[78px] flex justify-end">
        <button
          className="text-[16px] text-[#040B10] w-[126px] bg-[#F5B941] px-[20px] py-[12px] font-bold rounded-[8px] flex justify-center items-center"
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
