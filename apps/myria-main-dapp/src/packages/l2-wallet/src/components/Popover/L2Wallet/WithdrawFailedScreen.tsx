import DAOIcon from 'src/components/icons/DAOIcon';

import { CircleCloseIcon } from '../../Icons';

type Props = {
  withdrawRetryHandler: any;
  amount: number;
};

export default function WithdrawFailedScreen({
  withdrawRetryHandler,
  amount,
}: Props) {
  return (
    <div>
      <div className="text-center">
        <div className="flex justify-center">
          <CircleCloseIcon className="text-[#F37272]" />
        </div>
        <div className="mt-6 text-[24px] font-bold text-white">
          Withdraw failed
        </div>
        <div className="mt-4 text-center text-[14px] text-[#A1AFBA]">
          Your withdraw could not be completed <br />
          due to an error.
        </div>

        <div className="mt-6 rounded-[8px] bg-[rgba(5,14,21,0.5)] p-4">
          <div className="flex items-center justify-between text-[#A1AFBA]">
            <div className="text-[14px]">Amount</div>
            <span className="flex items-center text-white">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[14px] text-[#A1AFBA]">Transaction ID</div>
            <div>
              <span className="text-[14px] text-[#F5B941]">View</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[24px] w-[calc(100%-48px)]">
        <button
          onClick={withdrawRetryHandler}
          className="h-[40px] w-full rounded-[8px] bg-[#F5B941] text-center text-[14px] font-bold uppercase text-[#040B10]"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
