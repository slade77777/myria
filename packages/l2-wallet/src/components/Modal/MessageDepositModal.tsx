import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import CloseCircleIcon from '../Icons/CloseCircleIcon';
import CheckIcon from '../Icons/CheckIcon';
import { RootState } from '../../app/store';

type Props = {
  isShowMessage: Boolean;
  setIsShowMessage: (arg0: Boolean) => void;
};

export default function MessageDepositModal({
  isShowMessage,
  setIsShowMessage,
}: Props) {
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };
  const amount = useSelector((state: RootState) => state.ui.depositAmount);

  return (
    <div
      className={cn(
        `absolute top-[80px] right-[21px]`,
        isShowMessage ? 'block' : 'hidden',
      )}
    >
      <div className="w-full max-w-lg text-gray-500 bg-[#0B2231] rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 p-[32px]">
        <div className="flex">
          <CheckIcon className="mt-[4px] text-[#2EA64F]" size={24} />
          <div className="ml-3 font-normal text-white leading-normal">
            <span className="mb-1 font-semibold dark:text-white text-lg leading-normal">
              Your deposit is complete
            </span>
            <div className="text-sm font-normal mt-[10px] mb-[20px]">
              Your deposit of {amount} ETH is now complete.
            </div>
          </div>
          <div onClick={closeMessage}>
            <CloseCircleIcon size={16} className="text-[#E7EBEE]" />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={closeMessage}>Dismiss</button>
          <button className="p-[7px] bg-[#F5B941] rounded text-black ml-[10px] font-semibold">
            View in wallet
          </button>
        </div>
      </div>
    </div>
  );
}
