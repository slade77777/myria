import { Trans } from '@lingui/macro';
import React from 'react';
import Modal from 'src/components/Modal';
import { useWalletContext } from 'src/context/wallet';

type Props = {
  open: boolean;
  onClose: () => void;
  onLink: () => void;
};

const LinkWalletConfirmModal: React.FC<Props> = ({ open, onClose, onLink }) => {
  const { address, onConnectCompaign } = useWalletContext();

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Link Wallet Confirmation">
        <div className="space-y-8 p-8 pt-10">
          <p className="text-light text-[20px] leading-[1.5]">
            {address ? (
              <Trans>
                Do you want to link your wallet {address.substring(0, 5)} to your Myria account?
              </Trans>
            ) : (
              <Trans>
                No web wallet is detected, please ensure that you have one setup to claim your
                rewards.
              </Trans>
            )}
          </p>
          {address ? (
            <button onClick={onLink} className="btn-lg btn-primary w-full">
              <Trans>LINK WALLET</Trans>
            </button>
          ) : (
            <button
              onClick={() => onConnectCompaign('Sigil').catch((e) => console.error(e))}
              className="btn-lg btn-primary w-full">
              <Trans>CONNECT WALLET</Trans>
            </button>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default LinkWalletConfirmModal;
