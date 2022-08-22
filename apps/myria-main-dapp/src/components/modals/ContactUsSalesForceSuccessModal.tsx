import { Trans } from '@lingui/macro';
import React from 'react';
import Modal from '../Modal';
import CloseIcon from '../icons/CloseIcon';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ContactUsSalesForceSuccessModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open}>
      <Modal.Content includingHeader={false}>
        <div className="relative isolate p-6 text-white md:px-[31px] md:pt-6 md:pb-[38px]">
          <button
            onClick={onClose}
            className="absolute top-5 right-6 w-[32px] text-white/50 focus:outline-none md:top-6">
            <CloseIcon />
          </button>
          <div className="space-y-8">
            <h1 className="font-bold leading-[1.15] md:text-[24px]">
              <Trans>Thanks for your message!</Trans>
            </h1>
            <div>
              <p className="text-base text-light">We will be in touch within 2 business days.</p>
            </div>
            <button
              onClick={onClose}
              className="bg-primary/6 text-base/1 w-full rounded-lg py-3 text-base font-bold uppercase leading-[23px]">
              OK
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ContactUsSalesForceSuccessModal;
