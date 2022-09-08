import clsx from 'clsx';
import React, { useEffect } from 'react';
import { headerHeight } from '../../../components/Header';
import Page from '../../../components/Page';
import { Trans } from '@lingui/macro';
import { getBaseExploreLink } from 'src/utils';
import { useWalletContext } from 'src/context/wallet';
import { useRouter } from 'next/router';
import useUserNodes from '../../../hooks/useUserNodes';

const PurchasePending: React.FC = () => {
  const { chainId } = useWalletContext();
  const router = useRouter();
  const tx = router.query['tx'];

  const { data: userNodes } = useUserNodes();

  useEffect(() => {
    const hasPendingTransaction = userNodes.find(
      (transaction) => transaction.purchaseStatus === 'PENDING'
    );
    if (!hasPendingTransaction) {
      router.push('/nodes/purchase-complete');
    }
  }, [router, userNodes]);

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
          <a
            className="btn-lg btn-primary mt-2"
            target={'_blank'}
            rel="noreferrer"
            href={`${getBaseExploreLink('transaction', chainId as number)}/${tx}`}>
            <Trans>Check Transaction</Trans>
          </a>
        </div>
      </div>
    </Page>
  );
};

export default PurchasePending;
