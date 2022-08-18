import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
export default function MessageListingPriceModal({ price = 2.99, assetName = '' }) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
          </span>
          <span>
            <Trans>Listing price has been updated</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px]">
          <span className="text-base/9">
            <Trans>Your</Trans>
            <span className="text-[16px] text-white mx-1"> {assetName} </span>
            <Trans>listing price has been updated to</Trans> {price} <Trans>ETH.</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
