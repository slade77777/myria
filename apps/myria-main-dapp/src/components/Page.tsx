import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { paddingX } from '../utils';
import FirstTimeVisitModal from './FirstTimeVisitModal';
import Footer from './Footer';
import Header from './Header';
import { Action } from './Header/type';
import MessageDepositModal from './marketplace/MessageModal/MessageDepositModal';
import MessageModal from './marketplace/MessageModal/MessageModal';
import { useDepositContext } from 'src/context/deposit-context';

type Props = {
  action?: Action;
  headerClassName?: string;
  footerClassName?: string;
  stickyHeader?: boolean;
  includeFooter?: boolean;
};

const TIME_SHOW_FIRST_TIME_VISIT_MODAL = 10_000;

const Page: React.FC<Props> = ({
  children,
  action,
  headerClassName,
  stickyHeader = true,
  footerClassName,
  includeFooter = true
}) => {
  const [firstTimeVisit, setFirtTimeVisit] = useLocalStorage(localStorageKeys.firstTime, true);
  const [showFirstTimeVisitModal, setShowFirstTimeVisitModal] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (firstTimeVisit) {
      timeout = setTimeout(() => {
        setShowFirstTimeVisitModal(true);
        setFirtTimeVisit(false);
      }, TIME_SHOW_FIRST_TIME_VISIT_MODAL);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [firstTimeVisit, setFirtTimeVisit]);

  const { showMessageDeposit, handleShowMessageDeposit } = useDepositContext();

  const handleCloseFirstTimeVisitModal = () => {
    setShowFirstTimeVisitModal(false);
  };

  return (
    <>
      <FirstTimeVisitModal
        open={showFirstTimeVisitModal}
        onClose={handleCloseFirstTimeVisitModal}
      />
      <div className="bg-dark relative h-screen text-white">
        <div id="modal-root"></div>
        <Header
          className={headerClassName}
          action={action}
          stickyHeader={!!stickyHeader || stickyHeader === undefined}
        />
        <div className="h-screen">
          <div className={clsx('bg-dark', { 'pb-[149px] md:pb-[112px]': !includeFooter })}>
            {children}
            {includeFooter && (
              <div className={clsx(paddingX, 'bg-dark pb-[149px] md:pb-[112px]', footerClassName)}>
                <div className="max-w-content mx-auto">
                  <Footer />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showMessageDeposit && (
        <MessageModal
          isShowMessage={showMessageDeposit}
          setIsShowMessage={() => handleShowMessageDeposit(false)}>
          <MessageDepositModal onClose={() => handleShowMessageDeposit(false)} />
        </MessageModal>
      )}
    </>
  );
};

export default Page;
