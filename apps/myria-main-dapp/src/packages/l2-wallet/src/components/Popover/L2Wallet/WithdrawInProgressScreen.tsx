import DAOIcon from 'src/components/icons/DAOIcon';
import { ArrowIcon, ProgressIcon } from '../../Icons';

type Props = {
  goBack: any;
  okHandler: any;
  amount: number;
};

export default function WithdrawInProgressScreen({
  goBack,
  okHandler,
  amount,
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
            isNotAnimate={true}
          />
        </div>
        <div className="mt-[24px] text-center text-[24px]">
          Withdrawal in progress
        </div>
        <div className="mt-4 px-[29px] text-center text-[14px] text-[#A1AFBA]">
          You will receive a notification once your funds are ready to be
          claimed.
        </div>
        <div className="mt-4 rounded-[8px] bg-[#050E15] p-4 text-[14px] text-[#A1AFBA]">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="flex items-center text-white">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-[13px] flex justify-between">
            <span>Estimated completion</span>
            <span className="text-white">10-20 hours</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="flex  h-[40px] w-full items-center justify-center rounded-[8px] bg-[#F5B941] text-[16px] font-bold text-[#040B10]">
          OK
        </button>
      </div>
    </>
  );
}
