import React from 'react';
import BrushIcon from '../icons/BrushIcon';
import CloudIcon from '../icons/CloundIcon';
import CPUIcon from '../icons/CPUIcon';
import PeopleIcon from '../icons/PeolpleIcon';

const data = [
  {
    icon: <CPUIcon />,
    title: 'Myria Infrastructure',
    description: (
      <>
        Myria’s <span className="text-brand-gold">Ethereum L2 scaling solution</span> uses ZK-Rollup
        to enable dApps to achieve unlimited scale, low transaction fees without sacrificing on
        security.
      </>
    )
  },
  {
    icon: <PeopleIcon />,
    title: 'Myria Partners',
    description: (
      <>
        Myria help project partners set up for success.{' '}
        <span className="text-brand-gold">Learn more</span> about our easy-to-use, full stack
        solution and build with Myria today.
      </>
    )
  },

  {
    icon: <BrushIcon />,
    title: 'Myria Studios',
    description: (
      <>
        <span className="text-brand-gold">Myria Studios</span> creates a range of free-to-play AAA
        games spans across an entire interconnected ecosystem, built with the new standard of
        interoperable NFTs.
      </>
    )
  },
  {
    icon: <CloudIcon />,
    title: 'Myria Nodes',
    description: (
      <>
        The Myria platform is supported by Myria Nodes. Being a{' '}
        <span className="text-brand-gold">Myria Node</span> operator means that you will receive
        limited edition NFTs, token rewards and more.
      </>
    )
  }
];
const Backbone: React.FC = () => {
  return (
    <div>
      <h2 className="text-center text-[40px] font-bold leading-[1.25]">
        Myria is the backbone of blockchain gaming
      </h2>
      <p className="mx-auto max-w-[713px] text-center text-[20px] leading-[1.5] text-light">
        We bring together everything that is required to build a decentralized, scalable and secure
        digital asset and blockchain gaming platform
      </p>
      <div className="mt-[64px] grid grid-cols-2 gap-x-[100px] gap-y-8">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-start space-x-4">
              <div className="w-8 flex-shrink-0 text-light">{item.icon}</div>
              <div>
                <h3 className="text-[20px] font-bold leading-[1.25]">{item.title}</h3>
                <p className="mt-4 text-[18px] leading-[1.5] text-light">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backbone;
