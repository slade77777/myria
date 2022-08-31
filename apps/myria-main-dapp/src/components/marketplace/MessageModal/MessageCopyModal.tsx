import { Trans } from '@lingui/macro';
import CheckIcon from 'src/components/icons/CheckIcon';
export default function MessageCopyModal({}) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
          </span>
          <span>
            <Trans>Link has been copied</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px]">
          <span className="text-base/9">
            <Trans>Paste, Send and Share with your friends now</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
