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
      <div className="flex justify-center mt-[57px]">
        <TickCircleIcon className="text-[#9ECEAB]" />
      </div>

      <div className="text-center text-white text-[24px] mt-[24px]">
        Deposit complete
      </div>
      <div className="bg-[rgba(154,201,227,0.1)] py-2 px-4 rounded-[8px] text-white text-[16px] mt-[32px]">
        <div className="flex justify-between">
          <span className="text-[rbga(255,255,255,0.6)]">Amount</span>
          <span>
            {amount} {selectedToken.short}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[rbga(255,255,255,0.6)]">Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="flex py-4 px-[14px] border-[rgba(154,201,227,0.2)] border rounded-[8px] mt-4">
        <div className="flex-none mr-[9px]">
          <InfoCircleIcon className="text-[#9AC9E3]" />
        </div>
        <div className="text-[#9AC9E3] text-[12px]">
          Your deposit is now complete and your funds have been added to your
          Myria wallet
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          onClick={() => {
            successHandler();
          }}
          className="text-[16px] text-white w-full bg-[#F5B941] pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center"
        >
          OK
        </button>
      </div>
    </div>
  );
}
