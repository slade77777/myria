import { Trans } from '@lingui/macro';
import { toast } from 'react-toastify';
import CheckIcon from 'src/components/icons/CheckIcon';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { WalletTabs } from 'src/types';

export function MessageEditListingModal({ assetName = '', onClose = ()=>{} }) {
  const { handleActiveWalletTabs } = useL2WalletContext();
  return (
    <div className="flex">
      <div className="ml-3 font-normal text-white leading-normal">
        <div className="relative mb-1 font-semibold dark:text-white text-lg leading-normal">
          <span className="absolute -left-[45px]">
            <CheckIcon size={24} className="mt-[1px] text-[#2EA64F]" />
          </span>
          <span>
            <Trans>Item Listed Successfully</Trans>
          </span>
        </div>
        <div className="text-sm font-normal mt-[10px] mb-[20px]">
          <span className="text-base/9">
            <Trans>Your</Trans>
            <span className="text-base text-white mx-1 cursor-pointer"> {assetName} </span>
            <Trans>has been listed for sale.</Trans>
          </span>
        </div>
        <div
          onClick={() => {
            const triggerMainScreen = document.getElementById(
              'trigger-popover-main-screen',
            );
            triggerMainScreen?.click();
            handleActiveWalletTabs(WalletTabs.HISTORY)
            onClose();
          }}
          className="cursor-pointer">
          <span className="text-primary/6">
            <Trans>View Transaction</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
