import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import GameList from 'src/components/games/GameList';
import NotiBanner from 'src/components/NotiBanner';
import Program from 'src/components/Program';
import Subscribe from 'src/components/Subscribe';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { negativeMarginXSm, paddingX } from '../utils';

const Games: React.FC = () => {
  return (
    <>
      <NotiBanner />
      <Page>
        <div
          style={{
            paddingTop: headerHeight
          }}
          className={paddingX}>
          <div className="mx-auto max-w-content">
            <section
              className={clsx(
                negativeMarginXSm,
                "mt-5 flex h-[479px] bg-[url('/images/games/header-bg-mobile.png')] bg-cover bg-left px-6 pt-[85px] text-center md:mx-0 md:mt-6 md:h-[288px] md:items-center md:rounded-[5px]  md:bg-[url('/images/games/header-bg.png')] md:px-[56px] md:pt-0 md:text-left"
              )}>
              <p className="heading-lg mx-auto max-w-[420px] md:mx-0 md:font-medium">
                <Trans>
                  <span className="text-brand-gold">Play</span> and earn <br /> rewards and NFTs
                </Trans>
              </p>
            </section>
            <section className="-mt-7 md:mt-[88px]">
              <GameList />
            </section>
            <section className={'mt-[116px]'}>
              <Program />
            </section>
            <section className={clsx('mt-8 mb-[100px]')}>
              <Subscribe />
            </section>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Games;
