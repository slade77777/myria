import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import React from 'react';
import Order from 'src/components/Purchase/Order';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import ModalPurchase, { PurchaseInformationProps } from 'src/components/Purchase/Modals';
import { paddingX } from 'src/utils';
import { useWalletContext } from 'src/context/wallet';

import Header from 'src/components/nodes/Header';
import { useRouter } from 'next/router';
import { useAuthenticationContext } from 'src/context/authentication';
import WhiteListSale from 'src/components/Purchase/Modals/WhiteListSale';

const Purchase: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState<PurchaseInformationProps>({
    quantity: 0,
    totalPriceEth: 0,
    totalPriceUsd: 0,
    toAddress: "",
    nonce: "",
    transactionId: ""
  });
  const { onConnect, address } = useWalletContext();
  const { user, userProfileQuery } = useAuthenticationContext();
  const router = useRouter();

  useEffect(() => {
    // validate either wallet is connected
    if (!address) {
      router.push('/nodes');
    }
    if (userProfileQuery.isFetching) {
      return;
    }
    if (!user) {
      router.push('/nodes');
    }
  }, [address, router, user, userProfileQuery.isFetching]);

  const onPlaceOrder = async (data: PurchaseInformationProps) => {
    await onConnect();
    if (data.quantity > 0) {
      setModalData(data);
      setOpenModal(true);
    }
  };

  const handlePurchaseComplete = useCallback(async (txId: string) => {
    setOpenModal(false);
    router.push('/nodes/purchase-complete');
  }, [router]);

  return (
    <Page headerClassName="hidden" footerClassName="hidden md:block">
      <Header />
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
            <div className="relative float-left h-[calc(100vh_-_80px)] w-full overflow-hidden md:mt-0">
              <License />
            </div>
            <div className="float-right -mx-6 mt-[130px] md:mx-0 md:mt-0">
              <Order onPlaceOrder={onPlaceOrder} />
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
      {/* <SignInModal open={false} onClose={() => console.log('abc')} /> */}
      {/* <RegisterModal open={true} onClose={() => console.log('abc')} /> */}
      {/* <WhiteListSale open onClose={() => null} /> */}
    </Page>
  );
};

export default Purchase;
