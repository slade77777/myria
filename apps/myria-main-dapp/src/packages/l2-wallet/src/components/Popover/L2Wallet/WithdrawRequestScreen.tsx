import { Trans } from '@lingui/macro';
import cn from 'classnames';
import DAOIcon from 'src/components/icons/DAOIcon';
import { ArrowIcon, ProgressIcon } from '../../Icons';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';

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
  const { handleLearnMore } = useWithDrawNFTContext();
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
            isNotAnimate={!withdrawInProgress}
          />
        </div>
        <div className="mt-6 text-center text-2xl">
          {withdrawInProgress ? (
            <Trans> Withdrawal In progress </Trans>
          ) : (
            <Trans> Withdraw to L1 wallet </Trans>
          )}
        </div>
        <div className="text-base/9 mt-4 px-7 text-center text-sm">
          {withdrawInProgress ? (
            <>
              <Trans>
                Withdrawals are processed in batches every 20 hours. Click
              </Trans>
              <span
                className="text-primary/6 cursor-pointer"
                onClick={() => {
                  handleLearnMore(true);
                }}
              >
                &nbsp;<Trans>here</Trans>&nbsp;
              </span>
              <Trans>to learn more.</Trans>
            </>
          ) : (
            <Trans>
              You will receive a notification once your funds are ready to be
              claimed.
            </Trans>
          )}
        </div>
        <div className="bg-base/2/50 text-base/9 mt-4 rounded-lg p-4 text-sm">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="flex items-center text-white">
              <DAOIcon size={16} className="mb-[2px]" />
              <span className="ml-1">{amount}</span>
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span>Estimated completion</span>
            <span className="text-white">10-20 hours</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="border-base/9 flex h-10 w-full max-w-[126px] items-center justify-center rounded-lg border text-base font-bold text-white"
          onClick={() => {
            cancelHandler();
          }}
        >
          CANCEL
        </button>
        <button
          className={cn(
            'flex h-10 w-[126px] items-center justify-center rounded-lg text-base font-bold',
            withdrawInProgress
              ? 'text-gray/6 bg-gray/4'
              : 'bg-primary/6 text-base/1',
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
