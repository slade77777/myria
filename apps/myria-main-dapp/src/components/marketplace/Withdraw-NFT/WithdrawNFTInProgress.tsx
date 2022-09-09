import { Trans } from '@lingui/macro';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { InfoCircleIcon, ProgressIcon } from 'src/packages/l2-wallet/src/components/Icons';
import { StatusWithdrawNFT } from 'src/types/marketplace';

type Props = {};

export default function WithdrawNFTInProgress({}: Props) {
  const { setStatus } = useWithDrawNFTContext();
  const { handleDisplayPopoverWithdrawNFT } = useL2WalletContext();

  return (
    <>
      <div className="grow">
        <div className="px-11">
          <div className="mx-auto mt-14 flex h-16 w-16 justify-center">
            <ProgressIcon color="#9AC9E3" size={64} className="w-full text-light-green" />
          </div>

          <div className="mt-6 text-center text-2xl text-white">Withdrawal in progress</div>
          <div className="text-sm text-gray/6 text-center mt-4">
            <Trans>You will receive a notification once your item is ready to be claimed.</Trans>
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-base/2 p-4 text-sm text-white">
          <div className="flex justify-between">
            <span>
              <Trans>Amount</Trans>
            </span>
            <span className="flex gap-1">1</span>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="flex items-center gap-1">
              <Trans>Estimated completion</Trans>
            </span>
            <span>10-20 hours</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            handleDisplayPopoverWithdrawNFT(false);
            setStatus(StatusWithdrawNFT.MAIN_SCREEN);
          }}
          className="flex w-full items-center justify-center rounded-lg bg-primary/6 px-5 py-3 text-base font-bold text-base/1">
          <span>
            <Trans>OK</Trans>
          </span>
        </button>
      </div>
    </>
  );
}
