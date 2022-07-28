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
        className="mt-[-32px] flex cursor-pointer items-center"
        onClick={() => {
          goBack();
        }}
      >
        <ArrowIcon direction="left" />
        <div className="ml-2 text-[20px] text-white">Deposit</div>
      </div>
      <div className="mt-8 flex justify-center">
        <TickCircleIcon className="text-[#9ECEAB]" />
      </div>

      <div className="mt-6 text-center text-[24px] text-white">
        Deposit complete
      </div>
      <div className="text-base/9 mt-4 px-[29px] text-center text-[14px]">
        Your funds are now available in your Myria wallet.
      </div>
      <div className="text-base/9 mt-[32px] rounded-[8px] bg-[rgba(5,14,21,0.5)] py-2 px-4 text-[14px]">
        <div className="flex justify-between text-[14px]">
          <span>Amount</span>
          <span className="flex items-center text-white">
            <DAOIcon size={14} className="mb-[2px]" />
            <span className="ml-1">{amount}</span>
          </span>
        </div>
        <div className="mt-2 flex justify-between text-[14px]">
          <span>Transaction ID</span>
          <span className="text-[#F5B941]">View</span>
        </div>
      </div>
      <div className="mt-[136px]">
        <button
          onClick={() => {
            successHandler();
          }}
          className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-[#F5B941] text-[16px] font-bold text-black"
        >
          OK
        </button>
      </div>
    </div>
  );
}
