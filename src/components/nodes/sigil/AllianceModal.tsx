import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import InfoIcon from 'src/components/icons/InfoIcon';
import Modal from 'src/components/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onJoin: () => void;
};

const AllianceModal: React.FC<Props> = ({ open, onClose, onJoin }) => {
  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      overlayClassName="bg-[rgba(5,14,21,0.7)] backdrop-blur-[10px]">
      <Modal.Content includingHeader={false} className="!max-w-[380px] bg-transparent">
        <div className="relative rounded-lg bg-[url('/images/nodes/sigil/alliance-modal-bg.png')] bg-cover bg-top p-8 px-[38px]">
          <Modal.Close asChild>
            <button className="absolute top-6 right-6 w-6 text-[#09131A]">
              <CloseIcon />
            </button>
          </Modal.Close>
          <img
            src="/images/nodes/sigil/alliance-modal-item.png"
            style={{
              filter: 'drop-shadow(0px 0px 40px #E2D0E2)'
            }}
            className="absolute top-[-16px] left-1/2 w-[171px] -translate-x-1/2"
            alt=""
          />
          <div className="mt-[260px] flex flex-col items-center text-center">
            <p className="text-[14px] font-medium leading-[1.5] text-purple">Join</p>
            <p className="text-[28px] font-bold leading-[1.2]">Alliance Name</p>
            <p className="mt-4 text-[16px] leading-[1.5] text-light">
              Shoreditch hell of viral, blog echo park flexitarian tbh seitan cronut taxidermy
              mumblecore hot chicken.
            </p>
            <button className="btn-lg btn-white mt-10" onClick={onJoin}>
              JOIN ALLIANCE
            </button>
            <div className="mt-6 flex flex-col items-center text-[12px] leading-[1.2] text-brand-light-blue">
              <div className="flex items-center space-x-[5px]">
                <span className="w-4">
                  <InfoIcon />
                </span>
                <p className="font-bold">Choose Wisely!</p>
              </div>
              <p className="mx-auto mt-4 max-w-[239px]">
                This decision is permanent. Once you choose your alliance you cannot change it!
              </p>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AllianceModal;
