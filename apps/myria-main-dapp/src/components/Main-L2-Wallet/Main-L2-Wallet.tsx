// Import packages
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux';
import { IMyriaClient, Modules, MyriaClient } from 'myria-core-sdk';

// Import components
// import Header from '../Header';
// import TermsOfServiceModal from '../Modal/TermsOfServiceModal';
// import FirstDepositModal from '../Modal/FirstDepositModal';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
// import CreateMyriaAccountModal from '../Modal/CreateMyriaAccountModal';
// import CreateMyriaWalletModal from '../Modal/CreateMyriaWalletModal';
// import MessageDepositModal from '../Modal/MessageDepositModal';
// import MessageWithdrawModal from '../Modal/MessageWithdrawModal';
// import WelcomeMyriaModal from '../Modal/WelcomeMyriaModal';

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
            // tokenAddress: '0xD5f1cC0264d0E22BE4488109dbf5d097eb37a576',
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
      const initializeClient: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: 5,
        web3: window.web3
      };

      const moduleFactory = new Modules.ModuleFactory(initializeClient);
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
      const message = 'Message request signature: ';
      const fromWalletAddress = web3Account;
      if (window.web3 && window.web3.eth && window.web3.eth.personal) {
        const wSignature = await window.web3.eth.personal.sign(message, fromWalletAddress[0]);
        const client: IMyriaClient = {
          provider: window.web3.currentProvider,
          networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
          web3: window.web3
        };
        const myriaClient = new MyriaClient(client);
        const moduleFactory = new Modules.ModuleFactory(myriaClient);
        const commonModule = moduleFactory.getCommonModule();
        const starkKey = commonModule.getStarkPublicKey(wSignature);
        console.log('starkKey', starkKey);

        dispatch(setStarkPublicKey(starkKey));
      }
    },
    [dispatch]
  );

  const loadWeb3 = useCallback(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    if (window.web3) {
      const accounts = await window.web3.eth.getAccounts();
      dispatch(markWalletConnected());
      dispatch(setAccount(accounts[0]));
      const client: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
        web3: window.web3
      };
      const myriaClient = new MyriaClient(client);

      const moduleFactory = new Modules.ModuleFactory(myriaClient);
      const userModule = moduleFactory.getUserModule();

      if (!account) return null;

      try {
        const user = await userModule.getUserByWalletAddress(accounts);
        console.log('User -> ', user);
        if (user.status === 'success' && user.data) {
          console.log('request signature');
          onRequestSignature(accounts);
        }
      } catch {
        walletModalRef.current.onOpenModal();
      }
    }
    return null;
  }, [account, dispatch, onRequestSignature]);

  useEffect(() => {
    if (!walletAddress) return;
    loadWeb3();
  }, [walletAddress, loadWeb3]);

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
