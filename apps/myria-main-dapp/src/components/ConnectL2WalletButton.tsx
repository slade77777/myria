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
import { useCallback, useEffect, useRef } from 'react';
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
import WthdrawNFTPopover from './marketplace/Withdraw-NFT/WthdrawNFTPopover';
import WithdrawNFTScreen from './marketplace/Withdraw-NFT/WithdrawNFTScreen';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { noCacheApiClient } from '../client';

interface Props {
  isAirDrop?: boolean;
}

const ConnectL2WalletButton: React.FC<Props> = ({ isAirDrop = false }) => {
  const { event } = useGA4();
  const { installedWallet } = useInstalledWallet();
  const { address, onConnectCompaign, disconnect, setAddress, subscribeProvider } =
    useWalletContext();

  const {
    connectL2Wallet,
    disconnectL2Wallet,
    handleSetFirstPurchase,
    isDisplayPopover,
    handleDisplayPopover
  } = useL2WalletContext();
  const showClaimPopover = useSelector((state: RootState) => state.ui.showClaimPopover);
  const {
    user,
    userCampaign,
    loginByWalletMutation,
    userProfileQuery,
    loginCampaignByWalletMutation,
    logout
  } = useAuthenticationContext();

  const { isShowLearnMore } = useWithDrawNFTContext();

  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [userCampaignId, setUserCampaignId] = useLocalStorage(localStorageKeys.userCampaignId, '');
  const [showMismatchedWalletModal, setShowMismatchedWalletModal] = React.useState(false);
  const [requestedEmail, setRequestedEmail] = React.useState(false);
  const mainL2Ref = useRef(null);

  const onConnectWallet = async () => {
    if (
      (!isAirDrop &&
        address &&
        user?.wallet_id &&
        address.toLowerCase() !== user.wallet_id.toLowerCase()) ||
      (!address && user?.wallet_id) ||
      (isAirDrop &&
        address &&
        userCampaign?.user.walletAddress &&
        address.toLowerCase() !== userCampaign.user.walletAddress.toLowerCase())
    ) {
      setShowMismatchedWalletModal(true);
      return;
    }
    event('Connect Wallet Selected', { campaign: 'B2C Marketplace' });
    await onConnectCompaign('B2C Marketplace');
    handleSetFirstPurchase(false);
    connectL2Wallet();
    if (isAirDrop) {
      loginCampaignByWalletMutation.mutate();
    } else {
      loginByWalletMutation.mutate();
    }
  };

  useEffect(() => {
    const controller = new AbortController();
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
    return () => {
      controller.abort();
    };
  }, [walletAddress, localStarkKey, user?.wallet_id, address, installedWallet]);

  useEffect(() => {
    if (isAirDrop) {
      //Handle case logout normal
      if (!walletAddress && !userCampaignId && !localStarkKey) return;
      if (
        (address &&
          userCampaign?.user.walletAddress &&
          address.toLowerCase() !== userCampaign?.user.walletAddress.toLowerCase()) ||
        (address && address.toLowerCase() !== walletAddress.toLowerCase()) ||
        (address && userCampaign && userCampaign.userId.toString() !== userCampaignId) ||
        (address &&
          userCampaign &&
          userCampaign.user.starkKey?.toLowerCase() !== ('0x' + localStarkKey).toLowerCase())
      )
        setShowMismatchedWalletModal(true);
    } else if (
      address &&
      user?.wallet_id &&
      address.toLowerCase() !== user.wallet_id.toLowerCase()
    ) {
      setShowMismatchedWalletModal(true);
    }
  }, [address, user, userCampaign, localStarkKey, walletAddress, userCampaignId]);

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
    if (walletAddress && address && (!user || !user?.wallet_id) && !isAirDrop) {
      return true;
    }
    if (
      walletAddress &&
      address &&
      (!userCampaign || !userCampaign?.user.walletAddress) &&
      isAirDrop
    ) {
      return true;
    }

    // Normal non-first time user
    if (
      address &&
      user &&
      address?.toLowerCase() === user?.wallet_id?.toLowerCase() &&
      localStarkKey &&
      !isAirDrop
    ) {
      return true;
    }

    if (
      address &&
      address?.toLowerCase() === userCampaign?.user.walletAddress?.toLowerCase() &&
      localStarkKey &&
      isAirDrop
    ) {
      return true;
    }
    return false;
  }, [address, localStarkKey, user, walletAddress, userCampaign?.user.walletAddress]);

  useEffect(() => {
    if (isAirDrop) return;
    const emailRequestNumber = localStorage.getItem('emailRequestNumber');
    const emailRequestTime = emailRequestNumber ? parseInt(emailRequestNumber) : 0;
    noCacheApiClient.get('accounts/users').then((data) => {
      const userData = data?.data?.data;
      if (
        loginByWalletMutation.isSuccess &&
        userData &&
        !userData.normalized_email &&
        localStarkKey &&
        !requestedEmail &&
        emailRequestTime < 10
      ) {
        // @ts-ignore
        mainL2Ref.current?.openRequestEmailModal();
        setRequestedEmail(true);
        localStorage.setItem('emailRequestNumber', (emailRequestTime + 1).toString());
      }
    });
  }, [loginByWalletMutation?.isSuccess, user, requestedEmail, localStarkKey]);

  return (
    <>
      <Modal
        open={showMismatchedWalletModal}
        onOpenChange={() => {
          disconnect();
          disconnectL2Wallet();
          isAirDrop && logout();
          setUserCampaignId('');
          setShowMismatchedWalletModal(false);
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
                setUserCampaignId('');
                setShowMismatchedWalletModal(false);
              }}
              className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4 uppercase">
              <Trans>Disconnect and Sign Out</Trans>
            </button>
          </p>
        </Modal.Content>
      </Modal>
      <div className="flex items-center">
        <div>
          {(!loginByWalletMutation?.isError &&
            walletAddress &&
            showConnectedWallet &&
            !isAirDrop) ||
          (!loginCampaignByWalletMutation?.isError &&
            walletAddress &&
            showConnectedWallet &&
            isAirDrop) ? (
            <div>
              <Popover
                modal
                open={isDisplayPopover}
                defaultOpen={openDropdown}
                onOpenChange={(open) => {
                  if (!open && !isShowLearnMore) {
                    handleDisplayPopover(false);
                  }
                  setOpenDropdown(open);
                }}>
                <Popover.Trigger asChild>
                  <span className="uppercase">
                    <button
                      className="body-14-bold border-base/4 bg-base/1 flex items-center space-x-4 rounded-lg border py-3 pr-[18px] pl-[10px] text-sm font-medium"
                      onClick={() => handleDisplayPopover(true)}>
                      <WalletIcon width={24} height={24} />
                      <span>{truncateString(walletAddress)}</span>
                      <i className="w-4">
                        <ChevronDownIcon size={24} />
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
                  className="text-base/3 wallet-popover h-[565px] max-h-[80vh] w-[406px] overflow-auto rounded-xl bg-current p-6">
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
              {!userProfileQuery?.isFetched ? (
                <button className="body-14-bold hover:border-primary/7 rounded-lg border border-white py-[9px] px-4">
                  <Trans>Loading...</Trans>
                </button>
              ) : (
                <button
                  className="body-14-bold border-base/4 bg-base/1 flex items-center space-x-4 rounded-lg border py-3 pr-[18px] pl-[10px] text-sm font-medium"
                  onClick={() => onConnectWallet()}>
                  <WalletIcon width={24} height={24} />
                  <span className="text-base/10 text-sm">
                    <Trans>Connect Wallet</Trans>
                  </span>
                </button>
              )}
            </MetamaskOnboarding>
          )}
          <WthdrawNFTPopover>
            <WithdrawNFTScreen />
          </WthdrawNFTPopover>
        </div>
        {!loginByWalletMutation?.isError && walletAddress && showConnectedWallet && !isAirDrop && (
          <UserAvatar
            items={{
              loginByWalletMutation,
              walletAddress,
              showConnectedWallet,
              localStarkKey
            }}
          />
        )}
      </div>
      {!isAirDrop && <MainL2Wallet ref={mainL2Ref} />}
    </>
  );
};

export default ConnectL2WalletButton;
