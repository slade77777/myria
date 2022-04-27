import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import Modal from 'src/components/Modal';
import { useGA4 } from 'src/lib/ga';

type Props = {
  open: boolean;
  onClose: () => void;
  link: string;
};

const ReferFriendModal: React.FC<Props> = ({ open, onClose, link }) => {
  const { event } = useGA4();
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
            <p className="text-[20px] font-medium leading-[1.2]">Refer your friends</p>
            <p className="mt-6 text-[16px] leading-[1.5] text-light">
              I&apos;m baby whatever small batch chicharrones kale chips unicorn everyday carry.
            </p>
            <div className="mt-10 rounded-lg bg-[#132533] py-[14px] pl-[16px] pr-[25px] text-[16px] leading-[1.25] text-light">
              {link}
            </div>
            <button className="mt-7 text-[12px] font-bold leading-[1.25] text-brand-gold" onClick={() => {
              // TODO mock event
              event('Invite Link Copied', { campaign: 'Sigil', myria_username: '_mock', user_email: '_mock', wallet_address: '_mock' })
            }}>
              COPY LINK
            </button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ReferFriendModal;
