import React from 'react';
// @ts-ignore
import DAOIcon from 'src/components/icons/DAOIcon';
// @ts-ignore
import WithdrawalCompletedIcon from 'src/components/icons/WithdrawalCompletedIcon';

interface TProps {
  amount: number;
}

export default function WithdrawPendingScreen({ amount }: TProps) {
  return (
    <>
      <div className="grow">
        <div className="px-6">
          <div className="mx-auto mt-14 flex h-16 w-16 justify-center">
            <WithdrawalCompletedIcon
              size={64}
              className="text-light-green w-full"
            />
          </div>

          <div className="mt-6 text-center text-2xl text-white">
            Complete your withdrawal
          </div>
          <div className="text-gray/6 mt-4 text-center text-sm">
            <span>
              Click below to claim this withdrawal to your L1 wallet. Gas fees
              will apply to this transaction.
            </span>
          </div>
        </div>
        <div className="bg-base/2/50 mt-8 rounded-lg p-4 text-sm text-white">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="flex items-center">
              {' '}
              <DAOIcon size={14} /> {amount}
            </span>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="flex items-center gap-1">Estimated gas fee</span>
            <span className="flex items-center">
              <DAOIcon size={14} />
              0.000561
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          disabled={true}
          className="bg-gray/4 text-gray/6 flex w-full items-center justify-center rounded-lg px-5 py-3 text-base font-bold"
        >
          <span>WITHDRAW PENDING</span>
        </button>
      </div>
    </>
  );
}
