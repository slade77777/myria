import { Trans } from '@lingui/macro';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
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
import WalletIcon from './icons/WalletIcon';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { getAccounts } from 'src/services/myriaCoreSdk';
import useInstalledWallet from 'src/hooks/useInstalledWallet';
import UserAvatar from './Header/UserAvatar';
import { useL2WalletContext } from 'src/context/l2-wallet';

const ConnectL2WalletButton: React.FC = () => {
  const { event } = useGA4();
  const { installedWallet } = useInstalledWallet();
  const { address, onConnectCompaign, disconnect, setAddress, subscribeProvider } =
    useWalletContext();

  const { connectL2Wallet, disconnectL2Wallet, handleSetFirstPurchase } = useL2WalletContext();
  const showClaimPopover = useSelector((state: RootState) => state.ui.showClaimPopover);
  const { user, loginByWalletMutation, userProfileQuery, logout } = useAuthenticationContext();

  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [showMismatchedWalletModal, setShowMismatchedWalletModal] = React.useState(false);

  const onConnectWallet = () => {
    event('Connect Wallet Selected', { campaign: 'B2C Marketplace' });
    onConnectCompaign('B2C Marketplace');
    handleSetFirstPurchase(false);
    connectL2Wallet();
    if (loginByWalletMutation.isError) {
      loginByWalletMutation.mutate();
    }
  };

  useEffect(() => {
    if (installedWallet === true) {
      subscribeProvider();
    }
    getAccounts()
      .then((accounts) => {
        if (
          user?.wallet_id &&
          localStarkKey &&
          accounts[0]?.toLowerCase() === user?.wallet_id?.toLowerCase() &&
          address?.toLowerCase() != user?.wallet_id.toLowerCase()
        ) {
          setAddress(accounts[0]?.toLowerCase());
        }
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, [walletAddress, localStarkKey, user?.wallet_id, address, installedWallet]);

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

  const showConnectedWallet = React.useMemo(() => {
    // First time registration
    if (walletAddress && address && (!user || !user?.wallet_id)) {
      return true;
    }

    // Normal non-first time user
    if (
      address &&
      user &&
      address?.toLowerCase() === user?.wallet_id?.toLowerCase() &&
      localStarkKey
    ) {
      return true;
    }
    return false;
  }, [address, localStarkKey, user, walletAddress]);

  return (
    <>
      <Modal
        open={showMismatchedWalletModal}
        onOpenChange={() => {
          setShowMismatchedWalletModal(false);
          disconnect();
          disconnectL2Wallet();
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
                disconnectL2Wallet();
                logout();
                setShowMismatchedWalletModal(false);
              }}
              className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4 uppercase">
              <Trans>Disconnect and Sign Out</Trans>
            </button>
          </p>
        </Modal.Content>
      </Modal>
      <div className="flex items-center">
        {!loginByWalletMutation.isError && walletAddress && showConnectedWallet ? (
          <div>
            <Popover
              modal
              defaultOpen={openDropdown}
              onOpenChange={(open) => setOpenDropdown(open)}>
              <Popover.Trigger asChild>
                <span className="uppercase">
                  <button
                    className=" body-14-bold border-base/5 bg-base/3 flex items-center space-x-4 rounded-lg border px-2 py-[9px]"
                    id="trigger-popover-main-screen">
                    <WalletIcon width={24} height={24} />
                    <span>{truncateString(walletAddress)}</span>
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
                className="text-base/3 h-[565px] max-h-[80vh] w-[406px] overflow-auto rounded-xl bg-current p-6">
                <Popover.Arrow
                  width={24}
                  height={13}
                  style={{
                    filter: `drop-shadow(0px 1px 0px #202230)`
                  }}
                  className="translate-x-8 fill-current"
                />
                <div className="h-full">
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
            {!userProfileQuery.isFetched ? (
              <button className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4">
                <Trans>Loading...</Trans>
              </button>
            ) : (
              <button
                onClick={onConnectWallet}
                className="border-base/5 font-medium  bg-base/1 flex items-center space-x-4 rounded-lg border px-[10px] pr-[18px] py-[11px]">
                <WalletIcon width={24} height={24} />
                <span className="text-base/10">
                  <Trans>Connect Wallet</Trans>
                </span>
              </button>
            )}
          </MetamaskOnboarding>
        )}
        <UserAvatar
          items={{
            loginByWalletMutation,
            walletAddress,
            showConnectedWallet,
            localStarkKey
          }}
        />
      </div>
      <MainL2Wallet />
    </>
  );
};

export default ConnectL2WalletButton;
