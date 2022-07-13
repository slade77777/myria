// import packages
import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';

// Import components
import CloseCircleIcon from '../Icons/CloseCircleIcon';
import CheckIcon from '../Icons/CheckIcon';

// Import Redux
import { RootState } from '../../app/store';
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
  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken,
  );
  const dispatch = useDispatch();
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };

  const claim = () => {
    dispatch(setWithdrawClaimPopover(true));
    dispatch(
      setWithdrawClaimModal({ show: false, claimAmount, isUpdated: false }),
    );
  };

  const renderClaimMessage = () => {
    if (parseFloat(claimAmount.toString()) > 0) {
      return (
        <div>
          You can claim the current available balance is{' '}
          {claimAmount.toString()} tokens.
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
              <div className="mt-[10px] mb-[20px] text-sm font-normal">
                The withdraw transaction is on progress in system. Please wait
                and patient.
                <div>{renderClaimMessage()}</div>
              </div>
            )}
          </div>
          <div onClick={closeMessage}>
            <CloseCircleIcon size={16} className="text-[#E7EBEE]" />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={closeMessage}>Dismiss</button>
          <button
            disabled={parseFloat(claimAmount.toString()) === 0}
            className={cn(
              'ml-[10px] rounded p-[7px] font-semibold',
              parseFloat(claimAmount.toString()) === 0
                ? 'cursor-not-allowed bg-[#4B5563] text-[#9CA3AF]'
                : 'bg-[#F5B941] text-black',
            )}
            onClick={claim}
          >
            Claim now
          </button>
        </div>
      </div>
    </div>
  );
}
