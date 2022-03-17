import { Trans } from '@lingui/macro';
import Link from 'next/link';
import React from 'react';
import BrushIcon from '../icons/BrushIcon';
import CloudIcon from '../icons/CloundIcon';
import CPUIcon from '../icons/CPUIcon';
import PeopleIcon from '../icons/PeolpleIcon';

const CustomLink: React.FC<{
  title: string;
  href: string;
}> = ({ title, href }) => (
  <Link href={href}>
    <a className="link text-brand-gold no-underline hover:underline	">{title}</a>
  </Link>
)
const data = [
  {
    icon: <CPUIcon />,
    title: 'Myria Infrastructure',
    description: (
      <Trans>
        Myria’s <CustomLink title='Ethereum L2 scaling solution' href='/for-developers/solution' /> uses ZK-Rollup to enable dApps to achieve unlimited scale, low transaction fees without sacrificing on security.
      </Trans>
    )
  },
  {
    icon: <PeopleIcon />,
    title: 'Myria Partners',
    description: (
      <Trans>
        Myria help project partners set up for success.{' '}
        <CustomLink title='Learn more' href='/for-developers' /> about our easy-to-use, full stack
        solution and build with Myria today.
      </Trans>
    )
  },

  {
    icon: <BrushIcon />,
    title: 'Myria Studios',
    description: (
      <Trans>
        <CustomLink title='Myria Studios' href='/studios' /> creates a range of free-to-play AAA
        games spans across an entire interconnected ecosystem, built with the new standard of
        interoperable NFTs.
      </Trans>
    )
  },
  {
    icon: <CloudIcon />,
    title: 'Myria Nodes',
    description: (
      <Trans>
        The Myria platform is supported by Myria Nodes. Being a{' '}
        <CustomLink href='/nodes' title='Myria Node'/> operator means that you will receive
        limited edition NFTs, token rewards and more.
      </Trans>
    )
  }
];
const Backbone: React.FC = () => {
  return (
    <div>
      <h2 className="text-center text-[32px] font-bold leading-[1.25] md:text-[40px]">
        <Trans>Myria is the backbone of blockchain gaming</Trans>
      </h2>
      <p className="mx-auto mt-6 max-w-[713px] text-center text-[18px] leading-[1.5] text-light md:text-[20px]">
        <Trans>We bring together everything that is required to build a decentralized, scalable and secure
          digital asset and blockchain gaming platform</Trans>
      </p>
      <div className="mt-10 grid gap-x-[100px] gap-y-10 md:mt-[64px] md:grid-cols-2 md:gap-y-8">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex flex-col items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4">
              <div className="w-8 flex-shrink-0 text-light">{item.icon}</div>
              <div className="text-center md:text-left">
                <h3 className="text-[20px] font-bold leading-[1.25]">{item.title}</h3>
                <p className="mt-4 text-[16px] leading-[1.5] text-light md:text-[18px]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backbone;
