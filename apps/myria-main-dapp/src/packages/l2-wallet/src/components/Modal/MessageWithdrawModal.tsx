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

import { useL2WalletContext } from 'src/context/l2-wallet';
import { setWithdrawClaimModal } from '../../app/slices/uiSlice';
import { getModuleFactory } from '../../services/myriaCoreSdk';

type Props = {
  isShowMessage: Boolean;
  setIsShowMessage: (arg0: Boolean) => void;
};

export default function MessageWithdrawModal({
  isShowMessage,
  setIsShowMessage,
}: Props) {
  const claimAmount = useSelector((state: RootState) => state.ui.claimAmount);
  const [withdrawProgress, setWithdrawProgress] = useState(false);

  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken,
  );
  const connectedAccount = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );

  const { showWithdrawCompleteScreen } = useL2WalletContext();

  const dispatch = useDispatch();
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };

  const claim = async () => {
    let responseWithdraw: any = null;
    try {
      setWithdrawProgress(true);
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawModule = moduleFactory.getWithdrawModule();
      if (selectedToken.name === 'Ethereum') {
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
            confirmationType: ConfirmationType.Confirmed,
          },
        );
      } else {
        const assetType = asset.getAssetType({
          type: 'ERC20',
          data: {
            quantum: '1',
            tokenAddress: selectedToken.tokenAddress,
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
            confirmationType: ConfirmationType.Confirmed,
          },
        );
      }
      if (responseWithdraw && responseWithdraw.status) {
        const triggerMainScreen = document.getElementById(
          'trigger-popover-main-screen',
        );
        triggerMainScreen?.click();
        showWithdrawCompleteScreen({
          isShow: true,
          transactionHash: responseWithdraw.transactionHash,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWithdrawProgress(false);
      dispatch(
        setWithdrawClaimModal({ show: false, claimAmount, isUpdated: false }),
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
                {selectedToken?.name === 'Ethereum'
                  ? `${claimAmount} eth`
                  : `${claimAmount} tokens`}{' '}
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
