import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import BuildYourBlockchain from 'src/components/for-developers/BuildYourBlockchain';
import Ethereum from 'src/components/for-developers/Ethereum';
import Myria from 'src/components/for-developers/Myria';
import Page from 'src/components/Page';
import { paddingX } from 'src/utils';

const ForDevelopers: React.FC = () => {
  return (
    <Page action="start-building">
      <div>
        <section
          className={clsx(
            paddingX,
            'relative isolate flex min-h-[782px] flex-col items-center pt-[150px] pb-[87px]'
          )}>
          <div
            style={{
              background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)'
            }}
            className="absolute left-0 right-0 top-0 z-[-2] h-[606px]"></div>
          <div className="absolute top-0 left-0 z-[-1] w-full">
            <Image
              src="/images/for-developers/header-bg.png"
              alt=""
              width={4320}
              height={2346}
              layout="responsive"
            />
          </div>
          <div className="mx-auto max-w-[668px] text-center">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">
              Enabling digital asset scalabiltiy on Ethereum
            </h1>
            <p className="mt-6 text-[20px] leading-[1.5]">
              Myria is a decentralised Ethereum Layer 2, built to scale digital assets, NFTs and
              blockchain gaming.
            </p>
            <button className="btn-lg btn-primary mt-8">START BUILDING</button>
          </div>
          <div className="mx-auto mt-[112px] flex max-w-[1048px] items-center space-x-[93px] rounded-xl bg-[url('/images/for-developers/panel.png')] p-8 shadow-dark-panel">
            <div>
              <h3 className="text-[18px] font-bold leading-[1.25]">
                Myria launches $200M game developer grant program
              </h3>
              <p className="mt-6 max-w-[488px] text-[18px] leading-[1.5] text-light">
                We are funding the builders and creators to power the future of blockchain gaming.
                Apply for grant consideration.
              </p>
            </div>
            <button className="btn-lg btn-primary">Apply now</button>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-10')}>
          <div className="mx-auto max-w-content">
            <Ethereum />
          </div>
        </section>
        <div
          style={{
            backgroundImage:
              'linear-gradient(180deg, #050E15 -1.93%, #041825 15.28%, #041723 80.47%, #050E15 98.21%)',
            backgroundSize: '100% 1911px'
          }}
          className={clsx(paddingX, 'mt-[170px] mb-[152px] bg-no-repeat')}>
          <section className="mx-auto max-w-[966px]">
            <Myria />
          </section>
          <section className="mx-auto mt-[163px]">
            <BuildYourBlockchain />
          </section>
        </div>
      </div>
    </Page>
  );
};

export default ForDevelopers;
