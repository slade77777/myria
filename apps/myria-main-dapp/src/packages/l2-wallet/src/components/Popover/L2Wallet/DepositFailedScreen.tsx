import React from 'react';

import { CircleCloseIcon, ArrowIcon } from '../../Icons';

type Props = {
  depositRetryHandler: any;
  amount: number;
  goBack: any;
};

export default function DepositFailedScreen({
  depositRetryHandler,
  amount,
  goBack,
}: Props) {
  return (
    <div>
      <div className="text-center">
        <div
          className="mt-[-32px] flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="ml-2 text-[20px] text-white">Deposit</div>
        </div>
        <div className="mt-[35px] flex justify-center">
          <CircleCloseIcon className="text-[#F37272]" />
        </div>
        <div className="mt-8 text-[24px] font-bold text-white">
          Deposit failed
        </div>
        <div className="mt-4 text-center text-[14px] text-[#A1AFBA]">
          Your deposit could not be completed <br />
          due to an error.
        </div>

        <div className="mt-4 rounded-[8px] bg-[rgba(5,14,21,0.5)] p-4">
          <div className="flex items-center justify-between">
            <div className="text-[14px] text-[#A1AFBA]">Amount</div>
            <div className="flex items-center">
              <img
                width={16}
                height={16}
                src="/images/marketplace/eth.svg"
                alt="eth_token"
              />
              <span className="ml-1 text-[14px] text-white">{amount}</span>
            </div>
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
          onClick={depositRetryHandler}
          className="w-full rounded-[8px] bg-[#F5B941] py-[9px] text-center text-[14px] font-bold uppercase text-[#040B10]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
