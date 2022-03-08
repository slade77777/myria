import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import GameList from 'src/components/games/GameList';
import NotiBanner from 'src/components/NotiBanner';
import Program from 'src/components/Program';
import Subscribe from 'src/components/Subscribe';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { paddingX } from '../utils';

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
            <section className="relative mt-6 flex h-[288px] items-center rounded-[5px] bg-[url('/images/games/header-bg.png')] bg-cover bg-left px-[56px]">
              <p className="max-w-[420px] text-[40px] font-medium leading-[1.15]">
                <Trans>
                  <span className="text-brand-gold">Play</span> and earn <br /> rewards and NFTs
                </Trans>
              </p>
            </section>
            <section className="mt-[88px]">
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
