// Import packages
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/packages/l2-wallet/src/app/store';

import { setWithdrawClaimModal } from 'src/packages/l2-wallet/src/app/slices/uiSlice';
import TermsOfServiceModal from 'src/packages/l2-wallet/src/components/Modal/TermsOfServiceModal';
import CreateMyriaWalletModal from 'src/packages/l2-wallet/src/components/Modal/CreateMyriaWalletModal';
import FirstDepositModal from 'src/packages/l2-wallet/src/components/Modal/FirstDepositModal';
import MessageWithdrawModal from 'src/packages/l2-wallet/src/components/Modal/MessageWithdrawModal';
import WelcomeMyriaModal from 'src/packages/l2-wallet/src/components/Modal/WelcomeMyriaModal';
import { useWalletContext } from 'src/context/wallet';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { localStorageKeys } from 'src/configs';
import { useL2WalletContext } from 'src/context/l2-wallet';

const StarkwareLib = require('@starkware-industries/starkware-crypto-utils');

const { asset } = StarkwareLib;

const QUANTUM_CONSTANT = 10000000000;

export default function MainL2Wallet() {
  const walletModalRef = useRef<any>();
  const [showPrivacyModal, setPrivacyModal] = useState<Boolean>(false);
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const { address } = useWalletContext();
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [previousBalance, setPreviousBalance] = useState<any>(0);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [showFirstDepositModal, setShowFirstDepositModal] = useState<Boolean>(false);
  const selectedToken = useSelector((state: RootState) => state.token.selectedToken);

  const showWithDrawClaimModal = useSelector((state: RootState) => state.ui.showWithDrawClaimModal);
  const pKey = useSelector((state: RootState) => state.account.starkPublicKeyFromPrivateKey);

  const { isFirstTimeUser, connectL2WalletFirstTime } = useL2WalletContext();
  const dispatch = useDispatch();

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
    if (isFirstTimeUser) {
      walletModalRef.current.onOpenModal();
    } else {
      walletModalRef.current.onCloseModal();
    }
  }, [isFirstTimeUser]);

  const metaMaskConnect = useCallback(async () => {
    await connectL2WalletFirstTime(welcomeToMyriaL2Wallet);
  }, []);

  const welcomeToMyriaL2Wallet = () => {
    setWelcomeModal(true);
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
