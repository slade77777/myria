// DEPRECATED TO BE REMOVE AND UNUSED FILES

// Import packages
import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux';

// Import components
import Header from '../Header';
import TermsOfServiceModal from '../Modal/TermsOfServiceModal';
import FirstDepositModal from '../Modal/FirstDepositModal';
import { RootState } from '../../app/store';
// import CreateMyriaAccountModal from '../Modal/CreateMyriaAccountModal';
// import CreateMyriaWalletModal from '../Modal/CreateMyriaWalletModal';
import MessageDepositModal from '../Modal/MessageDepositModal';
import MessageWithdrawModal from '../Modal/MessageWithdrawModal';
import WelcomeMyriaModal from '../Modal/WelcomeMyriaModal';

// Import Redux
import {
  markWalletConnected,
  setAccount,
  setStarkPublicKey,
} from '../../app/slices/accountSlice';
import { setWithdrawClaimModal } from '../../app/slices/uiSlice';
import StarkKeyNotFoundModal from '../Modal/StarkKeyNotFoundModal';
import { getModuleFactory } from '../../services/myriaCoreSdk';

// @ts-ignore

const StarkwareLib = require('@starkware-industries/starkware-crypto-utils');

const { asset } = StarkwareLib;
declare const window: any;

const QUANTUM_CONSTANT = 10000000000;

interface TProps {
  children: JSX.Element | JSX.Element[];
}
export default function MainLayout({ children }: TProps) {
  console.log('Render main layout...');
  const walletModalRef = useRef<any>();
  const [showPrivacyModal, setPrivacyModal] = useState<Boolean>(false);
  const [openMyriaWalletModal, setOpenMyriaWallet] = useState<Boolean>(false);
  const [isShowMessage, setIsShowMessage] = useState<Boolean>(false);
  const [previousBalance, setPreviousBalance] = useState<any>(0);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [starkKeyNotFoundModal, setStarkKeyNotFoundModal] =
    useState<boolean>(false);
  const [showFirstDepositModal, setShowFirstDepositModal] =
    useState<Boolean>(false);

  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken,
  );
  const account = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );

  const showWithDrawClaimModal = useSelector(
    (state: RootState) => state.ui.showWithDrawClaimModal,
  );
  const pKey = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getBalanceOfMyriaL1Wallet = async () => {
      let assetType: string = '';
      if (selectedToken.name === 'Ethereum') {
        assetType = asset.getAssetType({
          type: 'ETH',
          data: {
            quantum: QUANTUM_CONSTANT.toString(),
          },
        });
      } else {
        assetType = asset.getAssetType({
          type: 'ERC20',
          data: {
            quantum: '1',
            tokenAddress: selectedToken.tokenAddress,
          },
        });
      }
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const withdrawModule = moduleFactory.getWithdrawModule();

      const assetList = await withdrawModule.getWithdrawalBalance(
        account,
        assetType,
      );
      if (assetList !== previousBalance && previousBalance !== 0) {
        dispatch(
          setWithdrawClaimModal({
            show: true,
            claimAmount: assetList,
            isUpdated: true,
          }),
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
  const loadWeb3 = async () => {
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
      return accounts[0];
    }
    return null;
  };

  const connectWallet = async () => {
    try {
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const web3Account = await loadWeb3();

      const userModule = moduleFactory.getUserManager();
      const user = await userModule.getUserByWalletAddress(web3Account);
      if (
        user &&
        user?.ethAddress?.toLowerCase() === web3Account?.toLowerCase()
      ) {
        onRequestSignature(web3Account);
      }
    } catch (e) {
      setStarkKeyNotFoundModal(true);
    }
  };

  const onAcceptTermOfService = async () => {
    setPrivacyModal(false);
    walletModalRef.current.onOpenModal();
  };
  const onRequestSignature = async (web3Account: string) => {
    if (!web3Account) {
      console.error('Please connect wallet first.');
      return;
    }
    const message = 'Message request signature: ';
    const fromWalletAddress = web3Account;
    if (window.web3) {
      const wSignature = await window.web3.eth.personal.sign(
        message,
        fromWalletAddress,
      );
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;
      const commonModule = moduleFactory.getCommonModule();
      const starkKey = commonModule.getStarkPublicKey(wSignature);
      dispatch(setStarkPublicKey(starkKey));
    }
  };

  const onGetStarted = () => {
    setWelcomeModal(false);
    setShowFirstDepositModal(true);
  };

  return (
    <div className="flex min-h-[100vh] bg-[#050E15]">
      <div className="w-full">
        <Header
          handleConnectWallet={() => {
            connectWallet();
          }}
          account={account}
        />
        <div className="mt-[42px]">{children}</div>
      </div>
      <TermsOfServiceModal
        onAccept={onAcceptTermOfService}
        modalShow={showPrivacyModal}
        closeModal={() => setPrivacyModal(false)}
      />
      {/* <CreateMyriaWalletModal
        metaMaskConnect={metaMaskConnect}
        ref={walletModalRef}
        setWelcomeModal={setWelcomeModal}
      /> */}
      {/* <CreateMyriaWalletModal
        className="px-[40px] pt-[37px] pb-[32px]"
        modalShow={openMyriaWalletModal}
        closeModal={() => setOpenMyriaWallet(false)}
      /> */}
      <FirstDepositModal
        modalShow={showFirstDepositModal}
        closeModal={() => setShowFirstDepositModal(false)}
        completeDepositModal={() => setIsShowMessage(true)}
      />
      <MessageDepositModal
        isShowMessage={isShowMessage}
        setIsShowMessage={setIsShowMessage}
      />
      <MessageWithdrawModal
        isShowMessage={showWithDrawClaimModal}
        setIsShowMessage={() =>
          dispatch(
            setWithdrawClaimModal({
              show: false,
              claimAmount: 0,
              isUpdated: false,
            }),
          )
        }
      />
      <WelcomeMyriaModal modalShow={welcomeModal} closeModal={onGetStarted} />
      <StarkKeyNotFoundModal
        modalShow={starkKeyNotFoundModal}
        createHandler={() => {
          setStarkKeyNotFoundModal(false);
          walletModalRef.current.onOpenModal();
        }}
      />
    </div>
  );
}
