import React from 'react';
import { InfoCircleIcon, TickCircleIcon } from '../../Icons';

interface TProps {
  successHandler: React.MouseEventHandler<HTMLButtonElement>;
  amount: any;
  selectedToken: any;
}

export default function WithdrawCompleteScreen({
  successHandler,
  amount,
  selectedToken,
}: TProps) {
  return (
    <div className="mt-[29px] text-white">
      <div className="flex w-[64px] h-[64px] justify-center mt-[57px] mx-auto">
        <TickCircleIcon size={64} className="text-[#9ECEAB] w-full" />
      </div>

      <div className="text-center text-white text-[24px] mt-[24px]">
        Withdrawal complete
      </div>
      <div className="bg-[#050E15] p-4 rounded-[8px] text-[16px] mt-[32px]">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>
            {amount} {selectedToken.short}
          </span>
        </div>
      </div>
      <div className="flex py-4 px-[14px] border-[#D9D9D9] border rounded-[8px] mt-4">
        <div className="flex-none mr-[9px]">
          <InfoCircleIcon />
        </div>
        <div className="text-[#777777] text-[12px]">
          Your withdrawal is now complete. Click below to claim this withdrawal
          to your L1 wallet. Gas fees will apply to this transaction.
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          onClick={successHandler}
          className="text-[16px] text-black w-full bg-[#F5B941] pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center"
        >
          CLAIM WITHDRAWAL
        </button>
      </div>
    </div>
  );
}
