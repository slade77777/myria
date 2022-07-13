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
      <div className="w-full max-w-lg rounded-lg bg-[#0B2231] p-[32px] text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400">
        <div className="flex">
          <CheckIcon className="mt-[4px] text-[#2EA64F]" size={24} />
          <div className="ml-3 font-normal leading-normal text-white">
            <span className="mb-1 text-lg font-semibold leading-normal dark:text-white">
              Your deposit is complete
            </span>
            <div className="mt-[10px] mb-[20px] text-sm font-normal">
              Your deposit of {amount} ETH is now complete.
            </div>
          </div>
          <div onClick={closeMessage}>
            <CloseCircleIcon size={16} className="text-[#E7EBEE]" />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={closeMessage}>Dismiss</button>
          <button className="ml-[10px] rounded bg-[#F5B941] p-[7px] font-semibold text-black">
            View in wallet
          </button>
        </div>
      </div>
    </div>
  );
}
