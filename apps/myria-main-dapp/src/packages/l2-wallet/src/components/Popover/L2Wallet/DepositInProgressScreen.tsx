import cn from 'classnames';
import DAOIcon from '../../../../../../components/icons/DAOIcon';
import { ArrowIcon, ProgressIcon } from '../../Icons';

type Props = {
  amount: number;
  selectedToken: any;
  depositInProgress: boolean;
  successHandler: any;
  goBack: any;
};

export default function DepositInProgressScreen({
  amount,
  selectedToken,
  depositInProgress,
  successHandler,
  goBack,
}: Props) {
  return (
    <div>
      <div
        className="mt-[-32px] flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="mx-auto mt-[32px] flex h-[64px] w-[64px] justify-center">
        <ProgressIcon size={64} className="w-full text-[#9AC9E3]" />
      </div>
      <div className="mt-[24px] text-center text-[24px] text-white">
        Deposit in progress
      </div>
      <div className="mt-4 px-[29px] text-center text-[14px] text-[#A1AFBA]">
        You will receive a notification once the deposit is complete
      </div>
      <div className="text-base/9 mt-4 rounded-[8px] bg-[rgba(5,14,21,0.5)] py-2 px-4 text-[14px]">
        <div className="flex justify-between">
          <span>Amount</span>
          <span className="flex items-center text-white">
            <DAOIcon size={14} className="mb-[2px]" />
            <span className="ml-1">{amount}</span>
          </span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span>Estimated completion</span>
          <span className="text-white">1-2 minutes</span>
        </div>
        <div className="mt-[13px] flex justify-between">
          <span>Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="mt-[103px]">
        <button
          disabled={depositInProgress}
          className={cn(
            'flex h-[40px] w-full items-center justify-center rounded-[8px] text-[16px] font-bold',
            depositInProgress
              ? 'bg-[#737373] text-white'
              : 'bg-[#F5B941] text-[#040B10]',
          )}
          onClick={() => {
            successHandler();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
