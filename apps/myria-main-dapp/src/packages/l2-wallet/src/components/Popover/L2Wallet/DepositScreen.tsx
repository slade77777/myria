import { Trans } from '@lingui/macro';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import CurrencySelector, { TOption } from '../../Dropdown/CurrencySelector';

import DAOIcon from 'src/components/icons/DAOIcon';
import Tooltip from 'src/components/Tooltip';
import { ArrowIcon, InfoCircleIcon } from '../../Icons';
import MaxInput from '../../Input/MaxInput';

type Props = {
  goBack: any;
  selectCurrency: any;
  errorMessageAsset: string;
  balance: string;
  amount?: number;
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
  amount,
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
      <div className="-mt-8">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="text-base/10 ml-2 text-[20px]">Deposit</div>
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
                <span className="text-base/9 mr-1  text-sm">Available </span>
                <span className="mr-1">
                  <DAOIcon size={16} />
                </span>
                <span className="text-base/9  mr-1 text-sm">{balance}</span>
                <Tooltip>
                  <Tooltip.Trigger className="focus:outline-none">
                    <InfoCircleIcon className="text-base/1" size={18} />
                  </Tooltip.Trigger>
                  <Tooltip.Content className=" bg-base/5 ml-[-100px] max-w-[256px]">
                    <Tooltip.Arrow
                      className="fill-base/5 mr-[200px]"
                      width={16}
                      height={8}
                    />
                    <p className="text-base/9">
                      <Trans>
                        This is the amount you have available to deposit from
                        your L1 wallet.
                      </Trans>
                    </p>
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
          {inputChanged && errorAmount && (
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
              : 'text-gray/6  bg-gray/4',
          )}
          onClick={() => {
            if (isValidForm && amount != undefined) {
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
