import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import { Trans } from '@lingui/macro';
import Header from 'src/components/nodes/Header';
import { useRouter } from 'next/router';


const PurchaseComplete: React.FC = () => {
  const router = useRouter();
  return (
    <Page headerClassName="hidden">
      <Header />
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(
          ""
        )}>
        <div className="mx-auto w-full px-6 py-14 text-center md:max-w-[832px] min-h-[600px] bg-[url('/images/nodes/globe_op.png')] bg-cover bg-top bg-no-repeat">
          <h1 className="heading-md text-center font-extrabold text-blue/7 md:heading-massive">
            <Trans>Congratulations!</Trans>
            <br />
            <span className="text-brand-white">
              <Trans>Your purchase is complete.</Trans>
            </span>
          </h1>

          <div className="heading-sm mt-8 mb-12 text-center">
            <Trans>Get started with your Myria node.</Trans>
          </div>
          <button className="btn-lg btn-primary" onClick={() => { router.push('/nodes/dashboard') }}>
            <Trans>GO TO DASHBOARD</Trans>
          </button>
        </div>
      </div>
    </Page>
  );
};

export default PurchaseComplete;
