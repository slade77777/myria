import clsx from 'clsx';
import React from 'react';
import Order from 'src/components/Purchase/Order';
import { headerHeight } from '../../components/Header';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import ModalPurchase from 'src/components/Purchase/Modals';

const Nodes: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const onPlaceOrder = () => {
    setOpenModal(true);
  };

  return (
    <Page>
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(
          "mb-[120px] bg-[url('/images/nodes/purchase-page-bg.png')] bg-top bg-no-repeat"
        )}>
        <div className="mx-auto w-full max-w-[1734] px-6 md:px-[88px]">
          <h1 className="heading-md max-w-[756px] font-extrabold text-brand-white md:heading-lg md:mt-[151px]">
            Purchase a Myria Node
          </h1>

          <div className="mt-[80px] flex flex-col md:flex-row">
            <div className="mb-8 md:mb-0 md:mr-8 md:w-[calc((100%-32px)*0.675)]">
              <License />
            </div>
            <div className="sticky top-5 h-full md:w-[calc((100%-32px)*0.325)]">
              <Order onPlaceOder={onPlaceOrder} />
            </div>
          </div>
        </div>
      </div>
      <ModalPurchase open={openModal} onClose={() => setOpenModal(false)} />
    </Page>
  );
};

export default Nodes;
