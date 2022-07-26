// import packages
import React, { useState } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { IMyriaClient, Modules, MyriaClient, Types } from 'myria-core-sdk';
import Web3 from 'web3';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';

// Import components
import CloseCircleIcon from '../Icons/CloseCircleIcon';
import CheckIcon from '../Icons/CheckIcon';

// Import Redux
import { RootState } from '../../app/store';

const QUANTUM_CONSTANT = 10000000000;
import CrossIcon from '../Icons/CrossIcon';

import {
  setWithdrawClaimModal,
  setWithdrawClaimPopover,
} from '../../app/slices/uiSlice';

type Props = {
  isShowMessage: Boolean;
  setIsShowMessage: (arg0: Boolean) => void;
};

export default function MessageWithdrawModal({
  isShowMessage,
  setIsShowMessage,
}: Props) {
  const claimAmount = useSelector((state: RootState) => state.ui.claimAmount);
  const isUpdated = useSelector((state: RootState) => state.ui.isUpdated);
  const [withdrawProgress, setWithdrawProgress] = useState(false);
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken,
  );
  const connectedAccount = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  const dispatch = useDispatch();
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };

  const claim = async () => {
    try {
      setWithdrawProgress(true);
      const initializeClient: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: 5,
        web3: window.web3,
      };

      const myriaClient = new MyriaClient(initializeClient);

      const moduleFactory = new Modules.ModuleFactory(myriaClient);
      const withdrawModule = moduleFactory.getWithdrawModule();
      if (selectedToken.name === 'Ethereum') {
        const assetType = asset.getAssetType({
          type: 'ETH',
          data: {
            quantum: QUANTUM_CONSTANT.toString(),
          },
        });
        await withdrawModule.withdrawalOnchain(
          {
            starkKey: connectedAccount,
            assetType,
          },
          {
            from: connectedAccount,
            nonce: new Date().getTime(),
            confirmationType: Types.ConfirmationType.Confirmed,
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
        await withdrawModule.withdrawalOnchain(
          {
            starkKey: connectedAccount,
            assetType,
          },
          {
            from: connectedAccount,
            nonce: new Date().getTime(),
            confirmationType: Types.ConfirmationType.Confirmed,
          },
        );
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

  const renderClaimMessage = () => {
    if (parseFloat(claimAmount.toString()) > 0) {
      return (
        <div>
          Your withdrawal of {claimAmount.toString()} tokens is now complete and
          ready to claim
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={cn(
        `absolute top-[80px] right-[21px]`,
        isShowMessage ? 'block' : 'hidden',
      )}
    >
      <div className="w-full max-w-lg rounded-lg bg-[#0B2231] p-[32px] text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400">
        <div className="flex">
          <CheckIcon className="mt-[4px] text-[#2EA64F]" size={24} />
          <div className="ml-3 font-normal leading-normal text-white">
            {isUpdated ? (
              <span className="mb-1 text-lg font-semibold leading-normal dark:text-white">
                Your withdraw is completed
              </span>
            ) : (
              <span className="mb-1 text-lg font-semibold leading-normal dark:text-white">
                Your withdraw is pending
              </span>
            )}
            {isUpdated ? (
              <div className="mt-[10px] mb-[20px] text-sm font-normal">
                Now you can use this amount to claim.
                {selectedToken?.name === 'Ethereum'
                  ? Web3.utils.fromWei(claimAmount.toString())
                  : claimAmount}{' '}
              </div>
            ) : (
              <div className="mt-[10px] mb-[20px] text-sm font-normal text-[#A1AFBA]">
                The withdrawal transaction is on progress in system. Please wait
                and patient.
                <div>{renderClaimMessage()}</div>
              </div>
            )}
            <div className="flex justify-start">
              <button
                disabled={
                  parseFloat(claimAmount.toString()) === 0 || withdrawProgress
                }
                className={cn(
                  'rounded font-semibold',
                  parseFloat(claimAmount.toString()) === 0 || withdrawProgress
                    ? 'cursor-not-allowed text-[#9CA3AF]'
                    : 'text-[#F5B941] text-black',
                )}
                onClick={claim}
              >
                Claim now
              </button>
            </div>
          </div>
          <div onClick={closeMessage}>
            <CrossIcon size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
