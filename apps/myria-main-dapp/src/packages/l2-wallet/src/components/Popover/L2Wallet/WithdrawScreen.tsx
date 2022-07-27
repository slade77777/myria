import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';
import MaxInput from '../../Input/MaxInput';

import { ArrowIcon, InfoCircleIcon } from '../../Icons';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import Tooltip from '../../../../../../components/Tooltip';
import { Trans } from '@lingui/macro';

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
  const [inputChanged, setInputChanged] = useState(false);

  useEffect(() => {
    setWithdrawScreenMounted(true);
    return () => {
      setWithdrawScreenMounted(false);
    };
  }, [setWithdrawScreenMounted]);
  return (
    <div className="mt-[29px] text-white">
      <div
        className="flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Withdraw</div>
      </div>
      <div className="mt-6">
        <div className="mb-2 text-[16px] text-white">Asset</div>
        <div>
          <CurrencySelector selectHandle={selectCurrency} options={options} />
          <div className="text-[#F83D5C]">{errorMessageAsset}</div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <div className="mb-2 text-[16px]">Amount</div>
            <div className="flex items-center text-[16px]">
              <div className="mr-[5px] flex items-center">
                <span className="mr-1 text-[#4C4C4C]">Available: </span>
                <span className="mr-1">
                  <DAOIcon size={16} />
                </span>
                <span className="mr-1">{balance}</span>
                <Tooltip>
                  <Tooltip.Trigger className="focus:outline-none">
                    <InfoCircleIcon className="text-[#9AC9E3]" />
                  </Tooltip.Trigger>
                  <Tooltip.Content className="mf-10 max-w-[260px]">
                    <div className="bg-base/5 mf-10 absolute right-0 top-4 min-w-[260px] rounded-[8px]  p-4 ">
                      <div className="bg-base/5 absolute right-2 -mt-5   h-3 w-3 rotate-45"></div>
                      <p className="text-base/9">
                        <Trans>
                          This is the amount available to withdraw from your L2
                          Myria wallet
                        </Trans>
                      </p>
                    </div>
                  </Tooltip.Content>
                </Tooltip>
              </div>
            </div>
          </div>
          <MaxInput
            max={parseFloat(balance)}
            onChangeHandle={(value: any) => {
              setInputChanged(true);
              setAmountHandle(value);
            }}
          />
          {errorAmount && inputChanged && (
            <div className="mt-2 text-[#F83D5C]">{errorAmount}</div>
          )}
        </div>
        <div className=" mt-2 flex justify-between text-[14px] text-[rgba(255,255,255,0.6)]">
          <p>Estimated gas fee</p>
          <p>0.0431917 ETH</p>
        </div>
      </div>
      <div className="mt-[145px] flex justify-between">
        <button
          className="flex items-center justify-center rounded-[8px] text-[16px] font-bold text-[#F5B941]"
          onClick={() => {
            goBack();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex w-[126px] items-center justify-center rounded-[8px] px-[20px] py-[12px] text-[16px] font-bold text-black',
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
