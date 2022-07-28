import React from 'react';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import { TickCircleIcon } from '../../Icons';

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
    <>
      <div className="text-white">
        <div className="mx-auto mt-8 flex h-[64px] w-[64px] justify-center">
          <TickCircleIcon size={64} className="w-full text-[#9ECEAB]" />
        </div>
      </div>
      <div className="grow text-white">
        <div className="mt-[24px] text-center text-[24px] text-white">
          Withdrawal complete
        </div>
        <div className="mt-4 px-[29px] text-center text-[14px] text-[#A1AFBA]">
          Your withdrawal was successful, you should now see the funds in your
          L1 wallet.
        </div>
        <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[14px] text-[#A1AFBA]">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="flex items-center text-white">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[#A1AFBA]">Transaction ID</div>
            <div>
              <span className="text-[#F5B941]">View</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          onClick={successHandler}
          className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-[#F5B941] text-[16px] font-bold text-black"
        >
          CLAIM WITHDRAWAL
        </button>
      </div>
    </>
  );
}
