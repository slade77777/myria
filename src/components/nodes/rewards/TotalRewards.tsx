import { Trans } from '@lingui/macro';
import React from 'react';
import LogoSmallIcon from 'src/components/icons/LogoSmallIcon';
import { formatNumber } from 'src/utils';

const TotalRewards: React.FC = () => {
  const totalRewards = 999999999.999;
  return (
    <div className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] items-center justify-between gap-x-2 gap-y-6 rounded-xl bg-brand-deep-blue p-6 shadow-dark-panel md:gap-y-4 md:p-8">
      <p className="text-[20px] font-medium leading-[1.25]">
        <Trans>Token Rewards</Trans>
      </p>
      <div className="flex flex-col justify-center md:row-span-2">
        <button className="btn-sm btn-primary md:btn-lg" disabled={totalRewards <= 0}>
          <Trans>Claim All</Trans>
        </button>
      </div>
      <div className="col-span-2 flex items-center space-x-6 md:col-span-1">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-dark-blue">
          <span className="w-[25px] text-white">
            <LogoSmallIcon />
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-baseline md:space-x-2">
          <p className="text-[32px] font-extrabold leading-[1.15]">{formatNumber(totalRewards)}</p>
          <p className="text-[16px] leading-[1.5] text-light">$MYRIA</p>
        </div>
      </div>
    </div>
  );
};

export default TotalRewards;
