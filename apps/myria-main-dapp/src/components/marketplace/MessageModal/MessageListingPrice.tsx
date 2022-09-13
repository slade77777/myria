import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckCircleIcon from 'src/components/icons/CheckCircleIcon';

export default function MessageListingPriceModal({ price = 2.99, assetName = '' }) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal leading-normal text-white">
        <div className="relative mb-1 text-lg font-semibold leading-normal dark:text-white">
          <span className="absolute -left-[45px]">
            <CheckCircleIcon size={24} className="mt-[1px] text-[#81CA95]" />
          </span>
          <span>
            <Trans>Listing price has been updated</Trans>
          </span>
        </div>
        <div className="mt-[10px] text-sm font-normal">
          <span className="text-base/9">
            <Trans>Your</Trans>
            <span className="text-base/10 font-medium"> {assetName} </span>
            <Trans>listing price has been updated to</Trans> {price} <Trans>ETH.</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
