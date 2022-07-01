import { Trans } from '@lingui/macro';
import React from 'react';
import Modal from 'src/components/Modal';

const WalletModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Wallet not verified">
        <div className="space-y-8 p-8 pt-10">
          <p className="text-[20px] leading-[1.5] text-light">
            <Trans>
              The wallet currently connected does not match your designated reward wallet. Please
              connect the correct wallet or click below to change it.
            </Trans>
          </p>
          <button className="btn-lg btn-primary w-full">CHANGE WALLET</button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default WalletModal;
