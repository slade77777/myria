import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useDepositContext } from 'src/context/deposit-context';
export default function MessageDepositModal({ onClose = () => {} }) {
  const { amount } = useDepositContext();
  return (
    <div>
      <div className="flex">
        <div className="ml-3 font-normal leading-normal text-white">
          <div className="relative mb-1 text-lg font-semibold leading-normal dark:text-white">
            <span className="absolute -left-[45px]">
              <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
            </span>
            <span>
              <Trans> Your deposit is complete</Trans>
            </span>
          </div>
          <div className="mt-[10px] text-sm font-normal">
            <span className="text-base/9">
              <Trans>Your deposit of</Trans> {amount} <Trans>ETH is now complete.</Trans>
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
            const triggerMainScreen = document.getElementById('trigger-popover-main-screen');
            triggerMainScreen?.click();
          }}>
          <Trans>View in wallet</Trans>
        </button>
      </div>
    </div>
  );
}
