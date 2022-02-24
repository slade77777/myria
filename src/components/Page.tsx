import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { paddingX } from '../utils';
import FirstTimeVisitModal from './FirstTimeVisitModal';
import Footer from './Footer';
import Header, { Action } from './Header';
import Modal from './Modal';

type Props = {
  action?: Action;
  headerClassName?: string;
  stickyHeader?: boolean;
};

const TIME_SHOW_FIRST_TIME_VISIT_MODAL = 10_000;

const Page: React.FC<Props> = ({ children, action, headerClassName, stickyHeader = true }) => {
  const [firstTimeVisit, setFirtTimeVisit] = useLocalStorage(localStorageKeys.firstTime, true);
  const [showFirstTimeVisitModal, setShowFirstTimeVisitModal] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (firstTimeVisit) {
      timeout = setTimeout(() => {
        setShowFirstTimeVisitModal(true);
        console.log('runn');

        setFirtTimeVisit(false);
      }, TIME_SHOW_FIRST_TIME_VISIT_MODAL);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [firstTimeVisit, setFirtTimeVisit]);

  const handleCloseFirstTimeVisitModal = () => {
    setShowFirstTimeVisitModal(false);
  };

  return (
    <>
      <FirstTimeVisitModal
        open={showFirstTimeVisitModal}
        onClose={handleCloseFirstTimeVisitModal}
      />
      <div className="relative min-h-screen bg-red-500 text-white">
        <Header
          className={headerClassName}
          action={action}
          stickyHeader={!!stickyHeader || stickyHeader === undefined}
        />
        <div className="bg-dark">
          {children}
          <div className={clsx(paddingX, 'pb-[149px] md:pb-[112px]')}>
            <div className="mx-auto max-w-content">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
