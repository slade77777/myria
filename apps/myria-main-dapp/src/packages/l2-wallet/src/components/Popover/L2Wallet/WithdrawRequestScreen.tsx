import cn from 'classnames';
import { toast } from 'react-toastify';
import { ProgressIcon } from '../../Icons';
import InfoCircle2Icon from '../../Icons/InfoCircle2Icon';

type Props = {
  amount: number;
  cancelHandler: any;
  withdrawHandler: any;
  withdrawInProgress: boolean;
};

export default function WithdrawRequestScreen({
  amount,
  cancelHandler,
  withdrawHandler,
  withdrawInProgress,
}: Props) {
  return (
    <div className="text-white">
      <div className="mx-auto mt-[57px] flex h-[64px] w-[64px] justify-center">
        <ProgressIcon
          size={64}
          className="w-full text-[#9ECEAB]"
          isNotAnimate={!withdrawInProgress}
        />
      </div>
      <div className="mt-[24px] text-center text-[24px]">
        Withdrawal to L1 wallet
      </div>
      <div className="mt-[32px] rounded-[8px] bg-[#050E15] p-4 text-[16px]">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>{amount} ETH</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span>Estimated completion</span>
          <span>10-20 hours</span>
        </div>
      </div>
      <div className="mt-4 flex rounded-[8px] border border-[#9AC9E3] py-4 px-[14px]">
        <div className="mr-[9px] flex-none">
          <InfoCircle2Icon />
        </div>
        <div className="text-[14px] text-[#9AC9E3]">
          Withdrawal batch cycle is every 20 hours. Click
          <button
            onClick={() => {
              toast('This function is not ready yet!');
            }}
            className="text-[#F5B941]"
          >
            {' '}
            here{' '}
          </button>{' '}
          to learn more.
        </div>
      </div>
      <div className="mt-[55px] flex justify-between">
        <button
          className="flex items-center justify-center rounded-[8px] bg-transparent text-[16px] font-bold text-[#F5B941]"
          onClick={() => {
            cancelHandler();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex  w-[126px] items-center justify-center rounded-[8px] px-[20px] py-[12px] text-[16px] font-bold',
            withdrawInProgress
              ? '#9CA3AF bg-[#4B5563]'
              : 'bg-[#F5B941] text-[#040B10]',
          )}
          disabled={withdrawInProgress}
          onClick={() => {
            withdrawHandler();
          }}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
