import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useDepositContext } from 'src/context/deposit-context';
import { useL2WalletContext } from 'src/context/l2-wallet';
export default function MessageDepositModal({ onClose = () => {} }) {
  const { amount } = useDepositContext();
  const { handleDisplayPopover } = useL2WalletContext();
  return (
    <div className="w-full">
      <div className="flex">
        <div className="ml-3 font-normal leading-normal text-white">
          <div className="relative mb-1 text-lg font-semibold leading-normal dark:text-white">
            <span className="absolute -left-[45px]">
              <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
            </span>
            <span>
              <Trans> Your deposit is in progress </Trans>
            </span>
          </div>
          <div className="mt-[10px] text-sm font-normal">
            <span className="text-base/9">
              <Trans>Your deposit of</Trans> {amount} <Trans>ETH is in progress.</Trans>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose}>
          <Trans>Dismiss</Trans>
        </button>
        <button
          className="ml-[10px] rounded bg-[#F5B941] p-[7px] font-semibold text-black"
          onClick={() => {
            onClose();
            handleDisplayPopover(true);
          }}>
          <Trans>View in wallet</Trans>
        </button>
      </div>
    </div>
  );
}
