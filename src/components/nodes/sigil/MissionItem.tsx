import clsx from 'clsx';
import React, { useMemo } from 'react';
import CheckIcon from 'src/components/icons/CheckIcon';
import HistoryIcon from 'src/components/icons/HistoryIcon';
import LockIcon from 'src/components/icons/LockIcon';
import Tooltip from 'src/components/Tooltip';
import { Mission } from 'src/types/sigil';
import { formatNumber } from 'src/utils';

type Props = {
  item: Mission;
  action?: {
    label: string;
    link?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  };
};

const MissionItem: React.FC<Props> = ({ item, action }) => {
  const { earned_credits, title, description, status, credits, repetition_text } = item;
  const actionEl = useMemo(() => {
    if (status == 'locked') {
      return (
        <div className="flex w-full items-center justify-center">
          <span className="w-[20px] rounded-full bg-light-red p-1 text-[#1F2334]">
            <LockIcon />
          </span>
        </div>
      );
    }

    if (action && status != 'completed') {
      return (
        <div className="flex w-full items-center justify-center">
          <a
            href={action.link}
            target="_blank"
            rel="noreferrer"
            className=" flex flex-1 items-center justify-center rounded-[4px] bg-[#1F2334] px-2 py-[5px] text-[12px] font-bold uppercase leading-[1.25] text-brand-gold"
            onClick={action.onClick}>
            {action.label}
          </a>
        </div>
      );
    }

    return (
      <div className="w-full pr-2 text-right">
        <p className="text-[20px] font-bold leading-[1.25]">{formatNumber(earned_credits)}</p>
        <p className="text-[8px] font-medium leading-[1.25] text-light">EARNED</p>
      </div>
    );
  }, [action, status, earned_credits]);

  const isRepeatable = repetition_text == 'Daily' || repetition_text == 'Unlimited';

  return (
    <div
      className={clsx(
        'flex min-h-[60px] min-w-[260px] overflow-hidden rounded-lg [background:var(--bg)]',
        {
          '[--bg:linear-gradient(140.5deg,rgba(154,_201,_227,_0.7)_-86.06%,_rgba(154,_201,_227,_0)_36.1%),_#1F2334]':
            status != 'completed',
          '[--bg:linear-gradient(110.21deg,_#9AC9E3_-53.9%,_rgba(154,_201,_227,_0)_34.89%),_#1F2334]':
            status == 'completed' || status == 'available',
          'opacity-70': status == 'locked'
        }
      )}>
      <div className="flex-1 py-3 pl-4">
        <p className="text-[14px] font-medium leading-[1.25]">{title}</p>

        <p className="mt-1 flex items-center space-x-1 text-[12px] leading-[1.25] text-light">
          {status === 'completed' ? (
            <>
              <span>Complete</span>
              <CheckIcon className="ml-2 w-4 text-[#41F59F]" />
            </>
          ) : (
            <>
              {isRepeatable && (
                <span className="w-4">
                  <HistoryIcon />
                </span>
              )}
              <Tooltip>
                <Tooltip.Trigger>
                  {isRepeatable ? (
                    <span>Unlimited x {credits} Credits </span>
                  ) : (
                    <span>{description}</span>
                  )}
                </Tooltip.Trigger>
                <Tooltip.Content className="max-w-[256px]">
                  <Tooltip.Arrow />
                  <p>
                    Share an original idea on Discord and receive 20 or more upvotes to complete
                    this mission.
                  </p>
                </Tooltip.Content>
              </Tooltip>
            </>
          )}
        </p>
      </div>
      <div
        style={{
          clipPath: 'polygon(11% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
        className="flex w-[90px] px-2 py-3">
        {actionEl}
      </div>
    </div>
  );
};

export default MissionItem;
