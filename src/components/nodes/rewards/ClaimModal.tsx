import { Trans } from '@lingui/macro';
import Image from 'next/image';
import React from 'react';
import ETH from 'src/components/icons/ETHIcon';
import Modal from 'src/components/Modal';

const ClaimModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const qty = 3;
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Claim your rewards">
        <div>
          <div className="px-8 pt-[62px] pb-[67px]">
            <div className="flex items-center justify-between">
              <p className="text-[24px] leading-[1.3]">
                <Trans>NFT Rewards</Trans>
              </p>
              <p className="text-[18px] leading-[1.5] text-light">
                <Trans>Quantity: {qty}</Trans>
              </p>
            </div>
            <div className="my-4 h-[1px] w-full bg-white opacity-10" />
            <div className="flex items-center justify-between">
              <p className="text-[24px] leading-[1.3]">
                <Trans>Gas Fee</Trans>
              </p>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <ETH width={10.8} />
                  <p className="text-[24px] font-bold leading-[1.3]">0.0324</p>
                </div>
                <p className="text-[18px] leading-[1.5] text-light">~$99.63</p>
              </div>
            </div>
          </div>
          <div className="bg-dark/50 p-8">
            <div className="flex items-center justify-between">
              <p className="text-[24px] leading-[1.3]">
                <Trans>Total</Trans>
              </p>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <ETH width={14.4} />
                  <p className="text-[32px] font-bold leading-[1.25]">0.0324</p>
                </div>
                <p className="text-[18px] leading-[1.5] text-light">~$99.63</p>
              </div>
            </div>
            <div className="mt-1 flex items-end justify-between">
              <div className="space-y-2">
                <p className="text-[18px] leading-[1.5] text-light">
                  <Trans>From wallet</Trans>
                </p>
                <div className="flex items-center space-x-2 rounded-xl bg-brand-deep-blue px-6 py-3 shadow-dark-panel">
                  <Image src="/images/nodes/dashboard/reward.png" width={24} height={24} alt="" />
                  <p className="text-[16px] leading-[1.5] text-brand-light-blue">0xc2...0956</p>
                </div>
              </div>
              <button className="btn-lg btn-primary w-[260px]">
                <Trans>COLLECT NOW</Trans>
              </button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ClaimModal;
