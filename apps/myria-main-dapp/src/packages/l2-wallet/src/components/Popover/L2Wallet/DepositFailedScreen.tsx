import DAOIcon from 'src/components/icons/DAOIcon';
import { ArrowIcon, CircleCloseIcon } from '../../Icons';

type Props = {
  depositRetryHandler: any;
  amount: number;
  goBack: any;
};

export default function DepositFailedScreen({
  depositRetryHandler,
  amount,
  goBack,
}: Props) {
  return (
    <div>
      <div className="text-center">
        <div
          className="-mt-8 flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="ml-2 text-[20px] text-white">Deposit</div>
        </div>
        <div className="mt-9 flex justify-center">
          <CircleCloseIcon className="text-error/6" />
        </div>
        <div className="mt-6 text-2xl font-bold text-white">Deposit failed</div>
        <div className="text-base/9 mt-4 text-center text-sm">
          Your deposit could not be completed <br />
          due to an error.
        </div>

        <div className="bg-base/2/50 mt-4 rounded-lg py-4 px-2">
          <div className="text-base/9 flex items-center justify-between">
            <div className="text-sm">Amount</div>
            <span className="flex items-center text-white">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-base/9 text-sm">Transaction ID</div>
            <div>
              <span className="text-primary/6 text-sm">View</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 w-[calc(100%-48px)]">
        <button
          onClick={depositRetryHandler}
          className="bg-primary/6 text-base/1 h-10 w-full rounded-lg text-center text-sm font-bold uppercase"
        >
          OK
        </button>
      </div>
    </div>
  );
}
