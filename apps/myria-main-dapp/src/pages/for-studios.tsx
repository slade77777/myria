import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import CardWithIcon from '../components/CardWithIcon';
import GetInTouch from '../components/GetInTouch';
import { headerHeight } from '../components/Header';
import ChartIcon from '../components/icons/ChartIcon';
import StarIcon from '../components/icons/StarIcon';
import UserIcon from '../components/icons/UserIcon';
import Page from '../components/Page';
import { paddingX } from '../utils';

const data = [
  {
    icon: (
      <div className="w-[64px]">
        <ChartIcon />
      </div>
    ),
    title: <Trans>Blockchain platform for game studios</Trans>,
    description: (
      <Trans>
        We provide a full suite of blockchain infrastructure on the Myria chain, our Ethereum L2
        built for gaming.{' '}
      </Trans>
    )
  },
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: <Trans>Myria ecosystem fund</Trans>,
    description: (
      <Trans>
        Got an innovative gaming idea? Apply for a grant to manifest your vision on the Myria chain.
      </Trans>
    )
  },
  {
    icon: (
      <div className="w-[64px]">
        <StarIcon />
      </div>
    ),
    title: <Trans>Education and support</Trans>,
    description: (
      <Trans>
        Access ongoing education and technical support to ensure a successful onboarding onto the
        blockchain.{' '}
      </Trans>
    )
  }
];

const Games: React.FC = () => {
  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight,
            backgroundPositionY: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen ')}>
          <div
            style={{
              top: headerHeight
            }}
            className="absolute left-0 z-[-1] h-[783px] w-full">
            <div className="relative h-full w-full ">
              <Image src="/images/header-bg_op.png" alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-content ">
            <h1 className="heading-lg mx-auto mt-[50px] max-w-[756px] text-center text-brand-white md:heading-massive md:mt-[120px]">
              <Trans>Blockchain infrastructure for Game Studios</Trans>
            </h1>
            <p className="heading-sm mx-auto mt-[32px] max-w-[672px] text-center">
              <Trans>
                An end-to-end solution for token-based game economies and NFTs that benefits the
                community
              </Trans>
            </p>
          </div>
          <h2 className="heading-md mt-[252px] text-center">What we do</h2>
          <div className="mx-auto mt-[92px] grid  max-w-content gap-y-[78px] gap-x-[32px] md:grid-cols-4 xl:grid-cols-3">
            {data.map((item, idx) => (
              <CardWithIcon
                key={idx}
                icon={item.icon}
                className={clsx('md:col-span-2 xl:col-span-1', {
                  'md:col-start-2': idx === 2
                })}>
                <h3 className="heading-sm mx-auto max-w-[314px] md:heading-md">{item.title}</h3>
                <p className="body-sm mt-6 mb-[62px] md:body">{item.description}</p>
              </CardWithIcon>
            ))}
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[120px] mb-[200px]')}>
          <div className="mx-auto max-w-content">
            <GetInTouch />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Games;
