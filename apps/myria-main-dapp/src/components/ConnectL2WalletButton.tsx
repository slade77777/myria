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
import MainL2Wallet from './Main-L2-Wallet/Main-L2-Wallet';
import { useGA4 } from '../lib/ga';
import Modal from './Modal';
import ErrorIcon from './icons/ErrorIcon';

const ConnectL2WalletButton: React.FC = () => {
  const { event } = useGA4();
  const { address, onConnect, disconnect } = useWalletContext();
  const showClaimPopover = useSelector((state: RootState) => state.ui.showClaimPopover);
  const { user, loginByWalletMutation, userProfileQuery, logout } = useAuthenticationContext();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const [showMismatchedWalletModal, setShowMismatchedWalletModal] = React.useState(false);

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

  useEffect(() => {
    if (address && user?.wallet_id && address.toLowerCase() !== user.wallet_id.toLowerCase()) {
      setShowMismatchedWalletModal(true);
    }
  }, [address, user]);

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

  return (
    <>
      <Modal
        open={showMismatchedWalletModal}
        onOpenChange={() => {
          setShowMismatchedWalletModal(false);
          disconnect();
        }}>
        <Modal.Content
          title={
            <div className="flex items-center space-x-4">
              <ErrorIcon size={24} />
              <span>
                <Trans>Mismatch Account</Trans>
              </span>
            </div>
          }
          className="shadow-[0_0_40px_10px_#0000004D]">
          <p className="body-16-regular p-6 px-8">
            <Trans>
              The MetaMask account that is selected does not match the one used to create your Myria
              account. Please select the correct MetaMask account and try again.
            </Trans>
          </p>
          <p className="body-16-regular p-6 px-8">
            <button
              onClick={() => {
                disconnect();
                logout();
                setShowMismatchedWalletModal(false);
              }}
              className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4 uppercase">
              <Trans>Disconnect and Sign Out</Trans>
            </button>
          </p>
        </Modal.Content>
      </Modal>
      {address && starkKeyUser ? (
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
              event('Connect Wallet Selected', { campaign: 'B2C Marketplace' });
              onConnect('B2C Marketplace');
            }}
            className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4 uppercase">
            <Trans>Connect wallet</Trans>
          </button>
        </MetamaskOnboarding>
      )}
      <MainL2Wallet />
    </>
  );
};

export default ConnectL2WalletButton;
