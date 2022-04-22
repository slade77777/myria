import { Trans } from '@lingui/macro';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import CartIcon from '../icons/CartIcon';
import LogoSm from '../icons/LogoSm';
import MonitorIcon from '../icons/MonitorIcon';
import WalletEcosystemIcon from '../icons/WalletEcosystemIcon';

const data = [
  {
    title: 'Games & Applications',
    description:
      'We believe in open and equitable access, enabling more people to build, experience and enjoy the benefits of blockchain and the metaverse.'
  },
  {
    title: 'Platform ',
    description:
      'We make digital asset trading and blockchain gaming easy with our all-in-one platform.'
  },
  {
    title: 'Infrastructure & Tools',
    description:
      'Our Ethereum L2 scaling solution provides reliability, scalability and security. Making it easy for developers to build and manage their projects.'
  }
];
const Platform: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: function () {
        const maxWidth = 768;
        return window.innerWidth < maxWidth;
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-center text-[32px] font-bold leading-[1.25] md:text-[40px]">
        <Trans>The comprehensive blockchain gaming platform</Trans>
      </h2>
      <p className="mx-auto mt-6 max-w-[616px] text-center text-[18px] leading-[1.5] text-light md:text-[20px]">
        <Trans>
          Myria combines a gaming platform with applications, tools and scaling infrastructure
          needed to bring blockchain gaming to life.
        </Trans>
      </p>
      <div className="mt-[72px] grid items-center gap-10 md:mt-[65px] md:grid-flow-row md:grid-cols-[63fr_37fr] md:gap-x-[86px] md:gap-y-8">
        <div
          data-aos="fade-right"
          className="order-1 flex space-x-2 rounded-xl text-center md:space-x-6 md:p-4 md:shadow-light-panel">
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-gold px-4 md:h-[135px] md:p-6">
            <span className="w-[29px] md:w-[51px]">
              <LogoSm />
            </span>
            <p className="mt-2 text-[12px] font-bold leading-[1.25] md:text-[16px]">
              Myria Studios
            </p>
          </div>
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-orange px-4 md:h-[135px] md:p-6">
            <p className="text-[12px] font-bold leading-[1.25] md:text-[16px]">Partner Games</p>
          </div>
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-orange px-4 md:h-[135px] md:p-6">
            <p className="text-[12px] font-bold leading-[1.25] md:text-[16px]">Partner Dapps</p>
          </div>
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-brand-orange px-4 md:h-[135px] md:p-6">
            <p className="text-[12px] font-bold leading-[1.25] md:text-[16px]">
              Partner Experiences
            </p>
          </div>
        </div>
        <div
          data-aos="fade-right"
          className="order-3 flex space-x-2 rounded-xl text-center md:space-x-6 md:p-4 md:shadow-light-panel">
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-[#9C4BB9] px-5 md:h-[135px] md:p-6">
            <span className="w-[24px]">
              <CartIcon />
            </span>
            <p className="mt-2 text-[12px] font-bold leading-[1.25] md:text-[16px]">
              <Trans>Myria NFT Marketplace</Trans>
            </p>
          </div>
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-[#4BB986] px-5 md:h-[135px] md:p-6">
            <span className="w-[24px]">
              <WalletEcosystemIcon />
            </span>
            <p className="mt-2 text-[12px] font-bold leading-[1.25] md:text-[16px]">
              <Trans>Myria Wallet</Trans>
            </p>
          </div>
          <div className=" flex h-[88px] flex-1 flex-col items-center justify-center rounded-xl bg-[#4B9CB9] px-5 md:h-[135px] md:p-6">
            <span className="w-[24px]">
              <MonitorIcon />
            </span>
            <p className="mt-2 text-[12px] font-bold leading-[1.25] md:text-[16px]">
              <Trans>Myria Game Platform</Trans>
            </p>
          </div>
        </div>
        <div
          data-aos="fade-right"
          className="order-5 h-[103px] bg-[url('/images/ecosystem/panel-mobile.png')] bg-cover md:h-[170px] md:bg-[url('/images/ecosystem/panel.png')]"></div>
        {data.map((item, index) => (
          <div
            data-aos="fade-left"
            className="-mt-2 text-center md:mt-0 md:text-left"
            style={{ order: (index + 1) * 2 }}
            key={index}>
            <h3 className="text-[20px] font-bold leading-[1.25]">{item.title}</h3>
            <p className="mt-4 text-[16px] leading-[1.5] text-light md:text-[18px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
