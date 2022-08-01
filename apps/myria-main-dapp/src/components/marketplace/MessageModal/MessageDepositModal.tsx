import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useDepositContext } from 'src/context/deposit-context';
export default function MessageDepositModal({ onClose = () => {} }) {
  const { amount } = useDepositContext();
  return (
    <div>
      <div className="flex">
        <div className="ml-3 font-normal text-white leading-normal">
          <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
            <span className="absolute -left-[45px]">
              <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
            </span>
            <span>
              <Trans> Your deposit is complete</Trans>
            </span>
          </div>
          <div className="text-sm font-normal mt-[10px]">
            <span className="text-base/9">
              <Trans>Your deposit of</Trans> {amount} <Trans>ETH is now complete.</Trans>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={onClose}>
          <Trans>Dismiss</Trans>
        </button>
        <button className="ml-[10px] rounded bg-[#F5B941] p-[7px] font-semibold text-black">
          <Trans>View in wallet</Trans>
        </button>
      </div>
    </div>
  );
}
