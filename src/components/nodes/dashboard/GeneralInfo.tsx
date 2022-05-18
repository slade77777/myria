import { Trans } from '@lingui/macro';
import React from 'react';
import KeyIcon from 'src/components/icons/KeyIcon';
import LogoSmallIcon from 'src/components/icons/LogoSmallIcon';
import NodeIcon from 'src/components/icons/NodeIcon';

const GeneralInfo: React.FC = () => {
  return (
    <div className=" grid justify-between gap-6 rounded-xl bg-brand-deep-blue p-8 shadow-dark-panel md:grid-cols-[auto_auto_auto] md:gap-4">
      <div className="flex items-start">
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-brand-gold">
          <span className="w-[21px] text-white">
            <LogoSmallIcon />
          </span>
        </div>
        <div className="ml-3">
          <p className="text-[20px] font-medium leading-[1.25] text-light">
            <Trans>Total $MYRIA Mined</Trans>
          </p>
          <p className="mt-2 flex flex-col text-[32px] font-extrabold leading-[1.15] md:flex-row">
            <span>9,999,999.999</span>
            <span className="text-[16px] font-normal text-light md:ml-2">$MYRIA</span>
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-brand-light-blue">
          <span className="w-[21px] text-white">
            <LogoSmallIcon />
          </span>
        </div>
        <div className="ml-3">
          <p className="text-[20px] font-medium leading-[1.25] text-light">
            <Trans>Total NFT Rewards</Trans>
          </p>
          <p className="mt-2 text-[32px] font-extrabold leading-[1.15]">
            <span>4,291</span>
            <span className="ml-2 text-[16px] font-normal text-light">NFTs</span>
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-brand-light-blue">
          <span className="w-[10px] text-white">
            <KeyIcon />
          </span>
        </div>
        <div className="ml-3">
          <p className="text-[20px] font-medium leading-[1.25] text-light">
            <Trans>My Node Licenses</Trans>
          </p>
          <p className="mt-2 flex items-baseline text-[32px] font-extrabold leading-[1.15]">
            <span>25</span>
            <div className="ml-4 flex items-center">
              <span className="w-[16px] text-light-green">
                <NodeIcon />
              </span>
              <span className="ml-2 text-[16px] font-normal">12 Online</span>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
