import React, { useEffect } from 'react';
import cn from 'classnames';
import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';

import MaxInput from '../../Input/MaxInput';
import { ArrowIcon, InfoCircleIcon } from '../../Icons';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
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
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="mt-6">
        <div className="mb-2 text-[16px] text-white">Asset</div>
        <div>
          <CurrencySelector selectHandle={selectCurrency} options={options} />
          <div className="text-[#F83D5C]">{errorMessageAsset}</div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex justify-between">
            <div className="text-[16px] text-white">Amount</div>
            <div className="flex items-center text-[16px] text-[rgba(255,255,255,0.6)]">
              <div className="mr-[5px] flex items-center">
                <span className="mr-1 text-[#4C4C4C]">Available: </span>
                <span className="mr-1">
                  <DAOIcon size={16} />
                </span>
                <span className="mr-1">{balance}</span>
                <InfoCircleIcon className="text-[#9AC9E3]" />
              </div>
            </div>
          </div>
          <MaxInput
            max={parseFloat(balance)}
            onChangeHandle={setAmountHandle}
          />
          <div className="mt-2 text-[#F83D5C]">{errorAmount}</div>
        </div>
        <div className=" mt-2 flex justify-between text-[14px] text-[rgba(255,255,255,0.6)]">
          <p>Estimated gas fee</p>
          <p>0.0431917 ETH</p>
        </div>
      </div>
      <div className="mt-[145px] flex justify-between">
        <button
          className="border-base/9 flex w-full max-w-[126px] items-center justify-center rounded-[8px] border py-[13px] pt-[15px] text-[16px] font-bold text-white"
          onClick={() => {
            goBack();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex w-full max-w-[126px] items-center justify-center rounded-[8px] py-[13px] pt-[15px] text-[16px] font-bold text-white',
            isValidForm ? 'bg-[#F5B941] text-[#040B10]' : 'bg-[#737373]',
          )}
          onClick={() => {
            if (isValidForm) {
              gotoProgressScreen();
            }
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
