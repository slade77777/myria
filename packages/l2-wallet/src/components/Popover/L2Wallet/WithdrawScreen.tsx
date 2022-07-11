import React, { useEffect } from 'react';
import cn from 'classnames';

import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';
import MaxInput from '../../Input/MaxInput';

import { ArrowIcon, InfoCircleIcon } from '../../Icons';

type Props = {
  goBack: any;
  selectCurrency: any;
  errorMessageAsset: string;
  setAmountHandle: any;
  withdrawHandle: any;
  balance: string;
  options: Array<TOption>;
  setWithdrawScreenMounted: any;
  isValidForm: any;
  errorAmount: any;
};

export default function WithdrawScreen({
  goBack,
  selectCurrency,
  errorMessageAsset,
  setAmountHandle,
  withdrawHandle,
  balance,
  options,
  setWithdrawScreenMounted,
  isValidForm,
  errorAmount,
}: Props) {
  useEffect(() => {
    setWithdrawScreenMounted(true);
    return () => {
      setWithdrawScreenMounted(false);
    };
  }, [setWithdrawScreenMounted]);
  return (
    <div className="mt-[29px] text-white">
      <div
        className="flex items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="text-white text-[20px] ml-2">Withdraw</div>
      </div>
      <div className="mt-6">
        <div className="text-white text-[16px] mb-2">Asset</div>
        <div>
          <CurrencySelector selectHandle={selectCurrency} options={options} />
          <div className="text-[#F83D5C]">{errorMessageAsset}</div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <div className="text-[16px] mb-2">Amount</div>
            <div className="flex items-center text-[16px]">
              <div className="mr-[5px]">
                <span className="text-[#4C4C4C]">Available</span> {balance}
              </div>
              <InfoCircleIcon className="text-[#9AC9E3]" />
            </div>
          </div>
          <MaxInput max={100} onChangeHandle={setAmountHandle} />
          <div className="text-[#F83D5C]">{errorAmount}</div>
        </div>
        <div className=" mt-2 flex justify-between text-[14px] text-[rgba(255,255,255,0.6)]">
          <p>Estimated gas fee</p>
          <p>0.0431917 ETH</p>
        </div>
      </div>
      <div className="mt-[145px] flex justify-between">
        <button className="text-[16px] text-[#F5B941] font-bold rounded-[8px] flex justify-center items-center">
          CANCEL
        </button>
        <button
          className={cn(
            'text-[16px] text-black w-[126px] px-[20px] py-[12px] font-bold rounded-[8px] flex justify-center items-center',
            isValidForm
              ? 'bg-[#F5B941] text-[#040B10]'
              : 'bg-[#4B5563] text-white',
          )}
          onClick={() => {
            if (isValidForm) {
              withdrawHandle();
            }
          }}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
