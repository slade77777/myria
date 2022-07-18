import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CircleCheck from 'src/components/icons/CircleCheck';

export function MessageEditListingModal({}) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-8">
            <CircleCheck size={20} className="mt-1" />
          </span>
          <span>
            <Trans>Item Listed Successfully</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px] mb-[20px]">
          <span className="text-base/9">
            <Trans>
              Your{' '}
              <span className="text-[16px]  text-white mx-1"> Ultra Rare Vector Prime Sigil </span>{' '}
              has been listed for sale.
            </Trans>
          </span>
        </div>
        <div onClick={()=>{
          toast('This function is not ready yet!')
        }} className="cursor-pointer">
          <span className="text-primary/6">
            <Trans>View Transaction</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
