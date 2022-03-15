import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Backbone from 'src/components/ecosystem/Backbone';
import Diagram from 'src/components/ecosystem/Diagram';
import Platform from 'src/components/ecosystem/Platform';
import Page from '../components/Page';
import { paddingX } from '../utils';

const data = [
  {
    className: 'text-brand-gold',
    title: 'Humblebrag polaroid biodiesel kickstarter',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.'
  },
  {
    className: 'text-brand-light-blue',
    title: 'Humblebrag polaroid biodiesel kickstarter',
    description: 'Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade.'
  }
];

const Ecosystem: React.FC = () => {
  return (
    <Page>
      <div>
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
          <section className="mx-auto mt-10 mb-[53px] grid max-w-[1049px] gap-6 md:mb-[95px] md:mt-[131px] md:grid-cols-2 md:gap-8">
            {data.map((item, idx) => (
              <div
                key={idx}
                className={clsx(
                  item.className,
                  'flex space-x-6 rounded-xl bg-brand-deep-blue py-8 pr-6'
                )}>
                <div className="h-[103px] rounded-r-full border-r-[51px]  [border-color:currentColor]" />
                <div className="">
                  <h3 className="text-[20px] font-bold leading-[1.25]">{item.title}</h3>
                  <p className="mt-6 text-[18px] leading-[1.5] text-light">{item.description}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Ecosystem;
