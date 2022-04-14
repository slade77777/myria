import React from 'react';
import Image from 'next/image';
import CloseIcon from 'src/components/icons/CloseIcon';
import InfoIcon from 'src/components/icons/InfoIcon';
import Modal from 'src/components/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onJoin: () => void;
  sigilName?: string;
  sigilImage?: string;
};

const AllianceModal: React.FC<Props> = ({ open, onClose, onJoin, sigilImage, sigilName }) => {
  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      overlayClassName="bg-[rgba(5,14,21,0.7)] backdrop-blur-[10px]">
      <Modal.Content includingHeader={false} className="h-[480px] max-w-[800px]">
        <div className="relative h-full overflow-hidden rounded-lg">
          <Modal.Close asChild>
            <button className="absolute top-6 right-6 w-6 text-white">
              <CloseIcon />
            </button>
          </Modal.Close>
          <div className="flex h-full flex-row bg-brand-deep-blue">
            <div className="flex w-1/2 items-center justify-center bg-[url('/images/nodes/insignia/join_popup_bg.png')]">
              <div className="flex h-full w-2/3 items-center justify-center">
                {sigilImage && (
                  <Image alt="sigil" src={sigilImage} layout="intrinsic" height={326} width={268} />
                )}
                <div
                  className='absolute h-[40%]'
                  style={{
                    boxShadow: '0 0 60px 40px rgba(255,255,255,0.9)'
                  }}
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center py-12 px-12 text-center">
              <p className="mb-2 text-[14px] font-medium leading-[1.5] text-white">
                You are joining...
              </p>
              <p className="mb-4 text-[28px] font-bold leading-[1.2]">{sigilName || ''}</p>
              <p className="text-[16px] font-normal leading-[1.5] text-light">
                Shoreditch hell of viral, blog echo park flexitarian tbh seitan cronut taxidermy
                mumblecore hot chicken.
              </p>
              <div className="mt-6 flex flex-col items-center text-[14px] leading-[1.2] text-brand-orange">
                <div className="mb-1 flex items-center space-x-[5px]">
                  <span className="w-4">
                    <InfoIcon />
                  </span>
                  <p className="font-bold">Choose Wisely!</p>
                </div>
                <p className="mx-auto max-w-[280px] font-normal">
                  This decision is permanent. Once you choose your alliance you cannot change it!
                </p>
              </div>
              <button className="btn-md btn-primary mt-10" onClick={onJoin}>
                JOIN ALLIANCE
              </button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AllianceModal;
