import React, { useMemo, useState } from 'react';
// @ts-ignore
import DAOIcon from 'src/components/icons/DAOIcon';
// @ts-ignore
import WithdrawalCompletedIcon from 'src/components/icons/WithdrawalCompletedIcon';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { useSelector } from 'react-redux';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { ConfirmationType } from 'myria-core-sdk';
import Button from 'src/components/core/Button';
import ProgressIcon from 'src/components/icons/ProgressIcon';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useL2WalletContext } from 'src/context/l2-wallet';

const starkwareLib = require('@starkware-industries/starkware-crypto-utils');
const asset = starkwareLib.asset;
interface TProps {
  transactionDetail: any;
  successHandler: (claimAmount: string) => void;
}
const QUANTUM_CONSTANT = 10000000000;

export default function WithdrawNowScreen({
  transactionDetail,
  successHandler,
}: TProps) {
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(
    localStorageKeys.starkKey,
    '',
  );
  const { showWithdrawCompleteScreen } = useL2WalletContext();

  const connectedAccount = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );

  const [isProcess, setIsProcess] = useState(false);

  const BUTTON_BG = useMemo(() => {
    return !isProcess ? 'btn-primary' : 'btn-disabled';
  }, [isProcess]);

  const withdrawEthNow = async () => {
    try {
      setIsProcess(true);
      let responseWithdraw: any = null;
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const withdrawModule = moduleFactory.getWithdrawModule();
      const assetType = asset.getAssetType({
        type: 'ETH',
        data: {
          quantum: QUANTUM_CONSTANT.toString(),
        },
      });
      responseWithdraw = await withdrawModule.withdrawalOnchain(
        {
          starkKey: connectedAccount,
          assetType,
        },
        {
          from: connectedAccount,
          nonce: new Date().getTime(),
          confirmationType: ConfirmationType.Sender,
        },
      );

      if (responseWithdraw) {
        setIsProcess(false);
        const transactionModule = moduleFactory.getTransactionModule();
        const result = await transactionModule.updateTransactionComplete({
          starkKey: `0x${localStarkKey}`,
          transactionId: Number(transactionDetail.transactionId),
          transactionHash: responseWithdraw.transactionHash,
        });
        console.log('Withdraw result complete ->', result);
        showWithdrawCompleteScreen({
          transactionHash: responseWithdraw.transactionHash,
          claimAmount: transactionDetail?.ethAmount,
        });
        successHandler(transactionDetail.ethAmount);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <DAOIcon size={14} /> {transactionDetail?.ethAmount}
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
        <Button
          onClick={withdrawEthNow}
          disabled={isProcess}
          className={clsx('btn-lg  w-full px-10', BUTTON_BG)}
        >
          {isProcess && <ProgressIcon size={23} />}
          <span className="text-base/1 ml-1">
            <Trans>WITHDRAW NOW</Trans>
          </span>
        </Button>
      </div>
    </>
  );
}
