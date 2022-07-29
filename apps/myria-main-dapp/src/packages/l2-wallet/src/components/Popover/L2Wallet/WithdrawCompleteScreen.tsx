import React from 'react';
import DAOIcon from 'src/components/icons/DAOIcon';
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
      <div className="text-base/10">
        <div className="mx-auto mt-8 flex h-16 w-16 justify-center">
          <TickCircleIcon size={64} className="text-light-green w-full" />
        </div>
      </div>
      <div className="text-base/10 grow">
        <div className="text-base/10 mt-6 text-center text-2xl">
          Withdrawal complete
        </div>
        <div className="text-base/9 mt-4 px-7 text-center text-sm">
          Your withdrawal was successful, you should now see the funds in your
          L1 wallet.
        </div>
        <div className="bg-base/2 text-base/9 mt-8 rounded-lg p-4 text-sm">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="text-base/10 flex items-center">
              <DAOIcon size={12} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-base/9">Transaction ID</div>
            <div>
              <span className="text-primary/6">View</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[78px]">
        <button
          onClick={successHandler}
          className="bg-primary text-base/1 flex h-10 w-full items-center justify-center rounded-lg text-base font-bold"
        >
          CLAIM WITHDRAWAL
        </button>
      </div>
    </>
  );
}
