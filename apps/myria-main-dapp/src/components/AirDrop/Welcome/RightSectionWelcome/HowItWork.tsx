import moment from 'moment';
import React from 'react';
import { useAirdropCampaign } from 'src/context/campaignContext';
import { FORMAT_DATE_BY_AIRDROP } from 'src/utils';

const HowItWorksComponent: React.FC = () => {
  const { startDateCampaign, endDateCampaign } = useAirdropCampaign();
  return (
    <div className="py-8 px-10">
      <div className="text-center text-[16px]">How it works</div>
      <div className="mt-5">
        <ul className="text-base/9 ml-4 list-disc pl-6 text-[14px] leading-5">
          <li className="mb-4">
            Connect your wallet and complete enough missions to earn the minimum points, claim your
            FREE NFT
          </li>
          <li>
            The more missions you complete, the more points you will collect and you will be able to
            earn additional keys which will unlock rarer NFTs
          </li>
        </ul>
      </div>
      <div className="m-auto mt-12 w-[224px]">
        <div className="mb-4 text-center text-base">
          <span>Remember the dates</span>
        </div>
        <div className="mt-3 flex text-[14px]">
          {startDateCampaign && (
            <span className="mr-[14px] min-w-[78px] uppercase">
              {moment(startDateCampaign).format(FORMAT_DATE_BY_AIRDROP)}
            </span>
          )}
          <span className="text-base/9">Campaign starts</span>
        </div>
        <div className="mt-3 flex text-[14px]">
          {endDateCampaign && (
            <span className="mr-[14px] min-w-[78px] uppercase">
              {moment(endDateCampaign).format(FORMAT_DATE_BY_AIRDROP)}
            </span>
          )}
          <span className="text-base/9">Campaign ends</span>
        </div>
        <div className="mt-3 flex text-[14px]">
          <span className="mr-[14px] min-w-[78px] uppercase">
            {moment(new Date('03 FEB 2023') || Date.now()).format(FORMAT_DATE_BY_AIRDROP)}
          </span>
          <span className="text-base/9">Receive your key(s)</span>
        </div>
      </div>
    </div>
  );
};
export default HowItWorksComponent;
