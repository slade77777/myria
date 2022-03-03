import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { paddingX } from '../utils';

const data = [
  {
    title: <Trans>Proof of reputational authority</Trans>,
    description: (
      <Trans>
        Our proprietary consensus algorithm achieves greater network security by factoring in the
        ‘reputational score’ of Myria nodes.
      </Trans>
    )
  },
  {
    title: <Trans>Modularization of smart contracts</Trans>,
    description: (
      <Trans>
        Our ERC1155 contracts are engineered for more efficient resource utilization with our smart
        logic design between the base layer and rules contracts.{' '}
      </Trans>
    )
  },
  {
    title: <Trans>NFT interoperability</Trans>,
    description: (
      <Trans>
        We have developed innovative NFT interoperability standards only available on the Myria
        chain.
      </Trans>
    )
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
          <div className="absolute left-0 z-[-1] h-[794px] w-full">
            <div className="relative h-full w-full ">
              <Image
                src="/images/ecosystem/header-bg_op.png"
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
          <div className={paddingX}>
            <div className="mx-auto w-full max-w-[607px] ">
              <h1 className="heading-lg mx-auto mt-[50px] max-w-[756px] text-center text-brand-white md:heading-massive md:mt-[120px]">
                <Trans>
                  Explore the <span className=" text-brand-light-blue">Myria</span> Ecosystem
                </Trans>
              </h1>
              <h3 className="heading-sm-mobile mt-[32px] text-center md:heading-sm">
                <Trans>
                  The Myria ecosystem is designed to empower gamers, communities, studios, and
                  creators.
                </Trans>
              </h3>
            </div>
          </div>
          <div className="mt-[155px] overflow-auto md:mt-[282px] ">
            <div className="mx-auto min-w-[650px] max-w-[1108px]">
              <Image src="/images/ecosystem/table.svg" width={1108} height={720} alt="" />
            </div>
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            "mt-10 flex w-full flex-col justify-center bg-[url('/images/globe_op.png')] bg-contain bg-top  bg-no-repeat pt-[315px] text-center md:min-h-[792px] md:bg-right md:pt-[0] md:text-left"
          )}>
          <div className="mx-auto max-w-content ">
            <div className="lg:w-1/2">
              <h3 className="heading-sm md:heading-md">
                <Trans>Purpose-built infrastructure</Trans>
              </h3>
              <p className="body-sm mt-6 text-light">
                <Trans>
                  The Myria ecosystem is built on Myria blockchain, our Ethereum L2 built for
                  gaming. Our team have developed proprietary technology to make the gaming and
                  trading experience seamless, including a decentralized exchange, marketplace, and
                  cryptocurrency wallet.
                </Trans>
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[96px] md:mt-0')}>
          <div className=" min-h-[427px] rounded-[12px] bg-brand-deep-blue bg-[url('/images/ecosystem/map-bg.png')] bg-cover p-[32px] sm:min-h-0 sm:rounded-none sm:bg-transparent sm:bg-none sm:p-0">
            <h2 className="heading-md text-left sm:text-center">
              <Trans>Myria Blockchain Ecosystem Map</Trans>
            </h2>
            <Link href="/blockchain-map">
              <a target="_blank" className="btn-lg btn-primary mt-[32px] sm:hidden">
                <Trans>view now</Trans>
              </a>
            </Link>
            <div className="mx-auto mt-[105px] hidden max-w-content sm:block">
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
            ' mt-[96px] mb-[117px] grid gap-[32px] md:mt-[174px] md:grid-cols-2 lg:grid-cols-3'
          )}>
          {data.map((item, idx) => (
            <div
              style={{
                boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
              }}
              className=" rounded-[12px] bg-brand-deep-blue py-[48px] px-[22px] md:px-[32px]"
              key={idx}>
              <h3 className="heading-md">{item.title}</h3>
              <p className="body-sm mt-6 text-light">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </Page>
  );
};

export default Ecosystem;
