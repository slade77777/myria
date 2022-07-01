import Link from 'next/link';
import { Trans } from '@lingui/macro';
import React from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import ShareIcon from 'src/components/icons/ShareIcon';
import Modal from 'src/components/Modal';
import { Reward } from 'src/types/sigil';

type Props = {
  open: boolean;
  onClose: () => void;
  item: Reward | null;
};

const ClaimModal: React.FC<Props> = ({ open, onClose, item }) => {
  return (
    <>
      <Modal open={open} onOpenChange={onClose}>
        <Modal.Content className="w-[324px] bg-transparent" includingHeader={false}>
          <div className="rounded-lg bg-[url('/images/nodes/sigil/claim-modal-bg.png')] bg-cover bg-right-bottom p-4 pb-6">
            <div className="flex justify-end">
              <Modal.Close asChild>
                <button className="w-6 text-white/50">
                  <CloseIcon />
                </button>
              </Modal.Close>
            </div>
            <div className="flex justify-center">
              <img src={item?.image_url} alt="" />
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-[12px] font-medium leading-[1.5]">
                <Trans>You have just claimed</Trans>
              </p>
              <p className="mt-4 text-[20px] font-medium leading-[1.2] text-flat">
                x1 {item?.title}
              </p>
              <Link href="/inventory">
                <a className="btn-lg btn-primary mt-8 min-w-[171px]">
                  <Trans>VIEW ITEM</Trans>
                </a>
              </Link>
              {/* <button className="mt-6 flex items-center space-x-2 text-brand-gold">
                <span className="w-4">
                  <ShareIcon />
                </span>
                <span className="text-[14px] font-medium leading-[1.5]">Share</span>
              </button> */}
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ClaimModal;
