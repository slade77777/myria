import { Trans } from '@lingui/macro';
import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { StatusWithdrawNFT } from 'src/types/marketplace';
interface Prop {
  onClose: () => void;
}
const MessageWithdrawalNftModal: FC<Prop> = ({ onClose }) => {
  const { valueNFT: assetDetail, setStatus } = useWithDrawNFTContext();
  const completeWithdrawal = useCallback(() => {
    const triggerWithdraw = document.getElementById('trigger-popover-withdraw');
    triggerWithdraw?.click();
    setStatus(StatusWithdrawNFT.COMPLETED);
    onClose();
  }, [onClose, setStatus]);
  return (
    <div className="ml-3 font-normal text-white leading-normal">
      <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
        <span className="absolute -left-[45px]">
          <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
        </span>
        <span>
          <Trans>Your withdrawal is ready</Trans>
        </span>
      </div>
      <div className="text-base/9 text-[14px] font-normal mt-[10px] mb-[20px]">
        <span className="">
          <Trans>Your withdrawal of</Trans>
        </span>
        <span
          className="font-medium text-white mx-1 cursor-pointer"
          onClick={() => toast('This function is not ready yet!')}>
          {assetDetail?.name}
        </span>
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
