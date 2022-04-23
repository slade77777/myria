import { Trans } from '@lingui/macro';
import Image from 'next/image';
import React, { useEffect } from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import InfoIcon from 'src/components/icons/InfoIcon';
import Modal from 'src/components/Modal';
import { useGA4 } from 'src/lib/ga';
import {
  InventoryItemCreditType,
  InventoryItemType,
  OpenInventoryType
} from 'src/services/api/inventory';

type Props = {
  open: boolean;
  onClose: () => void;
  openedChest?: OpenInventoryType;
};

const OpenInventoryChestModal: React.FC<Props> = ({ open, onClose, openedChest }) => {
  const { event } = useGA4();

  const credit = React.useMemo<InventoryItemCreditType | undefined>(() => {
    return openedChest?.items.find((item) => item.type === 'CREDITS') as
      | InventoryItemCreditType
      | undefined;
  }, [openedChest]);

  const sigil = React.useMemo<InventoryItemType | undefined>(() => {
    return openedChest?.items.find((item) => item.type === 'SIGIL') as
      | InventoryItemType
      | undefined;
  }, [openedChest]);

  const title = React.useMemo<InventoryItemType | undefined>(() => {
    return openedChest?.items.find((item) => item.type === 'TITLE') as
      | InventoryItemType
      | undefined;
  }, [openedChest]);

  useEffect(() => {
    // TODO mock event
    event('Chest Claimed', { campaign: 'Sigil', wallet_address: '_mock', item_list: '_mock', credit_amount: -111 });
  }, [event])

  if (!openedChest) {
    return null;
  }

  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      overlayClassName="bg-[rgba(5,14,21,0.7)] backdrop-blur-[10px]">
      <Modal.Content includingHeader={false} className="h-[592px] max-w-[800px]">
        <div className="relative h-full overflow-hidden rounded-lg">
          <Modal.Close asChild>
            <button className="absolute top-6 right-6 w-6 text-white">
              <CloseIcon />
            </button>
          </Modal.Close>
          <div
            className={`flex h-full flex-row justify-end bg-brand-deep-blue bg-[url('/images/inventory/open_chest_modal_bg.png')] bg-cover`}>
            <div className="flex w-1/2 flex-col items-center justify-between py-12 px-12">
              <span className="mb-2 text-[14px] font-medium">
                <Trans>You have opened</Trans>
              </span>
              <span className="mb-[36px] text-[28px] font-bold text-[#A9CB68]">
                {openedChest.name}
              </span>

              {sigil && (
                <div
                  className="flex h-[77px] w-[316px] items-center justify-center rounded-lg"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(169, 203, 104, 0.2) 5.86%, rgba(169, 203, 104, 0) 51.87%)',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
                  }}>
                  <Image src={sigil.image} width={40} height={45} layout="intrinsic" alt="sigil" />
                  <span className="ml-4 text-[16px] font-medium text-[#A9CB68]">{sigil.name}</span>
                </div>
              )}

              {title && (
                <div
                  className="flex h-[77px] w-[316px] items-center justify-center rounded-lg"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(169, 203, 104, 0.2) 5.86%, rgba(169, 203, 104, 0) 51.87%)',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
                  }}>
                  <Image
                    src={title.image}
                    width={40}
                    height={45}
                    layout="intrinsic"
                    alt="sigil"
                  />
                  <span className="ml-4 text-[16px] font-medium text-[#A9CB68]">
                    {title.name}
                  </span>
                </div>
              )}

              {credit && (
                <div
                  className="flex h-[77px] w-[316px] items-center justify-center rounded-lg"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(79, 166, 185, 0.2) 5.86%, rgba(79, 166, 185, 0) 51.87%)',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
                  }}>
                  <Image
                    src="/images/inventory/coin.png"
                    width={40}
                    height={40}
                    layout="intrinsic"
                    alt="sigil"
                  />
                  <span className="ml-4 text-[16px] font-medium text-[#4FA6B9]">
                    {credit.amount} Sigil Event Credits
                  </span>
                </div>
              )}

              <button className="btn-md btn-primary mt-[48px] uppercase">VIEWS ITEMS</button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default OpenInventoryChestModal;
