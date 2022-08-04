// Import packages
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/packages/l2-wallet/src/app/store';

// Import Redux
import {
  markWalletConnected,
  setAccount,
  setStarkPublicKey
} from 'src/packages/l2-wallet/src/app/slices/accountSlice';
import { setWithdrawClaimModal } from 'src/packages/l2-wallet/src/app/slices/uiSlice';
import TermsOfServiceModal from 'src/packages/l2-wallet/src/components/Modal/TermsOfServiceModal';
import CreateMyriaWalletModal from 'src/packages/l2-wallet/src/components/Modal/CreateMyriaWalletModal';
import FirstDepositModal from 'src/packages/l2-wallet/src/components/Modal/FirstDepositModal';
import MessageWithdrawModal from 'src/packages/l2-wallet/src/components/Modal/MessageWithdrawModal';
import WelcomeMyriaModal from 'src/packages/l2-wallet/src/components/Modal/WelcomeMyriaModal';
import { useWalletContext } from 'src/context/wallet';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { getAccounts, getModuleFactory, initialWeb3 } from 'src/services/myriaCoreSdk';
import { localStorageKeys } from 'src/configs';

const StarkwareLib = require('@starkware-industries/starkware-crypto-utils');

const { asset } = StarkwareLib;

const QUANTUM_CONSTANT = 10000000000;

export default function MainL2Wallet() {
  const walletModalRef = useRef<any>();
  const [showPrivacyModal, setPrivacyModal] = useState<Boolean>(false);
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress, setWalletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const { address } = useWalletContext();
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [previousBalance, setPreviousBalance] = useState<any>(0);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [showFirstDepositModal, setShowFirstDepositModal] = useState<Boolean>(false);
  const selectedToken = useSelector((state: RootState) => state.token.selectedToken);

  const showWithDrawClaimModal = useSelector((state: RootState) => state.ui.showWithDrawClaimModal);
  const pKey = useSelector((state: RootState) => state.account.starkPublicKeyFromPrivateKey);

  const dispatch = useDispatch();
  const onRequestSignature = useCallback(
    async (web3Account: string) => {
      if (!web3Account) {
        console.error('Please connect wallet first.');
        return;
      }
      const signMessage = 'Message request signature: ';
      const web3 = await initialWeb3();
      const wSignature = await web3.eth.personal.sign(signMessage, web3Account, '');
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const commonModule = moduleFactory.getCommonModule();
      const starkKey = commonModule.getStarkPublicKey(wSignature);
      dispatch(setStarkPublicKey(starkKey));
      setLocalStarkKey(starkKey);
      setWalletAddress(web3Account?.toLowerCase());
    },
    [dispatch, setLocalStarkKey, setWalletAddress]
  );

  useEffect(() => {
    const loadWeb3 = async () => {
      const accounts = await getAccounts();
      const currentAccount = accounts[0];
      if (!accounts || accounts.length === 0) return null;

      dispatch(markWalletConnected());
      dispatch(setAccount(accounts[0]));

      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const userModule = moduleFactory.getUserModule();

      try {
        const user = await userModule.getUserByWalletAddress(currentAccount);
        if (user && user?.ethAddress?.toLowerCase() === currentAccount?.toLowerCase()) {
          onRequestSignature(currentAccount);
        }
      } catch {
        walletModalRef.current.onOpenModal();
      }
      return null;
    };
    if ((!pKey || pKey.length < 3) && address && address?.length > 0) {
      loadWeb3();
    }
  }, [address, pKey]);

  useEffect(() => {
    if (!address) return;

    const getBalanceOfMyriaL1Wallet = async () => {
      let assetType: string = '';
      if (selectedToken.name === 'Ethereum') {
        assetType = asset.getAssetType({
          type: 'ETH',
          data: {
            quantum: QUANTUM_CONSTANT.toString()
          }
        });
      } else {
        assetType = asset.getAssetType({
          type: 'ERC20',
          data: {
            quantum: '1',
            tokenAddress: selectedToken.tokenAddress
          }
        });
      }
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawModule = moduleFactory.getWithdrawModule();

      const assetList = await withdrawModule.getWithdrawalBalance(address, assetType);
      if (assetList !== previousBalance && previousBalance !== 0) {
        dispatch(
          setWithdrawClaimModal({
            show: true,
            claimAmount: assetList,
            isUpdated: true
          })
        );
      } else {
        console.log('[Balance is not update yet]');
      }
    };
    const interval = setInterval(() => {
      if (pKey && selectedToken) {
        getBalanceOfMyriaL1Wallet();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [pKey, selectedToken, dispatch, previousBalance]);

  const onSetStarkKeyToLocalStorage = (starkKey: string) => {
    setLocalStarkKey(starkKey);
  };

  useEffect(() => {
    if (!address) {
      const isOpen = walletModalRef.current.getModalState();
      if (isOpen) {
        walletModalRef.current.onCloseModal();
      }
    }
  }, [address]);

  const metaMaskConnect = async () => {
    await getModuleFactory();
  };

  const onAcceptTermOfService = async () => {
    setPrivacyModal(false);
    walletModalRef.current.onOpenModal();
  };

  const onGetStarted = () => {
    setWelcomeModal(false);
    setShowFirstDepositModal(true);
  };

  return (
    <div className="flex bg-[#050E15]">
      <TermsOfServiceModal
        onAccept={onAcceptTermOfService}
        modalShow={showPrivacyModal}
        closeModal={() => setPrivacyModal(false)}
      />
      <CreateMyriaWalletModal
        metaMaskConnect={metaMaskConnect}
        ref={walletModalRef}
        setStarkKeyToLocalStorage={onSetStarkKeyToLocalStorage}
        setWelcomeModal={setWelcomeModal}
      />

      <FirstDepositModal
        modalShow={showFirstDepositModal}
        closeModal={() => setShowFirstDepositModal(false)}
        completeDepositModal={() => setIsShowMessage(true)}
      />
      <MessageWithdrawModal
        isShowMessage={showWithDrawClaimModal}
        setIsShowMessage={() =>
          dispatch(
            setWithdrawClaimModal({
              show: false,
              claimAmount: 0,
              isUpdated: false
            })
          )
        }
      />
      <WelcomeMyriaModal modalShow={welcomeModal} closeModal={onGetStarted} />
    </div>
  );
}
