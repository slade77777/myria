// import packages
import cn from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore

// Import components
import CheckIcon from '../Icons/CheckIcon';

// Import Redux
import { RootState } from '../../app/store';
import CrossIcon from '../Icons/CrossIcon';

import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { getModuleFactory } from '../../services/myriaCoreSdk';
import { convertWeiToEth } from '../../utils/Converter';
const StarkwareLib = require('@starkware-industries/starkware-crypto-utils');
const { asset } = StarkwareLib;

type Props = {
  isShowMessage: Boolean;
  setIsShowMessage: (arg0: Boolean) => void;
};

const QUANTUM = '10000000000';

export default function MessageWithdrawModal({
  isShowMessage,
  setIsShowMessage,
}: Props) {
  const claimAmount = useSelector((state: RootState) => state.ui.claimAmount);
  const [withdrawProgress, setWithdrawProgress] = useState(false);
  const [walletAddress, setWalletAddress] = useLocalStorage(
    localStorageKeys.walletAddress,
    '',
  );

  const { showWithdrawCompleteScreen, handleDisplayPopover } =
    useL2WalletContext();
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };

  const claimNow = async () => {
    let assetType: string = '';
    assetType = asset.getAssetType({
      type: 'ETH',
      data: {
        quantum: QUANTUM.toString(),
      },
    });
    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;

    const withdrawModule = moduleFactory.getWithdrawModule();

    const currentBalance = await withdrawModule.getWithdrawalBalance(
      walletAddress,
      assetType,
    );

    console.log(
      '[MessageWithdrawModal] L1 balance currently is: ->',
      currentBalance,
    );
    handleDisplayPopover(true);
    const transactionData = {
      ethAmount: convertWeiToEth(String(currentBalance)),
      isComeFrom: 'NOTIFICATION_TOAST',
    };
    showWithdrawCompleteScreen({ isShow: true, transactionData });
    closeMessage();
  };

  return (
    <div
      className={cn(
        `absolute top-24 right-6 w-[406px]`,
        isShowMessage ? 'block' : 'hidden',
      )}
    >
      <div className="bg-base/5 w-full max-w-lg rounded-2xl p-8 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400">
        <div className="flex">
          <CheckIcon className="mt-1 text-[#367641]" size={24} />
          <div className="ml-3 grow font-normal leading-normal text-white">
            <span className="mb-1 text-lg font-semibold leading-normal dark:text-white">
              Your withdrawal is complete
            </span>
            <div className="text-base/9 mt-[10px] mb-5 text-sm font-normal">
              Your withdrawal of{' '}
              <span className="uppercase text-white">
                {claimAmount} eth &nbsp;
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
                onClick={claimNow}
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
