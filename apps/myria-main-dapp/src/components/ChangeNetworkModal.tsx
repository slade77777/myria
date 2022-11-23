import { Trans } from '@lingui/macro';
import { useRouter } from 'next/router';
import React from 'react';
import { useWalletContext } from 'src/context/wallet';
import ErrorIcon from './icons/ErrorIcon';
import Modal from './Modal';

type Props = {
  open: boolean;
  onSwitchNetwork: () => void;
};

const ChangeNetworkModal: React.FC<Props> = ({ open, onSwitchNetwork }) => {
  return (
    <Modal open={open}>
      <Modal.Content
        title={
          <div className="flex items-center space-x-4">
            <ErrorIcon size={24} />
            <span>
              <Trans>Switch Network</Trans>
            </span>
          </div>
        }
        canClose={false}
        className="text-white shadow-[0_0_40px_10px_#0000004D]">
        <p className="body-16-regular p-6 px-8">
          <Trans>
            To proceed, switch network in your wallet to{' '}
            <strong>{process.env.NEXT_PUBLIC_NETWORK_LABEL}</strong>, either manually or by clicking
            the button below.
          </Trans>
        </p>
        <p className="body-16-regular p-6 px-8">
          <button
            onClick={onSwitchNetwork}
            className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4 uppercase">
            <Trans>Switch Network</Trans>
          </button>
        </p>
      </Modal.Content>
    </Modal>
  );
};

export default ChangeNetworkModal;
