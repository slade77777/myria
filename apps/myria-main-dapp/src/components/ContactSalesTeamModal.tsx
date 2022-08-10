import { Trans } from '@lingui/macro';
import Image from 'next/image';
import React from 'react';
import { socialLinks } from 'src/configs';
import { useGA4 } from 'src/lib/ga';
import BuildYourBlockchain from './for-developers/BuildYourBlockchain';
import CloseIcon from './icons/CloseIcon';
import DiscordIcon from './icons/DiscordIcon';
import TwitterIcon from './icons/TwitterIcon';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ContactSalesTeamModal: React.FC<Props> = ({ open, onClose }) => {
  const { event } = useGA4();
  return (
    <Modal open={open}>
      <Modal.Content includingHeader={false}>
        <div className="relative isolate p-6 text-white md:px-[31px] md:pt-6 md:pb-[38px]">
          <button
            onClick={onClose}
            className="absolute top-5 right-6 w-[32px] text-white/50 focus:outline-none md:top-6"
          >
            <CloseIcon />
          </button>
          <h1 className="font-bold leading-[1.15] md:text-[24px]">
            <Trans>Contact Our Sales Team</Trans>
          </h1>
          <BuildYourBlockchain />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ContactSalesTeamModal;
