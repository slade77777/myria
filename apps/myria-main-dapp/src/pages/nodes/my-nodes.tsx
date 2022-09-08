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

const MyNode: React.FC = () => {
  const { address } = useWalletContext();
  const { user, userProfileQuery } = useAuthenticationContext();
  const router = useRouter();
  const [firstLicense, setFirstLicense] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    // validate either wallet is connected
    if (!address || (!userProfileQuery.isFetching && !user)) {
      router.push('/nodes');
    }
  }, [address, router, user, userProfileQuery.isFetching]);

  const { data } = useUserNodes();
  const successTrans = data?.filter((item) => item.purchaseStatus === 'SUCCESSFUL');

  return (
    <Page action="start-building">
      <TermsOfServiceModal
        open={firstLicense}
        onClose={() => setFirstLicense(false)}
        onAgree={() => setFirstLicense(false)}
      />
      <PrivacyPolicyModal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        onAgree={() => setShowPrivacy(false)}
      />
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(
          paddingX,
          "bg-[url('/images/nodes/purchase-page-bg.png')] bg-top bg-no-repeat md:mb-[120px]"
        )}>
        <div className="mx-auto mt-[30px] w-full max-w-[1734]">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[67.5fr_32.5fr]">
            <div className="relative w-full overflow-hidden md:mt-0">
              <License />
            </div>
            <div className="float-right -mx-6 mt-[130px] md:mx-0 md:mt-0">
              <div className="bg-brand-deep-blue rounded-t-lg p-6 md:rounded-lg md:p-8">
                <p className="text-white font-bold text-2xl">My nodes</p>
                <p className="text-base/9 mt-2">Here are the node licenses you have purchased:</p>
                <div className="mt-4">
                  {successTrans.map((transaction) => (
                    <>
                      {transaction?.nodes?.map((node) => (
                        <div key={node.nodeId} className="flex flex-row items-center gap-4">
                          <TreeIcon fill="white" width={20} height={20} />
                          <span>{node.nodeId}</span>
                        </div>
                      ))}
                    </>
                  ))}
                </div>
                <div className="h-[0.5px] w-full bg-slate-200 my-8" />
                <p>
                  Read the{' '}
                  <span
                    onClick={() => setFirstLicense(true)}
                    className="text-brand-gold cursor-pointer">
                    future node purchase agreement
                  </span>
                </p>
                <p className="mt-2">
                  Read the{' '}
                  <span
                    onClick={() => setShowPrivacy(true)}
                    className="text-brand-gold cursor-pointer">
                    privacy policy
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
