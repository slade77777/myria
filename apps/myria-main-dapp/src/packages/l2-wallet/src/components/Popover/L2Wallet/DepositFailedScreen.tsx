import DAOIcon from '../../../../../../components/icons/DAOIcon';
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
          className="mt-[-32px] flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="ml-2 text-[20px] text-white">Deposit</div>
        </div>
        <div className="mt-[35px] flex justify-center">
          <CircleCloseIcon className="text-[#F37272]" />
        </div>
        <div className="mt-8 text-[24px] font-bold text-white">
          Deposit failed
        </div>
        <div className="mt-4 text-center text-[14px] text-[#A1AFBA]">
          Your deposit could not be completed <br />
          due to an error.
        </div>

        <div className="mt-4 rounded-[8px] bg-[rgba(5,14,21,0.5)] p-4">
          <div className="flex items-center justify-between text-[#A1AFBA]">
            <div className="text-[14px]">Amount</div>
            <span className="flex items-center text-white">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[14px] text-[#A1AFBA]">Transaction ID</div>
            <div>
              <span className="text-[14px] text-[#F5B941]">View</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[24px] w-[calc(100%-48px)]">
        <button
          onClick={depositRetryHandler}
          className="h-[40px] w-full rounded-[8px] bg-[#F5B941] text-center text-[14px] font-bold uppercase text-[#040B10]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
