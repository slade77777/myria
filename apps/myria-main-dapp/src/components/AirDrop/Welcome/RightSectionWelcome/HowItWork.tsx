import moment from 'moment';
import React from 'react';
import { FORMAT_DATE_BY_AIRDROP } from 'src/utils';
const REMEMBER_DATE = [
  {
    date_time: '2022-11-08T03:22:09.961Z',
    description: 'Sigil Key campaign begins—start earning points'
  },
  {
    date_time: '2022-11-09T03:22:09.961Z',
    description: 'Campaign ends'
  },
  {
    date_time: '2022-11-23T03:22:09.961Z',
    description:
      'Get your reward sent to your Myria wallet if you have earned the minimum points required'
  }
];
const HowItWorksComponent: React.FC = () => {
  return (
    <div className="py-8 px-10">
      <div className="text-[14px] text-center">How it works</div>
      <div className="mt-5">
        <ul className="list-disc text-base/9 pl-6 text-[12px] leading-5 ml-4">
          <li className="mb-2">
            Connect your wallet and complete enough missions to earn the minimum points, claim your
            FREE NFT
          </li>
          <li>
            The more missions you complete, the more points you will collect and you will be able to
            earn additional keys which will unlock rarer NFTs
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <div className="mb-4 text-sm text-center">
          <span>Remember the dates</span>
        </div>
        {REMEMBER_DATE.map((event) => {
          return (
            <div className="text-[12px] flex mt-3" key={event.date_time}>
              <span className="uppercase min-w-[78px] mr-[14px]">
                {moment(event.date_time || Date.now()).format(FORMAT_DATE_BY_AIRDROP)}
              </span>
              <span className="text-base/9">{event.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HowItWorksComponent;