import { Trans } from '@lingui/macro';
import CircleCheck from 'src/components/icons/CircleCheck';


export default function MessagePurchaseModal({}) {
    return (
        <div className="flex">
            <div className="ml-3 font-normal text-white leading-normal">
                <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
                    <span className='absolute -left-8'><CircleCheck size={20} className="mt-1"/></span>
                    <span><Trans>Purchase Successful</Trans></span>
                </div>
                <div className="text-sm font-normal mt-[10px] mb-[20px]">
                    <span className='text-base/9'><Trans>Your purchase of Ultra Rare Vector Prime Sigil was successful.</Trans></span>
                </div>
                <div className="cursor-pointer">
                    <span className='text-primary/6'><Trans>View Transaction History</Trans></span>
                </div>
            </div>
        </div>
    );
}