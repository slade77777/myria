import React from 'react';
import cn from 'classnames';
import { InfoCircleIcon, ProgressIcon } from '../../Icons';

type Props = {
  amount: number;
  cancelHandler: any;
  withdrawHandler: any;
  withdrawInProgress: boolean;
};

export default function WithdrawRequestScreen({
  amount,
  cancelHandler,
  withdrawHandler,
  withdrawInProgress,
}: Props) {
  return (
    <div className="mt-[29px] text-white">
      <div className="flex w-[64px] h-[64px] justify-center mt-[57px] mx-auto">
        <ProgressIcon
          size={64}
          className="text-[#9ECEAB] w-full"
          isNotAnimate={!withdrawInProgress}
        />
      </div>
      <div className="text-center text-[24px] mt-[24px]">
        Withdrawal to L1 wallet
      </div>
      <div className="bg-[#050E15] p-4 rounded-[8px] text-[16px] mt-[32px]">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>{amount} ETH</span>
        </div>
        <div className="flex justify-between mt-[13px]">
          <span>Estimated completion</span>
          <span>10-20 hours</span>
        </div>
      </div>
      <div className="flex py-4 px-[14px] border-[#D9D9D9] border rounded-[8px] mt-4">
        <div className="flex-none mr-[9px]">
          <InfoCircleIcon />
        </div>
        <div className="text-[#777777] text-[12px]">
          Withdrawal batch cycle is every 20 hours. Click here to learn more.
        </div>
      </div>
      <div className="mt-[55px] flex justify-between">
        <button
          className="text-[16px] text-[#F5B941] bg-transparent rounded-[8px] font-bold flex justify-center items-center"
          onClick={() => {
            cancelHandler();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'text-[16px]  w-[126px] px-[20px] py-[12px] font-bold rounded-[8px] flex justify-center items-center',
            withdrawInProgress
              ? 'bg-[#4B5563] #9CA3AF'
              : 'bg-[#F5B941] text-[#040B10]',
          )}
          disabled={withdrawInProgress}
          onClick={() => {
            withdrawHandler();
          }}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
