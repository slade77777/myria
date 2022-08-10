import { Trans } from '@lingui/macro';
import React, { useEffect } from 'react';
import CloseIcon from 'src/components/icons/CloseIcon';
import Modal from 'src/components/Modal';
import { useAuthenticationContext } from 'src/context/authentication';
import { useGA4 } from 'src/lib/ga';
import { RarityType } from 'src/types/sigil';
import { getRarityColor } from 'src/utils';
import {
  AssetCreditType,
  AssetSigilType,
  AssetTitleType,
  AssetTypeType,
  OpenChestContent
} from './useInventoryQuery';

type Props = {
  open: boolean;
  onClose: () => void;
  openedChest?: OpenChestContent[];
  chestName?: string;
  chestRarity?: RarityType;
};

interface ChestItemProps {
  type: AssetTypeType;
  image?: string;
  rarity?: RarityType;
  name?: string;
  credit?: number;
}
const ChestItem = ({ type, rarity, image, name, credit }: ChestItemProps) => {
  const rarityColor = rarity && getRarityColor(rarity);
  const itemImageUrl = type === 'credits' ? '/images/inventory/coin.png' : image;
  const itemName = type === 'credits' ? `${credit} Sigil Event Points` : name;
  const bgColor = React.useMemo(() => {
    switch (rarity) {
      case 'rare':
        return 'linear-gradient(180deg, rgba(169, 203, 104, 0.2) 5.86%, rgba(169, 203, 104, 0) 51.87%)';
      case 'epic':
        return 'linear-gradient(180deg, rgba(168, 121, 180, 0.2) 5.86%, rgba(168, 121, 180, 0) 51.87%)';
      case 'ultra_rare':
        return 'linear-gradient(180deg, rgba(79, 166, 185, 0.2) 5.86%, rgba(79, 166, 185, 0) 51.87%)';
      case 'common':
        return 'linear-gradient(180deg, rgba(169, 166, 177, 0.2) 5.86%, rgba(169, 166, 177, 0) 51.87%)';
      default:
        return 'linear-gradient(180deg, rgba(169, 166, 177, 0.2) 5.86%, rgba(169, 166, 177, 0) 51.87%)';
    }
  }, [rarity]);

  return (
    <div
      className="flex h-[77px] w-[316px] items-center justify-start rounded-lg px-4"
      style={{
        background: bgColor,
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)'
      }}>
      {itemImageUrl && <img src={itemImageUrl} width={40} height={45} alt="sigil" />}
      <span className={`ml-4 text-[16px] font-medium text-[${rarityColor}]`}>{itemName}</span>
    </div>
  );
};

const OpenInventoryChestModal: React.FC<Props> = ({
  open,
  onClose,
  openedChest,
  chestName,
  chestRarity
}) => {
  const { event } = useGA4();
  const { user } = useAuthenticationContext();
  const credit = React.useMemo<AssetCreditType | undefined>(() => {
    return openedChest?.find((item) => item.type === 'credits') as AssetCreditType | undefined;
  }, [openedChest]);

  const sigil = React.useMemo<AssetSigilType | undefined>(() => {
    return openedChest?.find((item) => item.type === 'sigil') as AssetSigilType | undefined;
  }, [openedChest]);

  const title = React.useMemo<AssetTitleType | undefined>(() => {
    return openedChest?.find((item) => item.type === 'title') as AssetTitleType | undefined;
  }, [openedChest]);

  const animationVideo = React.useMemo(() => {
    if (chestRarity === 'rare') {
      return '/videos/inventory/open_chest_rare.m4v';
    }
    return '/videos/inventory/open_chest_common.m4v';
  }, [chestRarity]);

  useEffect(() => {
    if (user?.wallet_id) {
      event('Chest Claimed', {
        campaign: 'Sigil',
        wallet_address: user.wallet_id,
        item_list: [sigil?.name, title?.name].filter(Boolean).join('; '),
        credit_amount: Number(credit?.amount)
      });
    }
  }, [event, user?.wallet_id, credit?.amount, sigil?.name, title?.name]);

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
          <div className={`flex h-full flex-row justify-end bg-brand-deep-blue`}>
            <div className="w-1/2 overflow-hidden relative">
              <video
                className="absolute max-w-none -left-1/2 h-full w-[200%] object-cover"
                src={animationVideo}
                autoPlay
                loop
              />
            </div>

            <div className="flex w-1/2 flex-col items-center justify-between py-12 px-12">
              <span className="mb-2 text-[14px] font-medium">
                <Trans>You have opened</Trans>
              </span>
              <span className="mb-[36px] text-[28px] font-bold text-[#A9CB68]">{chestName}</span>

              {sigil && (
                <ChestItem
                  type={sigil.type}
                  name={sigil.name}
                  image={sigil.image_url}
                  rarity={sigil.rarity}
                />
              )}
              {title && (
                <ChestItem
                  type={title.type}
                  name={title.name}
                  image={title.image_url}
                  rarity={title.rarity}
                />
              )}
              {credit && <ChestItem type={credit.type} credit={credit.amount} />}

              <button className="btn-md btn-primary mt-[48px] uppercase" onClick={onClose}>
                <Trans>VIEW ITEMS</Trans>
              </button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default OpenInventoryChestModal;
