// Import packages
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/packages/l2-wallet/src/app/store';

import { useWalletContext } from 'src/context/wallet';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { setWithdrawClaimModal } from 'src/packages/l2-wallet/src/app/slices/uiSlice';
import CreateMyriaWalletModal from 'src/packages/l2-wallet/src/components/Modal/CreateMyriaWalletModal';
import FirstDepositModal from 'src/packages/l2-wallet/src/components/Modal/FirstDepositModal';
import MessageDepositModal from 'src/packages/l2-wallet/src/components/Modal/MessageDepositModal';
import MessageWithdrawModal from 'src/packages/l2-wallet/src/components/Modal/MessageWithdrawModal';
import TermsOfServiceModal from 'src/packages/l2-wallet/src/components/Modal/TermsOfServiceModal';
import WelcomeMyriaModal from 'src/packages/l2-wallet/src/components/Modal/WelcomeMyriaModal';

import { useRouter } from 'next/router';
import { localStorageKeys } from 'src/configs';
import { useL2WalletContext } from 'src/context/l2-wallet';
import useTransactionList from 'src/hooks/useTransactionList';
import RequestEmailModal from 'src/packages/l2-wallet/src/components/Modal/RequestEmailModal';
import { getModuleFactory } from 'src/services/myriaCoreSdk';
import { convertWeiToEth } from 'src/utils';
import { useAuthenticationContext } from '../../context/authentication';
import { useGA4 } from '../../lib/ga';
const StarkwareLib = require('@starkware-industries/starkware-crypto-utils');
const { asset } = StarkwareLib;
const QUANTUM_CONSTANT = 10000000000;

const MainL2Wallet = forwardRef((props, ref) => {
  const walletModalRef = useRef<any>();
  const [showPrivacyModal, setPrivacyModal] = useState<Boolean>(false);
  const [localStarkKey, setLocalStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const { address } = useWalletContext();
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [previousBalance, setPreviousBalance] = useState<any>(0);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [requestEmailModal, setRequestEmailModal] = useState<string>();
  const [showFirstDepositModal, setShowFirstDepositModal] = useState<Boolean>(false);
  const { user } = useAuthenticationContext();

  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');

  const showWithDrawClaimModal = useSelector((state: RootState) => state.ui.showWithDrawClaimModal);
  const pKey = useSelector((state: RootState) => state.account.starkPublicKeyFromPrivateKey);

  const { isFirstTimeUser, connectL2WalletFirstTime } = useL2WalletContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const { event } = useGA4();
  const starkKeyUser = useSelector(
    (state: RootState) => state.account.starkPublicKeyFromPrivateKey
  );
  const starkKey = `0x${starkKeyUser}`;

  const { refetch: refetchTransactionList } = useTransactionList(localStarkKey);

  useEffect(() => {
    let addressWallet: any = null;

    if (walletAddress) {
      addressWallet = walletAddress;
    }
    if (address) {
      addressWallet = address;
    }
    if (!addressWallet) return;

    const getBalanceOfMyriaL1Wallet = async () => {
      let assetType: string = '';
      assetType = asset.getAssetType({
        type: 'ETH',
        data: {
          quantum: QUANTUM_CONSTANT.toString()
        }
      });
      const moduleFactory = await getModuleFactory();
      if (!moduleFactory) return;

      const withdrawModule = moduleFactory.getWithdrawModule();

      const currentBalance = await withdrawModule.getWithdrawalBalance(addressWallet, assetType);
      console.log('L1 Current balance ->', currentBalance);
      if (currentBalance > 0) {
        dispatch(
          setWithdrawClaimModal({
            show: true,
            claimAmount: convertWeiToEth(String(currentBalance)),
            isUpdated: true
          })
        );
      } else {
        console.log('[Balance is not update yet]');
      }
    };
    const interval = setInterval(() => {
      if (pKey && localStarkKey) {
        getBalanceOfMyriaL1Wallet();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [pKey, dispatch, previousBalance]);

  const onSetStarkKeyToLocalStorage = (starkKey: string) => {
    setLocalStarkKey(starkKey);
  };

  useEffect(() => {
    if (pKey) {
      refetchTransactionList();
    }
  }, [pKey]);

  useEffect(() => {
    if (isFirstTimeUser) {
      walletModalRef.current.onOpenModal();
    } else {
      walletModalRef.current.onCloseModal();
    }
  }, [isFirstTimeUser]);

  const welcomeToMyriaL2Wallet = useCallback(() => {
    event('L2 Wallet Registered', {
      user_email: user?.email,
      myria_id: user?.user_id,
      wallet_address: `_${address}`,
      l2_wallet_address: `_${starkKey}`,
      myria_username: user?.user_name || ''
    });
    setWelcomeModal(true);
  }, [address, event, starkKey, user?.email, user?.user_id, user?.user_name]);

  const metaMaskConnect = useCallback(async () => {
    event('L2 Wallet Registration Selected', {
      user_email: user?.email,
      myria_id: user?.user_id,
      wallet_address: `_${address}`
    });
    await connectL2WalletFirstTime(welcomeToMyriaL2Wallet);
  }, [
    address,
    connectL2WalletFirstTime,
    event,
    user?.email,
    user?.user_id,
    welcomeToMyriaL2Wallet
  ]);

  const onAcceptTermOfService = async () => {
    setPrivacyModal(false);
    walletModalRef.current.onOpenModal();
  };

  useImperativeHandle(ref, () => ({
    openRequestEmailModal() {
      setRequestEmailModal('center');
    }
  }));

  const onGetStarted = useCallback(() => {
    setWelcomeModal(false);
    if (user?.email) {
      setShowFirstDepositModal(true);
    }
    setRequestEmailModal('top-left');
  }, [user]);

  const onCloseEmail = useCallback(() => {
    setRequestEmailModal(undefined);
    if (requestEmailModal === 'top-left') {
      setShowFirstDepositModal(true);
    }
  }, [requestEmailModal]);

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
        isSigil={router.pathname === '/sigil'}
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
      {isShowMessage && (
        <MessageDepositModal
          isShowMessage={isShowMessage}
          setIsShowMessage={() => setIsShowMessage(false)}
        />
      )}
      <WelcomeMyriaModal modalShow={welcomeModal} closeModal={onGetStarted} />
      <RequestEmailModal
        modalShow={!!requestEmailModal}
        closeModal={onCloseEmail}
        position={requestEmailModal}
      />
    </div>
  );
});

export default MainL2Wallet;
