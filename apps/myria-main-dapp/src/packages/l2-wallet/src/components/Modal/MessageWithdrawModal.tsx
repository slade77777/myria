// import packages
import cn from 'classnames';
import { ConfirmationType } from 'myria-core-sdk';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';

// Import components
import CheckIcon from '../Icons/CheckIcon';

// Import Redux
import { RootState } from '../../app/store';
import CrossIcon from '../Icons/CrossIcon';

const QUANTUM_CONSTANT = 10000000000;

import { localStorageKeys } from 'src/configs';
import { useL2WalletContext } from 'src/context/l2-wallet';
import useLocalStorage from 'src/hooks/useLocalStorage';
import useTransactionList from 'src/hooks/useTransactionList';
import { setWithdrawClaimModal } from '../../app/slices/uiSlice';
import { getModuleFactory } from '../../services/myriaCoreSdk';
import {
  STATUS_HISTORY,
  TRANSACTION_TYPE,
} from '../Popover/L2Wallet/MainScreen';
type Props = {
  isShowMessage: Boolean;
  setIsShowMessage: (arg0: Boolean) => void;
};

export default function MessageWithdrawModal({
  isShowMessage,
  setIsShowMessage,
}: Props) {
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(
    localStorageKeys.starkKey,
    '',
  );
  const [walletAddress, setWalletAddress] = useLocalStorage(
    localStorageKeys.walletAddress,
    '',
  );
  const { transactionHistoryData, refetch: refetchTransactionList } =
    useTransactionList(localStarkKey);
  const claimAmount = useSelector((state: RootState) => state.ui.claimAmount);
  const [withdrawProgress, setWithdrawProgress] = useState(false);

  const { showWithdrawCompleteScreen, handleDisplayPopover } =
    useL2WalletContext();
  const dispatch = useDispatch();
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };

  const claim = async () => {
    if (!walletAddress) return;
    const transactions: any = transactionHistoryData?.filter(
      (item: any, index: number) =>
        item.transactionType === TRANSACTION_TYPE.WITHDRAWAL &&
        item.tokenType === 'ETH' &&
        item.transactionStatus === STATUS_HISTORY.SUCCESS,
    );

    let responseWithdraw: any = null;
    try {
      setWithdrawProgress(true);
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
          starkKey: walletAddress,
          assetType,
        },
        {
          from: walletAddress,
          nonce: new Date().getTime(),
          confirmationType: ConfirmationType.Confirmed,
        },
      );
      if (responseWithdraw) {
        handleDisplayPopover(true);
        if (
          transactions &&
          transactions?.length > 0 &&
          transactions[0]?.transactionId
        ) {
          try {
            const transactionModule = moduleFactory.getTransactionModule();
            const result = await transactionModule.updateTransactionComplete({
              starkKey: `0x${localStarkKey}`,
              transactionId: Number(transactions[0]?.transactionId),
              transactionHash: responseWithdraw.transactionHash,
            });
            console.log('Withdraw result complete ->', result);
          } catch (ex) {
            console.log('Transaction complete failed', ex);
          }
        }

        showWithdrawCompleteScreen({
          isShow: false,
          transactionHash: responseWithdraw.transactionHash,
          claimAmount,
        });
        refetchTransactionList();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWithdrawProgress(false);
      dispatch(
        setWithdrawClaimModal({
          show: false,
          claimAmount: 0,
          isUpdated: false,
        }),
      );
    }
  };

  return (
    <div
      className={cn(
        `absolute top-20 right-5 w-[406px]`,
        isShowMessage ? 'block' : 'hidden',
      )}
    >
      <div className="bg-base/4 w-full max-w-lg rounded-lg p-8 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400">
        <div className="flex">
          <CheckIcon className="mt-1 text-[#367641]" size={24} />
          <div className="ml-3 grow font-normal leading-normal text-white">
            <span className="mb-1 text-lg font-semibold leading-normal dark:text-white">
              Your withdrawal is complete
            </span>
            <div className="text-base/9 mt-[10px] mb-5 text-sm font-normal">
              Your withdrawal of{' '}
              <span className="uppercase text-white">
                ${claimAmount} eth &nbsp;
              </span>
              is now complete and ready to claim.
            </div>
            <div className="flex justify-start">
              <button
                disabled={
                  parseFloat(claimAmount.toString()) === 0 || withdrawProgress
                }
                className={cn(
                  'rounded font-semibold',
                  parseFloat(claimAmount.toString()) === 0 || withdrawProgress
                    ? 'text-gray/6 cursor-not-allowed'
                    : 'text-primary/6',
                )}
                onClick={claim}
              >
                Claim now
              </button>
            </div>
          </div>
          <div onClick={closeMessage}>
            <CrossIcon size={20} className="cursor-pointer text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
