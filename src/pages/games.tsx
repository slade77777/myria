import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Subscribe from 'src/components/Subscribe';
import { headerHeight } from '../components/Header';
import JoinTheRevolution from '../components/JoinTheRevolution';
import OurGames from '../components/OurGames';
import Page from '../components/Page';
import { paddingX } from '../utils';

const Games: React.FC = () => {
  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen ')}>
          <div className="absolute left-0 z-[-1] h-[809px] w-full">
            <div className="relative h-full w-full ">
              <Image src="/images/games/header-bg_op.png" alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-content ">
            <h1 className="heading-lg mt-[50px] text-center text-brand-white md:heading-massive md:mt-[120px]">
              Our games
            </h1>
            <div className="mt-[100px] md:mt-[180px]">
              <OurGames />
            </div>
            <div className="flex justify-end">
              <div className="mt-[32px] rounded-[20px] bg-brand-deep-blue py-[23px] px-[38px] text-right">
                <p className="body-md md:body-lg">
                  <Trans>More games coming soon...</Trans>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[150px] ')}>
          <div className="mx-auto grid max-w-content items-center gap-6 md:grid-cols-2">
            <div>
              <Image
                src="/images/games/lama_op.png"
                alt=""
                width={1522}
                height={1142}
                layout="responsive"
              />
            </div>
            <div className="text-center md:text-left xl:pr-[100px]">
              <h2 className="heading-sm md:heading-md">
                <Trans>Start playing and earning rewards</Trans>
              </h2>
              <p className="body mt-6 text-light">
                <Trans>
                  Our games offer a range of play and earn mechanics that reward players with
                  cryptocurrency and NFTs.
                </Trans>
              </p>
              <p className="body mt-6 text-light">
                <Trans>Unlike most blockchain games, all of our games are free-to-play.</Trans>
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[150px] ')}>
          <div className="mx-auto grid max-w-content items-center gap-6 md:grid-cols-2">
            <div>
              <Image
                src="/images/games/reward_op.png"
                alt=""
                width={1757}
                height={1368}
                layout="responsive"
              />
            </div>
            <div className="text-center md:order-[-1] md:text-left xl:pl-[100px]">
              <h2 className="heading-sm md:heading-md">
                <Trans>Buy limited founding NFTs</Trans>
              </h2>
              <p className="body mt-[38px] text-light">
                <Trans>
                  Myria are releasing limited drops of exclusive founding Myria land, avatars, and
                  skins. These items will never be made available to the public again and will
                  forever commemorate holders as pioneers in the Myriaverse.
                </Trans>
              </p>
              <button className="btn-lg btn-primary mt-10">
                <Trans>Releasing soon</Trans>
              </button>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[150px]')}>
          <div className="mx-auto max-w-content">
            <JoinTheRevolution />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[32px] mb-[156px] md:mt-[54px]')}>
          <Subscribe />
        </section>
      </div>
    </Page>
  );
};

export default Games;
