import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import CheckIcon from 'src/components/icons/CheckIcon';
import Page from 'src/components/Page';
import { paddingX } from 'src/utils';

const data = [
  {
    title: 'Secure and scalable',
    items: [
      `Ethereum-level security provided by
      zk-STARKs`,
      `Transparent (no trusted setup) and post-quantum secure`,
      `High throughput of 1,000+ TPS before sharding and 10,000+ TPS after sharding`,
      `Low transaction fees: over 100x lower than fees on Ethereum`
    ]
  },
  {
    title: 'Safely programmable',
    items: [
      `Arbitrary smart contracts written in Solidity and other languages`,
      `Account abstractions and other features not yet available on Ethereum`,
      `Simpler formal verification of contracts due to safe VM architecture`,
      `Clear roadmap to privacy-preserving smart contracts`
    ]
  },
  {
    title: 'Open and permissionless',
    items: [
      `Arbitrary smart contracts written in Solidity and other languages`,
      `Account abstractions and other features not yet available on Ethereum`,
      `Simpler formal verification of contracts due to safe VM architecture`,
      `Clear roadmap to privacy-preserving smart contracts`
    ]
  }
];
const Solution: React.FC = () => {
  return (
    <Page action="start-building">
      <div>
        <section
          className={clsx(
            paddingX,
            "relative isolate flex min-h-[782px] flex-col items-center overflow-hidden bg-[url('/images/solution/header-bg-mobile.png')] bg-cover bg-top pt-[132px] pb-[87px] md:bg-none md:pt-[150px]"
          )}>
          <div className="hidden md:block">
            <div
              style={{
                background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)'
              }}
              className="absolute left-0 right-0 top-0 z-[-2] h-[606px]"></div>
            <div className="absolute top-0 left-0 z-[-1] w-full">
              <Image
                src="/images/solution/header-bg.png"
                alt=""
                width={4320}
                height={2346}
                layout="responsive"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[668px] text-center">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">General purpose zk-rollup</h1>
            <p className="mt-6 text-[18px] leading-[1.5] md:text-[20px]">
              Myria is a decentralised Ethereum Layer 2, built to empower digital assets, NFT,
              blockchain gaming and more.
            </p>
          </div>
          <div className=" mx-auto mt-12 w-full max-w-content rounded-xl bg-brand-deep-blue/80 bg-[url('/images/solution/panel-mobile.png')] bg-cover bg-bottom p-8 pb-[303px] shadow-dark-panel md:mt-[112px] md:bg-[url('/images/solution/panel.png')] md:bg-right md:px-[64px] md:pt-[73px] md:pb-[94px] ">
            <div className="md:max-w-[552px]">
              <p className="text-[20px] font-medium leading-[1.25] text-brand-gold">Our solution</p>
              <p className="mt-2 text-[24px] font-bold leading-[1.25] md:text-[28px]">
                STARK-based zk-rollup
              </p>
              <p className="mt-3 text-[16px] leading-[1.5] text-light md:text-[18px]">
                Myria’s{' '}
                <span className=" font-medium text-brand-gold">Ethereum L2 scaling solution</span>{' '}
                uses zero-knowledge technology (zk-STARKs) to “roll-up” or bundle thousands of L2
                transactions into one single transaction. This then sends a validity proof back to
                the main blockchain, preserving the security of L1 Ethereum. Myria’s STARK-based
                zkrollup solution powered by Starkware enable NFTs and dApps to achieve unlimited
                scale, low transaction fees without sacrificing on security.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-6 md:mt-8')}>
          <div className="mx-auto grid max-w-content gap-6 md:grid-cols-3">
            {data.map((i, idx) => (
              <div key={idx} className="rounded-xl bg-brand-deep-blue p-8">
                <p className="text-[24px] font-bold leading-[1.25] md:text-[28px]">{i.title}</p>
                <div className="mt-4 space-y-4">
                  {i.items.map((item, idx) => (
                    <div key={idx} className="flex items-baseline space-x-2">
                      <span className="w-[18px] flex-shrink-0 translate-y-1 rounded-full bg-brand-light-blue p-0.5 text-[#1F2334]">
                        <CheckIcon />
                      </span>
                      <p className="text-[16px] leading-[1.5] text-light">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-10 text-center md:mt-[90px]')}>
          <div className="mx-auto">
            <p className="text-[20px] font-medium leading-[1.25] text-brand-gold">Architecture</p>
            <p className="mt-4 text-[32px] font-bold leading-[1.25] md:mt-6 md:text-[40px]">
              Layer 2 scalability solution
            </p>
            <p className="mx-auto mt-8 max-w-[713px] text-[18px] leading-[1.5] text-light md:mt-6 md:text-[20px]">
              Fast transaction confirmation times provided by the L2 chain, while zk proofs and L1
              data availability provide Ethereum-level security.
            </p>
            <div className="mt-10 md:hidden">
              <Image
                src="/images/solution/diagram-mobile.png"
                width={380}
                height={632}
                layout="responsive"
                alt=""
              />
            </div>
            <div className="mt-10 ml-auto mr-[288px] hidden max-w-[732px] md:block">
              <Image
                src="/images/solution/diagram.png"
                width={732}
                height={943}
                layout="responsive"
                alt=""
              />
            </div>
            {/* heheh */}
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-10 mb-14 md:mt-[105px] md:mb-[100px]')}>
          <div className="mx-auto mt-10 flex max-w-[1048px] flex-col items-start rounded-xl bg-brand-deep-blue bg-[url('/images/for-developers/panel-2.png')] bg-cover bg-bottom p-8 shadow-dark-panel md:mt-[112px] md:flex-row md:items-center md:space-x-[93px] md:bg-transparent md:bg-[url('/images/for-developers/panel.png')]">
            <div>
              <h3 className="text-[24px] font-bold leading-[1.25] md:text-[28px]">
                Myria launches $200M game developer grant program
              </h3>
              <p className="mt-4 max-w-[488px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
                We are funding the builders and creators to power the future of blockchain gaming.
                Apply for grant consideration.
              </p>
            </div>
            <button className="btn-lg btn-primary mt-8 md:mt-0">Apply now</button>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Solution;
