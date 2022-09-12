import { Trans } from '@lingui/macro';
import CheckIcon from 'src/components/icons/CheckIcon';

export function MessageEditListingModal({ assetName = '', onClose = () => {} }) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal leading-normal text-white">
        <div className="relative mb-1 text-lg font-semibold leading-normal dark:text-white">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#81CA95]" />
          </span>
          <span>
            <Trans>Item Listed Successfully</Trans>
          </span>
        </div>
        <div className="mt-[10px] mb-[20px] text-sm font-normal">
          <span className="text-base/9">
            <Trans>Your</Trans>
            <span className="text-base/10 font-medium"> {assetName} </span>
            <Trans>has been listed for sale.</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
