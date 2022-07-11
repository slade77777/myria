import React, { useEffect } from 'react';
import cn from 'classnames';
import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';

import MaxInput from '../../Input/MaxInput';
import { ArrowIcon } from '../../Icons';

type Props = {
  goBack: any;
  selectCurrency: any;
  errorMessageAsset: string;
  balance: string;
  setAmountHandle: any;
  selectedToken: any;
  isValidForm: any;
  errorAmount: any;
  gotoProgressScreen: any;
  options: Array<TOption>;
  setDepositScreenMounted: any;
};

export default function DepositScreen({
  goBack,
  selectCurrency,
  errorMessageAsset,
  balance,
  setAmountHandle,
  selectedToken,
  isValidForm,
  errorAmount,
  gotoProgressScreen,
  options,
  setDepositScreenMounted,
}: Props) {
  useEffect(() => {
    setDepositScreenMounted(true);
    return () => {
      setDepositScreenMounted(false);
    };
  }, [setDepositScreenMounted]);
  return (
    <div className="mt-[29px]">
      <div
        className="flex items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="text-white text-[20px] ml-2">Deposit</div>
      </div>
      <div className="mt-6">
        <div className="text-white text-[16px] mb-2">Asset</div>
        <div>
          <CurrencySelector selectHandle={selectCurrency} options={options} />
          <div className="text-[#F83D5C]">{errorMessageAsset}</div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <div className="text-white text-[16px] mb-2">Amount</div>
            <div className="text-[rgba(255,255,255,0.6)] text-[16px]">
              Available:{' '}
              <span className="text-white">
                {balance} {selectedToken?.short}
              </span>
            </div>
          </div>
          <MaxInput
            max={parseFloat(balance)}
            onChangeHandle={setAmountHandle}
          />
          <div className="text-[#F83D5C]">{errorAmount}</div>
        </div>
        <div className=" mt-2 flex justify-between text-[14px] text-[rgba(255,255,255,0.6)]">
          <p>Estimated gas fee</p>
          <p>0.0431917 ETH</p>
        </div>
      </div>
      <div className="mt-[145px]">
        <button
          className={cn(
            'text-[16px] text-white w-full pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center',
            isValidForm ? 'bg-[#F5B941] text-[#040B10]' : 'bg-[#737373]',
          )}
          onClick={() => {
            if (isValidForm) {
              gotoProgressScreen();
            }
          }}
        >
          CONFIRM DEPOSIT
        </button>
        <button
          className="text-[16px] text-[#777777] w-full border-[#777777] pt-[15px] py-[13px] font-bold rounded-[8px] flex justify-center items-center"
          onClick={() => {
            goBack();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
