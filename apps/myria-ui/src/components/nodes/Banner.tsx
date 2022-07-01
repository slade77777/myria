import { Trans } from '@lingui/macro';
import React from 'react';
import CupIcon from '../icons/CupIcon';

const Banner: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-[url('/images/nodes/banner-bg.png')] bg-cover bg-center py-3 px-10">
      <span className="w-6 flex-shrink-0 text-brand-light-blue">
        <CupIcon />
      </span>
      <span className="ml-2 text-[14px] font-medium leading-[1.25] text-brand-light-blue">
        <Trans>
          Rewards are coming soon! Information on how to install your node client will be released
          shortly.
        </Trans>
      </span>
    </div>
  );
};

export default Banner;
