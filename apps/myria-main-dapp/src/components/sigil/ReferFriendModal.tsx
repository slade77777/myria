import React, { useEffect } from 'react';
import { t, Trans } from '@lingui/macro';
import CloseIcon from 'src/components/icons/CloseIcon';
import Modal from 'src/components/Modal';
import { useGA4 } from 'src/lib/ga';
import copy from 'clipboard-copy';
import { useAuthenticationContext } from 'src/context/authentication';

type Props = {
  open: boolean;
  onClose: () => void;
  link: string;
};

const ReferFriendModal: React.FC<Props> = ({ open, onClose, link }) => {
  const { event } = useGA4();
  const [copied, setCopied] = React.useState(false);
  const { user } = useAuthenticationContext();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 700);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content className="w-[324px] bg-transparent" includingHeader={false}>
        <div className="rounded-lg bg-[url('/images/nodes/sigil/refer-friend-modal-bg.png')] bg-cover bg-right-bottom p-4">
          <div className="flex justify-end">
            <Modal.Close asChild>
              <button className="w-6 text-white/50">
                <CloseIcon />
              </button>
            </Modal.Close>
          </div>
          <div className="mt-6 px-2 pb-5 text-center">
            <p className="text-[20px] font-medium leading-[1.2]">
              <Trans>Refer your friends</Trans>
            </p>
            <p className="mt-6 text-[16px] leading-[1.5] text-light">
              <Trans>Invite your friends to Myria by sharing the following link with them.</Trans>
            </p>
            <div className="mt-10 rounded-lg bg-[#132533] py-[14px] pl-[16px] pr-[25px] text-[16px] leading-[1.25] text-light">
              {link}
            </div>
            <button
              className="mt-7 text-[12px] font-bold leading-[1.25] text-brand-gold"
              onClick={async () => {
                event('Invite Link Copied', {
                  campaign: 'Sigil',
                  myria_username: user?.user_name || '',
                  user_email: user?.email || '',
                  wallet_address: user?.wallet_id || ''
                });
                await copy(link);
                setCopied(true);
              }}>
              {copied ? t`COPIED` : t`COPY LINK`}
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ReferFriendModal;
