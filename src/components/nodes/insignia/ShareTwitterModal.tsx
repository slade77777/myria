import Image from 'next/image';
import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import LinkIcon from 'src/components/icons/LinkIcon';
import Modal from 'src/components/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ShareTwitterModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <>
      <Modal open={open} onOpenChange={onClose}>
        <Modal.Content includingHeader={false}>
          <div className="flex flex-col p-8 shadow-dark-panel">
            <div className="flex items-center justify-between">
              <p className="text-[32px] font-extrabold leading-[1.15]">Share this on Twitter</p>
              <Modal.Close asChild>
                <button className="w-8 text-white/50">
                  <CloseIcon />
                </button>
              </Modal.Close>
            </div>
            <div className="mt-9 overflow-hidden rounded-lg shadow-dark-panel">
              <div className="h-[268px] bg-dark"></div>
              <div className="space-y-1 p-4">
                <p className="text-[16px] font-medium leading-[1.47]">
                  I just claimed a Rare Alliance Sigil on Myria
                </p>
                <p className="text-[16px] leading-[1.47] text-light">
                  I am now a $MYRIA node owner! Join us to earn rewards, govern and build the future
                  of virtual worlds! @MyriaGames
                </p>
                <div className="flex items-center space-x-1 text-light">
                  <span className="w-4">
                    <LinkIcon />
                  </span>
                  <p className="text-[16px] leading-[1.47]">myria.com</p>
                </div>
              </div>
            </div>
            <button className="btn-lg btn-primary mt-4">Share now</button>
          </div>
        </Modal.Content>
      </Modal>
      <button>Share now</button>
    </>
  );
};

export default ShareTwitterModal;
