import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Backbone from 'src/components/ecosystem/Backbone';
import Diagram from 'src/components/ecosystem/Diagram';
import Platform from 'src/components/ecosystem/Platform';
import { headerHeight } from '../components/Header';
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
            "flex min-h-[537px] flex-col items-center justify-end bg-[url('/images/ecosystem/header-bg.png')] bg-cover bg-top pb-[58px] text-center"
          )}>
          <div className="mx-auto max-w-[668px]">
            <h1 className="text-[40px] font-extrabold leading-[1.15]">
              Enhancing the power of play through blockchain
            </h1>
            <p className="mt-6 text-[20px] leading-[1.5]">
              Myria is a decentralised Ethereum Layer 2, built to empower digital assets, NFT and
              blockchain gaming.
            </p>
          </div>
        </section>
        <div className={clsx(paddingX, 'mt-[112px]')}>
          <section className="mx-auto max-w-content">
            <Platform />
          </section>
          <section className="mx-auto mt-[112px] max-w-[1049px]">
            <Backbone />
          </section>
          <section className="mt-[100px]">
            <Diagram />
          </section>
          <section className="mx-auto mt-[131px] mb-[95px] grid max-w-[1049px] grid-cols-2 gap-8">
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
