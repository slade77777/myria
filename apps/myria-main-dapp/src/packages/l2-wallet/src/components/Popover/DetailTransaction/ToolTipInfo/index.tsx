import { Trans } from "@lingui/macro";
import Tooltip from "src/components/Tooltip";
import InfoCircle from 'src/components/icons/InfoCircle';

export const ToolTipInfo = ({ percentage = 0, isPurchase = false }) => {
    return (
      <Tooltip>
        <Tooltip.Trigger asChild className="cursor-pointer focus:outline-none">
          <div className="ml-1 flex flex-row items-center">
            <InfoCircle />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom" className="bg-base/5 mt-2 max-w-[256px]">
          <Tooltip.Arrow className="fill-base/5 " width={16} height={8} />
          <p className="text-base/9">
            {isPurchase ? (
              <>
                <Trans>The creator of this collection will earn</Trans>&nbsp;
                {`${percentage}%`}&nbsp;
                <Trans>of every sale.</Trans>
              </>
            ) : (
              <>
                <Trans>As the creator of this collection, you will earn</Trans>
                &nbsp;
                {`${percentage}%`}&nbsp;
                <Trans>of every sale.</Trans>
              </>
            )}
          </p>
        </Tooltip.Content>
      </Tooltip>
    );
  };