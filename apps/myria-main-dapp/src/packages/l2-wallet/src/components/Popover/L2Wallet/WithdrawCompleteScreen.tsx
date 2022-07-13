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
      <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
        <TickCircleIcon size={64} className="w-full text-[#9ECEAB]" />
      </div>

      <div className="mt-[24px] text-center text-[24px] text-white">
        Withdrawal complete
      </div>
      <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[16px]">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>
            {amount} {selectedToken.short}
          </span>
        </div>
      </div>
      <div className="mt-4 flex rounded-[8px] border border-[#D9D9D9] py-4 px-[14px]">
        <div className="mr-[9px] flex-none">
          <InfoCircleIcon />
        </div>
        <div className="text-[12px] text-[#777777]">
          Your withdrawal is now complete. Click below to claim this withdrawal
          to your L1 wallet. Gas fees will apply to this transaction.
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          onClick={successHandler}
          className="flex w-full items-center justify-center rounded-[8px] bg-[#F5B941] py-[13px] pt-[15px] text-[16px] font-bold text-black"
        >
          CLAIM WITHDRAWAL
        </button>
      </div>
    </div>
  );
}
