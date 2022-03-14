import clsx from 'clsx';
import React from 'react';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const data = [
  {
    subTitle: 'Supercharge your project',
    title: 'The easiest way to launch your blockchain game',
    description:
      'We work closely with you from onboarding to deployment, provide advice from technical support to best practice recommendations to unlock new revenue streams and opportunities. '
  },
  {
    subTitle: 'Manage your NFT & digital assets',
    title: 'Manage your digital storefront and marketplace',
    description:
      'Myria’s NFT store and marketplace infrastructure is purpose built for blockchain games and optimized to support the players journey.  '
  },
  {
    subTitle: 'Unlock immense scale',
    title: 'Enabling true scalability while leveraging the Ethereum network',
    description:
      'Expereince low transaction fee and high throughput rate of up to 9000 transactions per second with our Myria scaling solution.  '
  },
  {
    subTitle: 'Save time. Ship faster. ',
    title: 'The easiest way to launch your blockchain game',
    description:
      'Leverage prebuilt Myria platform and tools - we take care of the supporting tools so you can focus on building your business.'
  },
  {
    subTitle: 'Blockchain consultancy ',
    title: 'Enabling true scalability while leveraging the Ethereum network',
    description:
      'Myria provides blockchain consultancy services on NFT sale, blockchain integrations and platform support. '
  },
  {
    subTitle: 'Tokenomics consultancy ',
    title: 'Enabling true scalability while leveraging the Ethereum network',
    description:
      'Myria facilitates with tokenomics consultancy, Play-to-Earn game design best practices to achieve your business objectives.'
  },
  {
    subTitle: 'Compliance support',
    title: 'Enabling true scalability while leveraging the Ethereum network',
    description:
      'Provide your players with a protected experience and ensure your business understands critical regulatory compliance components.  '
  },

  {
    subTitle: 'Instant project visibility ',
    title: 'Market your project across our platforms',
    description:
      'Instantly reach and build an engaged player community of evangelists around your project through the Myria platform and network partners. '
  }
];
const Myria: React.FC = () => {
  return (
    <div>
      <div className="mx-auto max-w-[713px] text-center">
        <h2 className="text-[32px] font-bold leading-[1.25] md:text-[40px]">
          Gaming is evolving. Build with Myria.
        </h2>
        <p className="mt-6 text-[18px] leading-[1.5] text-light md:mt-10 md:text-[20px]">
          Myria provides an end-to-end solution for developers and publishers, and help you unlock
          the blockchain potential of your business
        </p>
      </div>
      <div className="mt-[26px] grid gap-4 pt-[22px] pb-[19px] md:mt-[110px] md:grid-cols-2 md:gap-x-[105px] md:gap-y-[100px] md:p-0">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="hidden md:block">
              <div>
                <p className="text-[20px] leading-[1.25] text-brand-gold">{item.subTitle}</p>
                <label className="mt-2 flex items-start justify-between text-[18px] font-bold leading-[1.25] md:mt-4 md:text-[28px] ">
                  {item.title}
                </label>
                <p className=" pt-4 leading-[1.5] text-light md:pt-3 md:text-[16px]">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="md:hidden">
              <Collapse>
                <div>
                  <p className="text-[14px] leading-[1.25] text-brand-gold md:text-[20px]">
                    {item.subTitle}
                  </p>
                  <label className="mt-2 flex items-start justify-between text-[18px] font-bold leading-[1.25] md:mt-4 md:text-[28px] ">
                    {item.title}
                    <Collapse.Trigger asChild>
                      <button
                        className={clsx(
                          'ml-4 w-6 flex-shrink-0 text-white transition duration-300 open:rotate-180 md:hidden'
                        )}>
                        <ChevronDownIcon />
                      </button>
                    </Collapse.Trigger>
                  </label>
                  <Collapse.Content>
                    <p className=" pt-4 text-[14px] leading-[1.5] text-light md:pt-3 md:text-[16px]">
                      {item.description}
                    </p>
                  </Collapse.Content>
                </div>
                <div className="mt-4 border-t border-white opacity-20" />
              </Collapse>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myria;
