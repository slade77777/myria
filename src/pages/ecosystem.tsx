import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { paddingX } from '../utils';

const data = [
  {
    title: 'Proof of reputational authority',
    description:
      'Our proprietary consensus algorithm achieves greater network security by factoring in the ‘reputational score’ of Myria nodes.'
  },
  {
    title: 'Modularization of smart contracts',
    description:
      'Our ERC1155 contracts are engineered for more efficient resource utilization with our smart logic design between the base layer and rules contracts. '
  },
  {
    title: 'NFT interoperability',
    description:
      'We have developed innovative NFT interoperability standards only available on the Myria chain.'
  }
];
const Ecosystem: React.FC = () => {
  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx('relative isolate md:min-h-screen ')}>
          <div className="absolute left-0 h-[794px] w-full z-[-1]">
            <div className="relative w-full h-full ">
              <Image
                src="/images/ecosystem/header-bg.png"
                alt=""
                layout="fill"
                objectFit="contain"
                objectPosition="top"
              />
            </div>
          </div>
          <div className={paddingX}>
            <div className="w-full mx-auto max-w-[607px] ">
              <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
                Explore the <span className=" text-brand-light-blue">Myria</span> Ecosystem
              </h1>
              <h3 className="heading-sm-mobile md:heading-sm mt-[32px] text-center">
                The Myria ecosystem is designed to empower gamers, communities, studios, and
                creators.
              </h3>
            </div>
          </div>
          <div className="overflow-auto mt-[155px] md:mt-[282px] ">
            <div className="max-w-[1108px] min-w-[650px] mx-auto">
              <Image src="/images/ecosystem/table.svg" width={1108} height={720} alt="" />
            </div>
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            "w-full mt-10 flex flex-col justify-center pt-[315px] md:pt-[0] md:min-h-[792px]  bg-[url('/images/globe.png')] bg-contain bg-no-repeat md:bg-right bg-top text-center md:text-left"
          )}>
          <div className="mx-auto max-w-content ">
            <div className="lg:w-1/2">
              <h3 className="heading-sm md:heading-md">Pupose-built infrastructure</h3>
              <p className="mt-6 body-sm text-light">
                The Myria ecosystem is built on Myria blockchain, our Ethereum L2 built for gaming.
                Our team have developed proprietary technology to make the gaming and trading
                experience seamless, including a decentralized exchange, marketplace, and
                cryptocurrency wallet.
              </p>
              <button className="hidden mt-10 md:inline-flex btn-lg btn-primary">
                Button IF WE NEED IT
              </button>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[96px] md:mt-0')}>
          <div className=" rounded-[12px] sm:rounded-none bg-brand-deep-blue p-[32px] sm:p-0 sm:bg-transparent min-h-[427px] sm:min-h-0 bg-cover bg-[url('/images/ecosystem/map-bg.png')] sm:bg-none">
            <h2 className="text-left sm:text-center heading-md">Myria Blockchain Ecosystem Map</h2>
            <a href="#" className="btn-lg btn-primary mt-[32px] sm:hidden">
              view now
            </a>
            <div className="mx-auto max-w-content mt-[105px] hidden sm:block">
              <Image
                src="/images/ecosystem/diagram.svg"
                width={1234}
                height={1248}
                alt=""
                layout="responsive"
              />
            </div>
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            ' mt-[96px] md:mt-[174px] mb-[117px] grid md:grid-cols-2 lg:grid-cols-3 gap-[32px]'
          )}>
          {data.map((item, idx) => (
            <div
              style={{
                boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
              }}
              className=" rounded-[12px] bg-brand-deep-blue py-[48px] px-[22px] md:px-[32px]"
              key={idx}>
              <h3 className="heading-md">{item.title}</h3>
              <p className="mt-6 body-sm text-light">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </Page>
  );
};

export default Ecosystem;
