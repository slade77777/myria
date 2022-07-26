import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';
import { Trans } from '@lingui/macro';

import MaxInput from '../../Input/MaxInput';
import { ArrowIcon, InfoCircleIcon } from '../../Icons';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import Tooltip from '../../../../../../components/Tooltip';

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
  const [inputChanged, setInputChanged] = useState(false);
  useEffect(() => {
    setDepositScreenMounted(true);
    return () => {
      setDepositScreenMounted(false);
    };
  }, [setDepositScreenMounted]);
  return (
    <>
      <div className="mt-[-32px] grow">
        <div
          className="flex cursor-pointer items-center"
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
                  <Tooltip>
                    <Tooltip.Trigger className="focus:outline-none">
                      <InfoCircleIcon className="text-[#9AC9E3]" />
                    </Tooltip.Trigger>
                    <Tooltip.Content className="mf-10 max-w-[256px]">
                      <div className="bg-base/5 mf-10 absolute right-0 top-2 min-w-[256px] rounded-[8px]  p-4 ">
                        <div className="bg-base/5 absolute right-10 -mt-6  h-4 w-4 rotate-45"></div>
                        <Tooltip.Arrow />
                        <p className="text-base/9">
                          <Trans>
                            This is the amount you have available to deposit
                            from your L1 wallet.
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
            {inputChanged && errorAmount && (
              <div className="mt-2 text-[#F83D5C]">{errorAmount}</div>
            )}
          </div>
          <div className=" mt-2 flex justify-between text-[14px] text-[rgba(255,255,255,0.6)]">
            <p>Estimated gas fee</p>
            <p>0.0431917 ETH</p>
          </div>
        </div>
      </div>
      <div className="mb-[10px] flex justify-between justify-self-end">
        <button
          className="border-base/9 flex w-full max-w-[126px] items-center justify-center rounded-[8px] border py-[9px] px-9 text-[16px] font-bold text-white"
          onClick={() => {
            goBack();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex w-full max-w-[126px] items-center justify-center rounded-[8px] py-[9px] px-9 text-[16px] font-bold text-white',
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
    </>
  );
}
