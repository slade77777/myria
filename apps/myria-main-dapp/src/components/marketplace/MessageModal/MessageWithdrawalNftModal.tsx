import { Trans } from '@lingui/macro';
import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { StatusWithdrawNFT } from 'src/types/marketplace';
interface Prop {
  onClose: () => void;
}
const MessageWithdrawalNftModal: FC<Prop> = ({ onClose }) => {
  const { valueNFT: assetDetail, setStatus } = useWithDrawNFTContext();
  const { handleDisplayPopoverWithdrawNFT } = useL2WalletContext();
  const completeWithdrawal = useCallback(() => {
    handleDisplayPopoverWithdrawNFT(true);
    setStatus(StatusWithdrawNFT.COMPLETED);
    onClose();
  }, [onClose, setStatus]);
  return (
    <div className="ml-3  font-normal leading-normal text-white">
      <div className="relative mb-1 text-lg font-semibold leading-normal dark:text-white">
        <span className="absolute -left-[45px]">
          <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
        </span>
        <span>
          <Trans>Your withdrawal is ready</Trans>
        </span>
      </div>
      <div className="text-base/9 mt-[10px] mb-[20px] text-[14px] font-normal">
        <span className="">
          <Trans>Your withdrawal of</Trans>
        </span>
        <span className="mx-1 font-medium text-white">{assetDetail?.name}</span>
        <span>
          <Trans>is now ready to claim.</Trans>
        </span>
      </div>
      <div className="cursor-pointer" onClick={completeWithdrawal}>
        <span className="text-primary/6">
          <Trans>Complete withdrawal</Trans>
        </span>
      </div>
    </div>
  );
};
export default MessageWithdrawalNftModal;
