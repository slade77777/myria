import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import React from 'react';
import Order from 'src/components/Purchase/Order';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import ModalPurchase from 'src/components/Purchase/Modals';
import { paddingX } from 'src/utils';
import { useWalletContext } from 'src/context/wallet';

import Header from 'src/components/nodes/Header';
import { useRouter } from 'next/router';

const Purchase: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const { onConnect } = useWalletContext();
  const [quantity, setQuantity] = React.useState(0);
  const router = useRouter();

  const setQuantityNumberOrder = (childdata: number): void => {
    setQuantity(childdata);
  };

  const onPlaceOrder = async () => {
    await onConnect();
    if (quantity > 0) {
      setOpenModal(true);
    }
  };

  const handlePurchaseComplete = useCallback(() => {
    setOpenModal(false);
    router.push('/nodes/purchase-complete');
  }, [router])

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
        <div className="mx-auto mt-[30px] w-full max-w-[1734] md:mt-[109px]">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[67.5fr_32.5fr]">
            <div className="md:mt-0">
              <License />
            </div>
            <div className="sticky bottom-0 -mx-6 mt-[130px] md:top-5 md:mx-0 md:mt-0">
              <Order onPlaceOrder={onPlaceOrder} setQuantityNumberOrder={setQuantityNumberOrder} />
            </div>
          </div>
        </div>
      </div>
      <ModalPurchase
        quantity={quantity}
        priceEthUsd={1800}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
      {/* <SignInModal open={false} onClose={() => console.log('abc')} /> */}
      {/* <RegisterModal open={true} onClose={() => console.log('abc')} /> */}
    </Page>
  );
};

export default Purchase;
