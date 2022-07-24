import { Trans } from '@lingui/macro';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { ConnectIcon } from 'src/packages/l2-wallet/src/components/Icons';
import ClaimWithdrawPopover from 'src/packages/l2-wallet/src/components/Popover/ClaimWithdrawPopover';
import L2WalletPopover from 'src/packages/l2-wallet/src/components/Popover/L2WalletPopover';
import ChevronDownIcon from './icons/ChevronDownIcon';
import Popover from './Popover';
import MetamaskOnboarding from './InstallMetamaskButton';
import { useAuthenticationContext } from '../context/authentication';
import { useEffect } from 'react';

const ConnectL2WalletButton: React.FC = () => {
  const { address, onConnect } = useWalletContext();
  const showClaimPopover = useSelector((state: RootState) => state.ui.showClaimPopover);
  const { user, loginByWalletMutation, userProfileQuery } = useAuthenticationContext();

  useEffect(() => {
    if (userProfileQuery.isFetching) {
      return;
    }
    if (
      address &&
      !user?.user_id &&
      !loginByWalletMutation.isLoading &&
      !loginByWalletMutation.isError &&
      userProfileQuery.isFetched &&
      !userProfileQuery.data
    ) {
      loginByWalletMutation.mutate();
    }
  }, [address, user, loginByWalletMutation, userProfileQuery]);

  let abbreviationAddress = '';
  if (address) {
    abbreviationAddress = `${address.substring(0, 4)}...${address.substring(
      address.length - 4,
      address.length
    )}`;
  }

  const [openDropdown, setOpenDropdown] = React.useState(showClaimPopover);

  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  return address ? (
    <div>
      <Popover modal defaultOpen={openDropdown} onOpenChange={(open) => setOpenDropdown(open)}>
        <Popover.Trigger asChild>
          <span className="uppercase">
            <button className=" body-14-bold border-base/5 bg-base/3 flex items-center space-x-2 rounded-lg border px-4 py-[9px]">
              <span>{truncateString(address)}</span>
              <i className="w-4">
                <ChevronDownIcon />
              </i>
            </button>
          </span>
        </Popover.Trigger>
        <Popover.Content
          sideOffset={8}
          align="end"
          style={{
            boxShadow: '0 0 0 1px #202230, 0px 0px 40px 10px rgba(0, 0, 0, 0.5)'
          }}
          className="text-base/3 min-w-[406px] rounded-xl bg-current p-3">
          <Popover.Arrow
            width={24}
            height={13}
            style={{
              filter: `drop-shadow(0px 1px 0px #202230)`
            }}
            className="translate-x-8 fill-current"
          />
          <div>
            {showClaimPopover ? (
              <ClaimWithdrawPopover
                abbreviationAddress={abbreviationAddress}
                onClosePopover={handleCloseDropdown}
              />
            ) : (
              <L2WalletPopover
                onClosePopover={handleCloseDropdown}
                abbreviationAddress={abbreviationAddress}
              />
            )}
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ) : (
    <MetamaskOnboarding>
      <button
        onClick={() => {
          onConnect();
        }}
        className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4 uppercase">
        <Trans>Connect wallet</Trans>
      </button>
    </MetamaskOnboarding>
  );
};

export default ConnectL2WalletButton;
