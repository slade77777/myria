import React from 'react';
import CartIcon from '../icons/CartIcon';
import Logo from '../icons/Logo';
import LogoSm from '../icons/LogoSm';
import MonitorIcon from '../icons/MonitorIcon';
import WalletIcon from '../icons/WalletIcon';

const data = [
  {
    title: 'Games & Applications',
    description:
      'We believe in open and equitable access, enabling more people to build, experience and enjoy the benefits of blockchain and the metaverse.'
  },
  {
    title: 'Platform ',
    description:
      'We want to make digital asset trading and blockchain gaming easy with our all-in-one platform.'
  },
  {
    title: 'Infrastructure & Tools',
    description:
      'Our Ethereum L2 scaling solution provides reliability, scalability and security. Making it easy for developers to build and manage their projects.'
  }
];
const Platform: React.FC = () => {
  return (
    <div>
      <h2 className="text-center text-[40px] font-bold leading-[1.25]">
        The comprehensive blockchain gaming platform
      </h2>
      <p className="mx-auto mt-6 max-w-[616px] text-[20px] leading-[1.5] text-light">
        Myria combines a gaming platform with applications, tools and scaling infrastructure needed
        to bring blockchain gaming to life.
      </p>
      <div className="mt-[65px] grid grid-cols-[63fr_37fr] gap-[86px]">
        <div className="space-y-8">
          <div
            style={{
              boxShadow: '0px 0px 40px rgba(154, 201, 227, 0.4)'
            }}
            className="flex space-x-6 rounded-xl p-4 text-center">
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-gold p-6">
              <span className="w-[51px]">
                <LogoSm />
              </span>
              <p className="mt-2 text-[16px] font-bold leading-[1.25]">Myria Studios</p>
            </div>
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-orange p-6">
              <p className="text-[16px] font-bold leading-[1.25]">Partner Games</p>
            </div>
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-orange p-6">
              <p className="text-[16px] font-bold leading-[1.25]">Partner Dapps</p>
            </div>
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-orange p-6">
              <p className="text-[16px] font-bold leading-[1.25]">Partner Experiences</p>
            </div>
          </div>
          <div
            style={{
              boxShadow: '0px 0px 40px rgba(154, 201, 227, 0.4)'
            }}
            className="flex space-x-6 rounded-xl p-4 text-center">
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-[#9C4BB9] p-6">
              <span className="w-[24px]">
                <CartIcon />
              </span>
              <p className="mt-2 text-[16px] font-bold leading-[1.25]">Myria Marketplace</p>
            </div>
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-[#4BB986] p-6">
              <span className="w-[24px]">
                <WalletIcon />
              </span>
              <p className="mt-2 text-[16px] font-bold leading-[1.25]">Myria Wallet</p>
            </div>
            <div className=" flex h-[135px] flex-1 flex-col items-center justify-center rounded-xl bg-[#4B9CB9] p-6">
              <span className="w-[24px]">
                <MonitorIcon />
              </span>
              <p className="mt-2 text-[16px] font-bold leading-[1.25]">Myria Platform</p>
            </div>
          </div>
          <div className="h-[170px] bg-[url('/images/ecosystem/panel.png')] bg-cover"></div>
        </div>
        <div className="space-y-[64px]">
          {data.map((item, index) => (
            <div key={index} className="">
              <h3 className="text-[20px] font-bold leading-[1.25]">{item.title}</h3>
              <p className="mt-4 text-[18px] leading-[1.5] text-light">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Platform;
