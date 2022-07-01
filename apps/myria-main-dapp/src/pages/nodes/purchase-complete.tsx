import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import { Trans } from '@lingui/macro';
import Header from 'src/components/nodes/Header';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
        className={clsx('')}>
        <div className="mx-auto min-h-[600px] w-full bg-[url('/images/nodes/globe_op.png')] bg-cover bg-top bg-no-repeat px-6 py-14 text-center md:max-w-[832px]">
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
          {/* <Link href="/nodes/dashboard/nodes">
            <a className="btn-lg btn-primary">
              <Trans>GO TO DASHBOARD</Trans>
            </a>
          </Link> */}
        </div>
      </div>
    </Page>
  );
};

export default PurchaseComplete;
