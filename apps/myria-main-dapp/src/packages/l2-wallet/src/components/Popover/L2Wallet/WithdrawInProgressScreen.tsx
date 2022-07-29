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
          className="-mt-8 flex cursor-pointer items-center"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowIcon direction="left" />
          <div className="ml-2 text-[20px] text-white">Withdraw</div>
        </div>
      </div>
      <div className="grow text-white">
        <div className="mx-auto mt-8 flex h-16 w-16 justify-center">
          <ProgressIcon
            size={64}
            className="text-light-green w-full"
            isNotAnimate={true}
          />
        </div>
        <div className="mt-6 text-center text-2xl">Withdrawal in progress</div>
        <div className="text-base/9 mt-4 px-7 text-center text-sm">
          You will receive a notification once your funds are ready to be
          claimed.
        </div>
        <div className="bg-base/2/50 text-base/9 mt-4 rounded-lg p-4 text-sm">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="text-base/10 flex items-center">
              <DAOIcon size={14} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span>Estimated completion</span>
            <span className="text-base/10">10-20 hours</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-primary/6 text-base/1 flex h-10 w-full items-center justify-center rounded-lg text-base font-bold">
          OK
        </button>
      </div>
    </>
  );
}
