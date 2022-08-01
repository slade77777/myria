import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';

export default function MessagePurchaseModal({}) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
          </span>
          <span>
            <Trans>Purchase Successful</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px] mb-[20px]">
          <span className="text-base/9">
            <Trans>
              Your purchase of
              <span
                className="text-[16px] text-white mx-1 cursor-pointer"
                onClick={() => toast('This function is not ready yet!')}>
                {' '}
                Ultra Rare Vector Prime Sigil{' '}
              </span>
              successful.
            </Trans>
          </span>
        </div>
        <div className="cursor-pointer" onClick={() => toast('This function is not ready yet!')}>
          <span className="text-primary/6">
            <Trans>View Transaction History</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
