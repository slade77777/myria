import { Trans } from '@lingui/macro';
import CircleCheck from 'src/components/icons/CircleCheck';
import { toast } from 'react-toastify';
export default function MessageListingPriceModal({ price = 2.99 }) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <CircleCheck size={24} className="mt-[1px]" />
          </span>
          <span>
            <Trans>Listing price has been updated</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px]">
          <span className="text-base/9">
            <Trans>
              Your
              <span
                className="text-[16px] text-white mx-1 cursor-pointer"
                onClick={() => toast('This function is not ready yet!')}>
                {' '}
                Ultra Rare Vector Prime Sigil{' '}
              </span>
              listing price has been updated to {price} ETH.
            </Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
