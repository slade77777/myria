import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';

export function MessageEditListingModal({ assetName = '' }) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
          </span>
          <span>
            <Trans>Item Listed Successfully</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px] mb-[20px]">
          <span className="text-base/9">
            <Trans>Your</Trans>
            <span className="text-base text-white mx-1 cursor-pointer"> {assetName} </span>
            <Trans>has been listed for sale.</Trans>
          </span>
        </div>
        <div
          onClick={() => {
            toast('This function is not ready yet!');
          }}
          className="cursor-pointer">
          <span className="text-primary/6">
            <Trans>View Transaction</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
