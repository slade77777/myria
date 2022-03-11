import React from 'react';

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
        <h2 className="text-[40px] font-bold leading-[1.25]">
          Gaming is evolving. Build with Myria.
        </h2>
        <p className="mt-10 text-[20px] leading-[1.5] text-light">
          Myria provides an end-to-end solution for developers and publishers, and help you unlock
          the blockchain potential of your business
        </p>
      </div>
      <div className="mt-[110px] grid gap-x-[105px] gap-y-[100px] md:grid-cols-2">
        {data.map((item, idx) => (
          <div key={idx} className="col-span-1">
            <p className="text-[20px] leading-[1.25] text-brand-gold">{item.subTitle}</p>
            <p className="mt-4 text-[28px] font-bold leading-[1.25] ">{item.title}</p>
            <p className="mt-3 text-[16px] leading-[1.5] text-light">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myria;
