import { Trans } from '@lingui/macro';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { WalletTabs } from 'src/types';

export default function MessagePurchaseModal({ assetName = '', onClose = () => {} }) {
  const { handleActiveWalletTabs, handleDisplayPopover } = useL2WalletContext();
  return (
    <div className="flex">
      <div className="ml-3 font-normal leading-normal text-white">
        <div className="relative mb-1 text-lg font-semibold leading-normal dark:text-white">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
          </span>
          <span>
            <Trans>Purchase Successful</Trans>
          </span>
        </div>
        <div className="mt-[10px] mb-[20px] text-sm font-normal">
          <span className="text-base/9">
            <Trans>Your purchase of</Trans>
            <span className="mx-1 text-[16px] text-white"> {assetName} </span>
            <Trans>successful.</Trans>
          </span>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            handleDisplayPopover(true);
            handleActiveWalletTabs(WalletTabs.HISTORY);
            onClose();
          }}>
          <span className="text-primary/6">
            <Trans>View Transaction History</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
