import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CircleCheck from 'src/components/icons/CircleCheck';
import InfoIcon from 'src/components/icons/InfoIcon';

export default function MessageUnlist({}) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <InfoIcon size={24} className="mt-[1px]" />
          </span>
          <span>
            <Trans>Your Item has been unlisted.</Trans>
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
              has been unlisted.
            </Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
