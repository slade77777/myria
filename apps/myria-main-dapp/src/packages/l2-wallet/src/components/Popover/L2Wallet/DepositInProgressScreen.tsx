import cn from 'classnames';
import DAOIcon from 'src/components/icons/DAOIcon';
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
    <>
      <div
        className="-mt-8 flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
        id="deposit-in-progress"
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="grow">
        <div className="mx-auto mt-8 flex h-16 w-16 justify-center">
          <ProgressIcon size={64} className="text-blue/6 w-full" />
        </div>
        <div className="mt-6 text-center text-2xl text-white">
          Deposit in progress
        </div>
        <div className="text-base/9 mt-4 px-7 text-center text-sm">
          You will receive a notification once the deposit is complete
        </div>
        <div className="text-base/9 bg-base/2/50 mt-4 rounded-lg py-2 px-4 text-sm">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="flex items-center text-white">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span>Estimated completion</span>
            <span className="text-white">10 minutes</span>
          </div>
        </div>
      </div>
      <div>
        <button
          disabled={depositInProgress}
          className={cn(
            'flex h-10 w-full items-center justify-center rounded-lg text-base font-bold',
            depositInProgress
              ? 'bg-[#737373] text-white'
              : 'bg-primary/6 text-base/1',
          )}
          onClick={() => {
            successHandler();
          }}
        >
          OK
        </button>
      </div>
    </>
  );
}
