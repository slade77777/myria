import clsx from 'clsx';
import React from 'react';
import Order from 'src/components/Purchase/Order';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import ModalPurchase from 'src/components/Purchase/Modals';
import { paddingX } from 'src/utils';

const Nodes: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const onPlaceOrder = () => {
    setOpenModal(true);
    // login();
  };

  return (
    <Page footerClassName="hidden md:block">
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
            <div className="sticky bottom-0 -mx-6 mt-[80px] md:top-5 md:mx-0 md:mt-0">
              <Order onPlaceOrder={onPlaceOrder} />
            </div>
          </div>
        </div>
      </div>
      <ModalPurchase open={openModal} onClose={() => setOpenModal(false)} />
      {/* <SignInModal open={false} onClose={() => console.log('abc')} /> */}
      {/* <RegisterModal open={true} onClose={() => console.log('abc')} /> */}
    </Page>
  );
};

export default Nodes;
