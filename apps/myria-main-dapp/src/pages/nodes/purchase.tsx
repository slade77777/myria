import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import React from 'react';
import Order from 'src/components/Purchase/Order';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import ModalPurchase, { PurchaseInformationProps } from 'src/components/Purchase/Modals';
import { paddingX } from 'src/utils';
import { useWalletContext } from 'src/context/wallet';
import { useRouter } from 'next/router';
import { useAuthenticationContext } from 'src/context/authentication';
import WhiteListSale, { WarningNodeType } from '../../components/Purchase/Modals/WhiteListSale';
import useNodePurchase from '../../hooks/useNodePurchase';

const Purchase: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [warningType, setWarningType] = useState<WarningNodeType>();
  const [showWarning, setShowWarning] = useState(false);
  const [modalData, setModalData] = React.useState<PurchaseInformationProps>({
    quantity: 0,
    totalPriceEth: 0,
    totalPriceUsd: 0,
    toAddress: '',
    nonce: '',
    transactionId: ''
  });
  const { onConnectCompaign, address } = useWalletContext();
  const { user, userProfileQuery, account, accountProfileQuery } = useAuthenticationContext();
  const router = useRouter();
  const { error, data } = useNodePurchase();

  useEffect(() => {
    router.push('/nodes');
    // validate either wallet is connected
    // if (!address || (!userProfileQuery.isFetching && !user)) {
    //   router.push('/nodes');
    // }
  }, [address, router, user, userProfileQuery.isFetching]);

  useEffect(() => {
    if (account && !accountProfileQuery.isFetching) {
      if (error?.status === 403 && !account?.normalized_email) {
        setShowWarning(true);
        setWarningType('not-valid');
      } else if (!account?.normalized_email) {
        setShowWarning(true);
        setWarningType('not-email');
      } else if (error?.status === 403) {
        setShowWarning(true);
        setWarningType('not-whitelist');
      }
    }
  }, [account, accountProfileQuery.isFetching, error?.status]);

  const onPlaceOrder = async (data: PurchaseInformationProps) => {
    if (data.quantity > 0) {
      setModalData(data);
      setOpenModal(true);
    }
  };

  const handlePurchaseComplete = useCallback(
    async (txId: string) => {
      setOpenModal(false);
      router.push('/nodes/purchase-pending?tx=' + txId);
      localStorage.setItem('showSuccess', 'true');
    },
    [router]
  );

  return (
    <Page action="start-building">
      {/*<Header />*/}
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(paddingX, 'md:mb-[120px]')}>
        <div className="mx-auto mt-[30px] w-full max-w-[1734] md:px-10">
          <div className="grid grid-cols-1 items-start gap-y-8 gap-x-[26px] md:grid-cols-[67.5fr_32.5fr]">
            <div className="relative w-full overflow-hidden md:mt-0">
              <License />
            </div>
            <div className="float-right -mx-6 mt-[130px] md:mx-0 md:mt-0">
              <Order onPlaceOrder={onPlaceOrder} warningType={warningType} />
            </div>
          </div>
        </div>
      </div>
      <ModalPurchase
        data={modalData}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
      {showWarning && (
        <WhiteListSale open warningType={warningType} setWarningType={setWarningType} />
      )}
    </Page>
  );
};

export default Purchase;
