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
import { setAccount, setStarkPublicKey } from 'src/packages/l2-wallet/src/app/slices/accountSlice';
import { getAccounts } from 'src/services/myriaCoreSdk';

const ConnectL2WalletButton: React.FC = () => {
  const { event } = useGA4();
  const { address, onConnectCompaign, disconnect, setAddress, subscribeProvider } =
    useWalletContext();
  const showClaimPopover = useSelector((state: RootState) => state.ui.showClaimPopover);
  const { user, loginByWalletMutation, userProfileQuery, logout } = useAuthenticationContext();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [showMismatchedWalletModal, setShowMismatchedWalletModal] = React.useState(false);

  const dispatch = useDispatch();

  const onConnectWallet = () => {
    event('Connect Wallet Selected', { campaign: 'B2C Marketplace' });
    onConnectCompaign('B2C Marketplace');
  };

  useEffect(() => {
    dispatch(setAccount(walletAddress));
    dispatch(setStarkPublicKey(localStarkKey));
    subscribeProvider();
    
    getAccounts()
      .then((accounts) => {
        if (user?.wallet_id 
          && accounts[0]?.toLowerCase() === user?.wallet_id?.toLowerCase() 
          && (!address || address.toLowerCase() != user?.wallet_id.toLowerCase())) {
          setAddress(accounts[0]?.toLowerCase());
          setWalletAddress(accounts[0]?.toLowerCase());
        }
      })
      .catch();
  }, [walletAddress, localStarkKey, user?.wallet_id, address]);

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

  const showConnectedWallet = () => {
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
      {walletAddress && showConnectedWallet() ? (
        <div>
          <Popover modal defaultOpen={openDropdown} onOpenChange={(open) => setOpenDropdown(open)}>
            <Popover.Trigger asChild>
              <span className="uppercase">
                <button className=" body-14-bold border-base/5 bg-base/3 flex items-center space-x-4 rounded-lg border px-2 py-[9px]">
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
              className="text-base/3 w-[406px] h-[565px] rounded-xl bg-current p-6 max-h-[80vh] overflow-auto">
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
          <button
            onClick={onConnectWallet}
            className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4">
            <Trans>Connect Wallet</Trans>
          </button>
        </MetamaskOnboarding>
      )}
      <MainL2Wallet />
    </>
  );
};

export default ConnectL2WalletButton;
