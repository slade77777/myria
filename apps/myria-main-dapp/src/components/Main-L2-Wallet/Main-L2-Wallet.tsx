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
import CreateMyriaAccountModal from 'src/packages/l2-wallet/src/components/Modal/CreateMyriaAccountModal';
import FirstDepositModal from 'src/packages/l2-wallet/src/components/Modal/FirstDepositModal';
import MessageDepositModal from 'src/packages/l2-wallet/src/components/Modal/MessageDepositModal';
import MessageWithdrawModal from 'src/packages/l2-wallet/src/components/Modal/MessageWithdrawModal';
import WelcomeMyriaModal from 'src/packages/l2-wallet/src/components/Modal/WelcomeMyriaModal';
import { useWalletContext } from 'src/context/wallet';

import { getAccounts, getModuleFactory, initialWeb3 } from 'src/services/myriaCoreSdk';

// @ts-ignore

const StarkwareLib = require('@starkware-industries/starkware-crypto-utils');

const { asset } = StarkwareLib;
declare const window: any;

const QUANTUM_CONSTANT = 10000000000;

export default function MainL2Wallet() {
  const walletModalRef = useRef<any>();
  const [showPrivacyModal, setPrivacyModal] = useState<Boolean>(false);
  const [openMyriaWalletModal, setOpenMyriaWallet] = useState<Boolean>(false);
  const [isShowMessage, setIsShowMessage] = useState<Boolean>(false);
  const [previousBalance, setPreviousBalance] = useState<any>(0);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [showFirstDepositModal, setShowFirstDepositModal] = useState<Boolean>(false);
  const selectedToken = useSelector((state: RootState) => state.token.selectedToken);
  const account = useSelector((state: RootState) => state.account.connectedAccount);

  const showWithDrawClaimModal = useSelector((state: RootState) => state.ui.showWithDrawClaimModal);
  const pKey = useSelector((state: RootState) => state.account.starkPublicKeyFromPrivateKey);

  const dispatch = useDispatch();

  useEffect(() => {
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

      const assetList = await withdrawModule.getWithdrawalBalance('0x' + pKey, assetType);
      if (assetList !== previousBalance && previousBalance !== 0) {
        dispatch(
          setWithdrawClaimModal({
            show: true,
            claimAmount: assetList,
            isUpdated: true
          })
        );
      } else {
        console.log('not updated');
      }
    };
    const interval = setInterval(() => {
      if (pKey && selectedToken) {
        getBalanceOfMyriaL1Wallet();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [pKey, selectedToken, dispatch, previousBalance]);

  const { address: walletAddress } = useWalletContext();

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
      console.log('[onRequestSignature] starkKey', starkKey);

      dispatch(setStarkPublicKey(starkKey));
    },
    [dispatch]
  );

  const loadWeb3 = useCallback(async () => {
    const accounts = await getAccounts();
    const currentAccount = accounts[0];
    if (!accounts || accounts.length === 0) return null;

    dispatch(markWalletConnected());
    dispatch(setAccount(accounts[0]));

    const moduleFactory = await getModuleFactory();
    if (!moduleFactory) return;

    const userModule = moduleFactory.getUserModule();

    if (!account) return null;

    try {
      const user = await userModule.getUserByWalletAddress(currentAccount);
      console.log('[Load web3] L2 wallet user -> ', user);
      if (user.status === 'success' && user.data) {
        console.log('[Load web3] request signature');
        onRequestSignature(currentAccount);
      }
    } catch {
      walletModalRef.current.onOpenModal();
    }
    return null;
  }, [account, dispatch, onRequestSignature]);

  useEffect(() => {
    if (!walletAddress) return;
    if (pKey.length == 0) {
      loadWeb3();
    }
  }, [walletAddress, loadWeb3]);

  useEffect(() => {
    if (!walletAddress) {
      const isOpen = walletModalRef.current.getModalState();
      if (isOpen) {
        walletModalRef.current.onCloseModal();
      }
    }
  }, [walletAddress]);

  const metaMaskConnect = async () => {
    await loadWeb3();
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
        setWelcomeModal={setWelcomeModal}
      />
      <CreateMyriaAccountModal
        className="px-[40px] pt-[37px] pb-[32px]"
        modalShow={openMyriaWalletModal}
        closeModal={() => setOpenMyriaWallet(false)}
      />
      <FirstDepositModal
        modalShow={showFirstDepositModal}
        closeModal={() => setShowFirstDepositModal(false)}
        completeDepositModal={() => setIsShowMessage(true)}
      />
      <MessageDepositModal isShowMessage={isShowMessage} setIsShowMessage={setIsShowMessage} />
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
