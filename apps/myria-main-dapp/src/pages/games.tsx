import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import GameList from 'src/components/games/GameList';
import { headerNavSpacingClassName } from 'src/components/Header/Header';
import Program from 'src/components/Program';
import Subscribe from 'src/components/Subscribe';
import Page from '../components/Page';
import { negativeMarginXSm, paddingX } from '../utils';

const Games: React.FC = () => {
  return (
    <Page>
      <div className={clsx(paddingX, headerNavSpacingClassName)}>
        <div className="max-w-content mx-auto">
          <section className="mt-[80px]">
            <h1 className="text-4xl font-bold leading-[125%] text-white">
              Discover the latest projects on Myria
            </h1>
            <h3 className="mt-4 text-lg leading-[150%] text-white">
              Web3 projects build on Myria to offer 0 gas fee, high scalability and security
            </h3>
          </section>
          <section className="-mt-7 md:mt-[88px]">
            <GameList />
          </section>
          <section className={'mt-[54px] md:mt-[116px]'}>
            <Program />
          </section>
          <section className={clsx('mt-6 mb-[100px] md:mt-8')}>
            <Subscribe />
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Games;
