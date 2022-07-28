import cn from 'classnames';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import { ArrowIcon, ProgressIcon } from '../../Icons';

type Props = {
  goBack: any;
  amount: number;
  cancelHandler: any;
  withdrawHandler: any;
  withdrawInProgress: boolean;
};

export default function WithdrawRequestScreen({
  goBack,
  amount,
  cancelHandler,
  withdrawHandler,
  withdrawInProgress,
}: Props) {
  return (
    <>
      <div className="text-white">
        <div
          className="mt-[-32px] flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="ml-2 text-[20px] text-white">Withdraw</div>
        </div>
      </div>
      <div className="grow text-white">
        <div className="mx-auto mt-[32px] flex h-[64px] w-[64px] justify-center">
          <ProgressIcon
            size={64}
            className="w-full text-[#9ECEAB]"
            isNotAnimate={!withdrawInProgress}
          />
        </div>
        <div className="mt-[24px] text-center text-[24px]">
          Withdrawal to L1 wallet
        </div>
        <div className="mt-4 px-[29px] text-center text-[14px] text-[#A1AFBA]">
          Withdrawals are processed in batches every 20 hours. Click{' '}
          <span className="text-primary/6 cursor-pointer">here</span> to learn
          more.
        </div>
        <div className="mt-4 rounded-[8px] bg-[#050E15] p-4 text-[14px]">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="flex items-center">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-[13px] flex justify-between">
            <span>Estimated completion</span>
            <span>10-20 hours</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="border-base/9 flex h-[40px] w-full max-w-[126px] items-center justify-center rounded-[8px] border text-[16px] font-bold text-white"
          onClick={() => {
            cancelHandler();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex  h-[40px] w-[126px] items-center justify-center rounded-[8px] text-[16px] font-bold',
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
    </>
  );
}
