import DAOIcon from 'src/components/icons/DAOIcon';
import { ArrowIcon, TickCircleIcon } from '../../Icons';

type Props = {
  amount: Number;
  successHandler: any;
  selectedToken: any;
  goBack: any;
};

export default function DepositCompleteScreen({
  amount,
  successHandler,
  selectedToken,
  goBack,
}: Props) {
  return (
    <div>
      <div
        className="-mt-8 flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="mt-8 flex justify-center">
        <TickCircleIcon className="text-light-green" />
      </div>

      <div className="mt-6 text-center text-2xl text-white">
        Deposit complete
      </div>
      <div className="text-base/9 mt-4 px-7 text-center text-sm">
        Your funds are now available in your Myria wallet.
      </div>
      <div className="text-base/9 bg-base/2/50 mt-8 rounded-lg py-2 px-4 text-sm">
        <div className="flex justify-between text-sm">
          <span>Amount</span>
          <span className="flex items-center text-white">
            <DAOIcon size={14} className="mb-[2px]" />
            <span className="ml-1">{amount}</span>
          </span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Transaction ID</span>
          <span className="text-primary/6">View</span>
        </div>
      </div>
      <div className="mt-[136px]">
        <button
          onClick={() => {
            successHandler();
          }}
          className="bg-primary/6 flex h-10 w-full items-center justify-center rounded-lg text-base font-bold text-black"
        >
          OK
        </button>
      </div>
    </div>
  );
}
