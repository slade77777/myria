import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { bannerHeight, bannerSpacingClassName } from 'src/components/Header/Header';
import CheckIcon from 'src/components/icons/CheckIcon';
import Page from 'src/components/Page';
import { paddingX } from 'src/utils';

const data = [
  {
    title: <Trans>Scale with security </Trans>,
    items: [
      <Trans key={0}>Ethereum-level security provided by zk-STARKs</Trans>,
      <Trans key={1}>Transparent and post-quantum secure -  no trusted setup</Trans>,
      <Trans key={2}>
        Instantly able to withdraw assets from the rollup back into ethereum when needed
      </Trans>,
      <Trans key={3}>Low transaction fees</Trans>
    ]
  },
  {
    title: <Trans>Reliably programmable</Trans>,
    items: [
      <Trans key={0}>Cairo, allows for development of provable on-chain complexity</Trans>,
      <Trans key={1}>Native support for core token types ERC20 and ERC721</Trans>,
      <Trans key={2}>Simpler formal verification of contracts due to safe VM architecture</Trans>,
      <Trans key={3}>Complete privacy, not only from other users, but also from the Operator.</Trans>
    ]
  },
  {
    title: <Trans>Open and permissionless</Trans>,
    items: [
      <Trans key={0}>Building towards a decentralized and permissionless network</Trans>,
      <Trans key={1}>Full ownership of assets, non-custodial architecture</Trans>,
      <Trans key={2}>Resistent against censorship</Trans>,
      <Trans key={3}>Fully open-source and community-driven development</Trans>
    ]
  }
];
const Solution: React.FC = () => {
  return (
    <Page action="start-building">
      <div className={bannerSpacingClassName}>
        <section
          className={clsx(
            paddingX,
            "relative isolate flex min-h-[782px] flex-col items-center overflow-hidden bg-[url('/images/solution/header-bg-mobile_op.png')] bg-cover bg-top pt-[132px] pb-[87px] md:bg-none md:pt-[150px]"
          )}>
          <div className="hidden md:block">
            <div
              style={{
                background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)'
              }}
              className="absolute left-0 right-0 top-0 z-[-2] h-[606px]"></div>
            <div className="absolute top-0 left-0 z-[-1] w-full">
              <Image
                src="/images/solution/header-bg_op.png"
                alt=""
                width={4320}
                height={2346}
                layout="responsive"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[668px] text-center">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">
              <Trans>General purpose zk-rollup</Trans>
            </h1>
            <p className="mt-6 text-[18px] leading-[1.5] md:text-[20px]">
              <Trans>
                Myria is a decentralised Ethereum Layer 2, built to empower digital assets, NFT,
                blockchain gaming and more.
              </Trans>
            </p>
          </div>
          <div className=" mx-auto mt-12 w-full max-w-content rounded-xl bg-brand-deep-blue/80 bg-[url('/images/solution/panel-mobile_op.png')] bg-cover bg-bottom p-8 pb-[303px] shadow-dark-panel md:mt-[112px] md:bg-[url('/images/solution/panel_op.png')] md:bg-right md:px-[64px] md:pt-[73px] md:pb-[94px] ">
            <div className="md:max-w-[552px]">
              <p className="text-[20px] font-medium leading-[1.25] text-brand-gold">
                <Trans>Our solution</Trans>
              </p>
              <p className="mt-2 text-[24px] font-bold leading-[1.25] md:text-[28px]">
                STARK-based zk-rollup
              </p>
              <p className="mt-3 text-[16px] leading-[1.5] text-light md:text-[18px]">
                <Trans>
                  Myria’s{' '}
                  <span className=" font-medium text-brand-gold">Ethereum L2 scaling solution</span>{' '}
                  uses zero-knowledge technology (zk-STARKs) to “roll-up” or bundle thousands of L2
                  transactions into one single transaction. This then sends a validity proof back to
                  the main blockchain, preserving the security of L1 Ethereum. Myria’s STARK-based
                  zkrollup solution enable NFTs and dApps to achieve unlimited
                  scale, low transaction fees without sacrificing on security.
                </Trans>
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
            <p className="text-[20px] font-medium leading-[1.25] text-brand-gold">
              <Trans>Architecture</Trans>
            </p>
            <p className="mt-4 text-[32px] font-bold leading-[1.25] md:mt-6 md:text-[40px]">
              <Trans>Layer 2 scalability solution</Trans>
            </p>
            <p className="mx-auto mt-8 max-w-[713px] text-[18px] leading-[1.5] text-light md:mt-6 md:text-[20px]">
              <Trans>
                Fast transaction confirmation times provided by the L2 chain, while zk proofs and L1
                data availability provide Ethereum-level security.
              </Trans>
            </p>
            <div className="mt-10 md:hidden">
              <Image
                src="/images/solution/diagram-update.svg"
                width={380}
                height={632}
                layout="responsive"
                alt=""
              />
            </div>
            <div className="mt-10 ml-auto mr-[288px] hidden max-w-[732px] md:mx-auto md:block">
              <Image
                src="/images/solution/diagram-update.svg"
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
          {/* <div className="mx-auto mt-10 flex max-w-[1048px] flex-col items-start rounded-xl bg-brand-deep-blue bg-[url('/images/for-developers/panel-2.png')] bg-cover bg-bottom p-8 shadow-dark-panel md:mt-[112px] md:flex-row md:items-center md:space-x-[93px] md:bg-transparent md:bg-[url('/images/for-developers/panel.png')]">
            <div>
              <h3 className="text-[24px] font-bold leading-[1.25] md:text-[28px]">
                <Trans>Myria launches $200M game developer grant program</Trans>
              </h3>
              <p className="mt-4 max-w-[488px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
                <Trans>We are funding the builders and creators to power the future of blockchain gaming.
                  Apply for grant consideration.</Trans>
              </p>
            </div>
            <button className="btn-lg btn-primary mt-8 md:mt-0"><Trans>Apply now</Trans></button>
          </div> */}
        </section>
      </div>
    </Page>
  );
};

export default Solution;
