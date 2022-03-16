import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import BuyerNodeCard from 'src/components/BuyerNodeCard';
import Backbone from 'src/components/ecosystem/Backbone';
import Diagram from 'src/components/ecosystem/Diagram';
import Platform from 'src/components/ecosystem/Platform';
import { bannerSpacingClassName } from 'src/components/Header/Header';
import JoinMyriaCard from 'src/components/JoinMyriaCard';
import Page from '../components/Page';
import { paddingX } from '../utils';

const Ecosystem: React.FC = () => {
  return (
    <Page>
      <div className={bannerSpacingClassName}>
        <section
          className={clsx(
            paddingX,
            "flex min-h-[657px] flex-col items-center bg-[url('/images/ecosystem/header-bg-mobile_op.png')] bg-cover bg-bottom text-center md:min-h-[537px] md:justify-end md:bg-[url('/images/ecosystem/header-bg_op.png')] md:pb-[58px]"
          )}>
          <div className="mx-auto mt-[132px] max-w-[668px] md:mt-0">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">
              <Trans>Enhancing the power of play through blockchain</Trans>
            </h1>
            <p className="mt-6 text-[18px] font-medium leading-[1.5] md:text-[20px] md:font-normal">
              <Trans>
                Myria is a decentralised Ethereum Layer 2, built to empower digital assets, NFT and
                blockchain gaming.
              </Trans>
            </p>
          </div>
        </section>
        <div className={clsx(paddingX, 'mt-[56px] md:mt-[112px]')}>
          <section className="mx-auto max-w-content">
            <Platform />
          </section>
          <section className="mx-auto mt-[56px] max-w-[1049px] md:mt-[112px]">
            <Backbone />
          </section>
          <section className="mt-12 md:mt-[100px]">
            <Diagram />
          </section>

          <section className={clsx(paddingX, 'mt-10 mb-[53px] md:mb-[131px] md:mt-[80px]')}>
            <div className="mx-auto grid max-w-content gap-8 md:grid-cols-2">
              <BuyerNodeCard />
              <JoinMyriaCard />
            </div>
          </section>

        </div>
      </div>
    </Page>
  );
};

export default Ecosystem;
