import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import { Trans } from '@lingui/macro';

const PurchaseComplete: React.FC = () => {
  return (
    <Page action="start-building">
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx('')}>
        <div className="mx-auto min-h-[600px] w-full bg-[url('/images/nodes/globe_op.png')] bg-cover bg-top bg-no-repeat px-6 py-14 text-center">
          <h1 className="text-5xl text-center font-extrabold text-blue/7 md:heading-massive">
            <Trans>Congratulations!</Trans>
            <br />
            <span className="text-white text-5xl">
              <Trans>Your node purchase request is complete.</Trans>
            </span>
          </h1>

          <div className="text-2xl mt-8 mb-12 text-center">
            <Trans>Check back shortly to see if your ethereum transaction is complete.</Trans>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PurchaseComplete;
