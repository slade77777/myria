import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import BuildYourBlockchain from 'src/components/for-developers/BuildYourBlockchain';
import Ethereum from 'src/components/for-developers/Ethereum';
import Myria from 'src/components/for-developers/Myria';
import { bannerHeight, bannerSpacingClassName } from 'src/components/Header/Header';
import Page from 'src/components/Page';
import { paddingX } from 'src/utils';

const ForDevelopers: React.FC = () => {
  return (
    <Page action="start-building">
      <div className={bannerSpacingClassName}>
        <section
          className={clsx(
            paddingX,
            "relative isolate flex min-h-[782px] flex-col items-center bg-[url('/images/for-developers/header-bg-mobile_op.png')] bg-cover bg-top pt-[132px] pb-[87px] md:bg-none md:pt-[150px]"
          )}>
          <div className="hidden md:block">
            <div
              style={{
                background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)'
              }}
              className="absolute left-0 right-0 top-0 z-[-2] h-[606px]"></div>
            <div className="absolute top-0 left-0 z-[-1] w-full">
              <Image
                src="/images/for-developers/header-bg_op.png"
                alt=""
                width={4320}
                height={2346}
                layout="responsive"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[668px] text-center">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">
              <Trans>Enabling digital asset scalabiltiy on Ethereum</Trans>
            </h1>
            <p className="mt-6 text-[18px] leading-[1.5] md:text-[20px]">
              <Trans>Myria is a decentralised Ethereum Layer 2, built to scale digital assets, NFTs and
              blockchain gaming.</Trans>
            </p>
            <button className="btn-lg btn-primary mt-8"><Trans>START BUILDING</Trans></button>
          </div>
          <div className="mx-auto mt-10 flex max-w-[1048px] flex-col items-start rounded-xl bg-brand-deep-blue bg-[url('/images/for-developers/panel-2_op.png')] bg-cover bg-bottom p-8 shadow-dark-panel md:mt-[112px] md:flex-row md:items-center md:space-x-[93px] md:bg-transparent md:bg-[url('/images/for-developers/panel_op.png')]">
            <div>
              <h3 className="text-[24px] font-bold leading-[1.25] md:text-[18px]">
                <Trans>Myria launches $200M game developer grant program</Trans>
              </h3>
              <p className="mt-4 max-w-[488px] text-[16px] leading-[1.5] text-light md:mt-6 md:text-[18px]">
                <Trans>We are funding the builders and creators to power the future of blockchain gaming.
                Apply for grant consideration.</Trans>
              </p>
            </div>
            <button className="btn-lg btn-primary mt-8 md:mt-0"><Trans>Apply now</Trans></button>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-14 md:mt-10')}>
          <div className="mx-auto max-w-content">
            <Ethereum />
          </div>
        </section>
        <div
          style={
            {
              '--bg':
                'linear-gradient(180deg, #050E15 -1.93%, #041825 15.28%, #041723 80.47%, #050E15 98.21%)',
              backgroundSize: '100% 1911px'
            } as any
          }
          className={clsx(
            'mt-[95px] mb-[120px] bg-no-repeat md:mt-[170px] md:mb-[152px] md:[background-image:var(--bg)]'
          )}>
          <section
            style={
              {
                '--bg':
                  'linear-gradient(179.98deg, #050E15 0.01%, #041825 3.82%, #041723 93.84%, #050E15 99.99%)'
              } as any
            }
            className={clsx(
              paddingX,
              'mx-auto max-w-[966px] bg-bottom bg-no-repeat [background-size:100%_calc(100%-238px)] [background-image:var(--bg)] md:bg-none'
            )}>
            <Myria />
          </section>
          <section className={clsx(paddingX, 'mx-auto mt-[45px] md:mt-[163px]')} id="dev-contact">
            <BuildYourBlockchain />
          </section>
        </div>
      </div>
    </Page>
  );
};

export default ForDevelopers;
