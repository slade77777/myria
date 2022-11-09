import cn from 'classnames';
import { useEffect, useState } from 'react';

import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';
import MaxInput from '../../Input/MaxInput';

import { Trans } from '@lingui/macro';
import DAOIcon from 'src/components/icons/DAOIcon';
import Tooltip from 'src/components/Tooltip';
import { ArrowIcon, InfoCircleIcon } from '../../Icons';

type Props = {
  goBack: any;
  selectCurrency: any;
  errorMessageAsset: string;
  setAmountHandle: any;
  withdrawHandle: any;
  balance: string;
  amount?: number;
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
  amount,
}: Props) {
  const [inputChanged, setInputChanged] = useState(false);

  useEffect(() => {
    setWithdrawScreenMounted(true);
    return () => {
      setWithdrawScreenMounted(false);
    };
  }, [setWithdrawScreenMounted]);
  return (
    <>
      <div className="-mt-8 text-white">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="text-base/10 ml-2 text-[20px]">Withdraw</div>
        </div>
      </div>
      <div className="text-base/10 mt-6 grow">
        <div className="mb-2 text-base">Asset</div>
        <div>
          <CurrencySelector selectHandle={selectCurrency} options={options} />
          <div className="text-error/6">{errorMessageAsset}</div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex justify-between">
            <div className="text-sm">Amount</div>
            <div className="flex items-center text-base">
              <div className="flex items-center">
                <span className="text-base/9 mr-1 text-sm">Available </span>
                <span className="mr-1">
                  <DAOIcon size={16} />
                </span>
                <span className="text-base/9  mr-1 text-sm ">{balance}</span>
                <Tooltip>
                  <Tooltip.Trigger className="focus:outline-none">
                    <InfoCircleIcon className="text-blue/6" size={18} />
                  </Tooltip.Trigger>
                  <Tooltip.Content className="mf-10 max-w-[260px]">
                    <div className="bg-base/5 mf-10 absolute right-0 top-4 min-w-[260px] rounded-[8px] p-4 ">
                      <div className="bg-base/5 absolute right-2 -mt-5 h-3 w-3 rotate-45"></div>
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
            isValidForm={isValidForm}
          />
          {errorAmount && inputChanged && (
            <div className={'text-error/6 mt-2 text-sm'}>{errorAmount}</div>
          )}
        </div>
        <div className="text-base/8 mt-2 flex justify-between text-sm">
          <p>Estimated gas fee</p>
          <span className="flex items-center">
            <DAOIcon color={'#5A7486'} colorCenter="#5A7486" size={16} />
            0.0000431917
          </span>
        </div>
      </div>
      <div className="flex justify-between justify-self-end">
        <button
          className="border-base/9 flex h-10 w-full max-w-[126px] items-center justify-center rounded-lg border text-base font-bold text-white"
          onClick={() => {
            goBack();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex h-10 w-full max-w-[126px] items-center justify-center rounded-lg text-base font-bold',
            isValidForm && amount != undefined
              ? 'bg-primary/6 text-base/1'
              : 'text-gray/6 bg-gray/4',
          )}
          onClick={() => {
            if (isValidForm && amount != undefined) {
              withdrawHandle();
            }
          }}
        >
          NEXT
        </button>
      </div>
    </>
  );
}
