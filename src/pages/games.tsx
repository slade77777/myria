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
          <div className="absolute left-0 h-[809px] w-full z-[-1]">
            <div className="relative w-full h-full ">
              <Image src="/images/games/header-bg.png" alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="w-full mx-auto max-w-content ">
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] text-center">
              Our games
            </h1>
            <div className="mt-[100px] md:mt-[180px]">
              <OurGames />
            </div>
            <div className="flex justify-end">
              <div className="mt-[32px] py-[23px] px-[38px] text-right bg-brand-deep-blue rounded-[20px]">
                <p className="body-md md:body-lg">More games coming soon...</p>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[150px] ')}>
          <div className="grid items-center gap-6 mx-auto md:grid-cols-2 max-w-content">
            <div>
              <Image
                src="/images/games/lama.png"
                alt=""
                width={1522}
                height={1142}
                layout="responsive"
              />
            </div>
            <div className="xl:pr-[100px] text-center md:text-left">
              <h2 className="heading-sm md:heading-md">Start playing and earning rewards</h2>
              <p className="mt-6 body text-light">
                Our games offer a range of play and earn mechanics that reward players with
                cryptocurrency and NFTs.
              </p>
              <p className="mt-6 body text-light">
                Unlike most blockchain games, all of our games are free-to-play.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[150px] ')}>
          <div className="grid items-center gap-6 mx-auto md:grid-cols-2 max-w-content">
            <div>
              <Image
                src="/images/games/reward.png"
                alt=""
                width={1757}
                height={1368}
                layout="responsive"
              />
            </div>
            <div className="xl:pl-[100px] text-center md:text-left md:order-[-1]">
              <h2 className="heading-sm md:heading-md">Buy limited founding NFTs</h2>
              <p className="mt-[38px] body text-light">
                Myria are releasing limited drops of exclusive founding Myria land, avatars, and
                skins. These items will never be made available to the public again and will forever
                commemorate holders as pioneers in the Myriaverse.
              </p>
              <button className="mt-10 btn-lg btn-primary">Learn more</button>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[218px]')}>
          <div className="mx-auto max-w-content">
            <JoinTheRevolution />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[168px] mb-[156px] md:mb-[180px]')}>
          <Subscribe />
        </section>
      </div>
    </Page>
  );
};

export default Games;
