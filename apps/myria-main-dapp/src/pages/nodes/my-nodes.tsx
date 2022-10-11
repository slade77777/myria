import { useEffect, useState } from 'react';
import clsx from 'clsx';
import React from 'react';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import { paddingX } from 'src/utils';
import { useWalletContext } from 'src/context/wallet';

import { useRouter } from 'next/router';
import { useAuthenticationContext } from 'src/context/authentication';
import TreeIcon from '../../components/icons/TreeIcon';
import TermsOfServiceModal from '../../components/Purchase/Modals/TermsOfServiceModal';
import PrivacyPolicyModal from '../../components/Purchase/Modals/PrivacyPolicyModal';
import useUserNodes from '../../hooks/useUserNodes';
import MyNodeModal from '../../components/nodes/MyNodeModal';
import { Trans } from '@lingui/macro';
import Button from '../../components/core/Button';

const MyNode: React.FC = () => {
  const { address } = useWalletContext();
  const { user, userProfileQuery } = useAuthenticationContext();
  const router = useRouter();
  const [firstLicense, setFirstLicense] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showFullNode, setShowNode] = useState(false);

  useEffect(() => {
    // validate either wallet is connected
    if (!userProfileQuery.isFetching && !user) {
      router.push('/nodes');
    }
  }, [address, router, user, userProfileQuery.isFetching]);

  const { data } = useUserNodes();
  const successTrans = data?.filter((item) => item.purchaseStatus === 'SUCCESSFUL');

  return (
    <Page action="start-building">
      <TermsOfServiceModal open={firstLicense} onClose={() => setFirstLicense(false)} />
      <PrivacyPolicyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <MyNodeModal open={showFullNode} onClose={() => setShowNode(false)} />
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(paddingX, 'md:mb-[120px]')}>
        <div className="mx-auto mt-[30px] w-full max-w-[1734]">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[67.5fr_32.5fr]">
            <div className="relative w-full overflow-hidden md:mt-0">
              <License />
            </div>
            <div className="float-right -mx-6 mt-[130px] md:mx-0 md:mt-0">
              <div className="bg-brand-deep-blue rounded-t-lg p-6 md:rounded-lg md:p-8">
                <p className="text-2xl font-bold text-white">My nodes</p>
                <p className="text-base/9 mt-2">
                  Here are the node licenses you have purchased (if you have recently purchased,
                  your license/s may take up to 10 minutes to appear):
                </p>
                <div className="mt-4">
                  <Button
                    className="btn-lg w-full px-4 uppercase text-black bg-brand-gold"
                    onClick={() => setShowNode(true)}>
                    <Trans>View Node Licenses</Trans>
                  </Button>
                </div>
                <div className="my-8 h-[0.5px] w-full bg-slate-200" />
                <p>
                  Read the{' '}
                  <span
                    onClick={() => setFirstLicense(true)}
                    className="text-brand-gold cursor-pointer">
                    Terms & conditions
                  </span>
                </p>
                <p className="mt-2">
                  Read the{' '}
                  <span
                    onClick={() => setShowPrivacy(true)}
                    className="text-brand-gold cursor-pointer">
                    Privacy policy
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MyNode;
