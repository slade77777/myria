import { CircleCloseIcon } from '../Icons';
import DAOIcon from 'src/components/icons/DAOIcon';

type Props = {
  depositRetryHandler: any;
  amount: number;
};

export default function FirstDepositFailed({
  depositRetryHandler,
  amount,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="grow">
        <div className="mt-9 flex justify-center">
          <CircleCloseIcon className="text-error/6" />
        </div>
        <div className="mt-6 text-center text-2xl font-bold text-white">
          Deposit failed
        </div>
        <div className="text-base/9 mt-4 text-center text-sm">
          Your deposit could not be completed <br />
          due to an error.
        </div>

        <div className="bg-base/2/50 mt-4 rounded-lg py-4 px-2">
          <div className="text-base/9 flex items-center justify-between">
            <div className="text-sm">Amount</div>
            <span className="flex items-center text-white">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
        </div>
      </div>
      <div>
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
