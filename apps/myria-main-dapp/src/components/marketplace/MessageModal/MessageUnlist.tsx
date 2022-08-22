import { Trans } from '@lingui/macro';
import UnlistIcon from 'src/components/icons/UnlistIcon';

export default function MessageUnlist({ assetName = '' }) {
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <UnlistIcon />
          </span>
          <span>
            <Trans>Your Item has been unlisted.</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px]">
          <span className="text-base/9">
            <Trans>Your</Trans>
            <span className="text-base text-white mx-1"> {assetName} </span>
            <Trans>has been unlisted.</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
