// Import packages
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IMyriaClient, Modules, MyriaClient } from 'myria-core-sdk';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// Import components
import { ThreeDotsVerticalIcon } from '../Icons';
import { setStarkPublicKey } from '../../app/slices/accountSlice';
// import LoadingIcon from '../Icons/LoadingIcon';
// import CheckIconFull from '../Icons/CheckIconFull';
// import WelcomeMyriaModal from './WelcomeMyriaModal';
// import FirstDepositModal from './FirstDepositModal';
// import MessageDepositModal from './MessageDepositModal';

// Import Redux
import { RootState } from '../../app/store';
import CreateMyriaWalletIcon from '../Icons/CreateMyriaWalletIcon';

type RefType = {
  onOpenModal: () => void;
  onCloseModal: () => void;
};

type Props = {
  metaMaskConnect: any;
  setWelcomeModal: any;
};

// const steps = [
//   {
//     id: 1,
//     title: 'Verify Wallet Ownership',
//     description:
//       'Vegan PBR&B listicle sriracha. Migas lomo helvetica, listicle paleo salvia sartorial.',
//   },
//   {
//     id: 2,
//     title: 'Create your Myria Key',
//     description:
//       'Intelligentsia whatever mlkshk salvia, authentic jianbing wolf coloring book echo park fam.',
//   },
// ];
declare let window: any;
const CreateMyriaWalletModal = forwardRef<RefType, Props>((props, ref) => {
  const { metaMaskConnect, setWelcomeModal } = props;
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);

  const [step, setStep] = useState({
    sign: false,
    fastTransaction: false,
    loadingSign: false,
    loadingFastTransaction: false,
  });
  const account = useSelector(
    (state: RootState) => state.account.connectedAccount,
  );
  const onOpenModal = () => {
    setDisplay(true);
  };
  const onCloseModal = () => {
    setDisplay(false);
  };

  const onRequestSignature = async () => {
    if (!account) {
      console.error('Please connect wallet first.');
      return;
    }
    const message = 'Message request signature: ';
    const fromWalletAddress = account;
    if (window.web3) {
      const wSignature = await window.web3.eth.personal.sign(
        message,
        fromWalletAddress,
      );
      const client: IMyriaClient = {
        provider: window.web3.currentProvider,
        networkId: parseInt(window.web3.currentProvider.networkVersion, 10),
        web3: window.web3,
      };

      const myriaClient = new MyriaClient(client);

      const moduleFactory = new Modules.ModuleFactory(myriaClient);
      const commonModule = moduleFactory.getCommonModule();
      const userModule = moduleFactory.getUserModule();
      const starkKey = commonModule.getStarkPublicKey(wSignature);
      setStep({
        ...step,
        loadingSign: false,
        sign: true,
        loadingFastTransaction: true,
      });
      dispatch(setStarkPublicKey(starkKey));
      setTimeout(() => {
        setStep({
          loadingSign: false,
          sign: true,
          loadingFastTransaction: false,
          fastTransaction: true,
        });
        userModule
          .registerUser('0x' + starkKey, account)
          .then(data => {
            alert('User Register Success!');
            setWelcomeModal(true);
          })
          .catch(err => {
            alert('User Register Error!');
            setWelcomeModal(true);
          })
          .finally(() => {
            onCloseModal();
          });
      }, 2000);
    }
  };
  const onSendRequest = () => {
    setStep({ ...step, loadingSign: true });
    metaMaskConnect().then(() => {
      onRequestSignature();
      // onCloseModal();
    });
  };
  useImperativeHandle(ref, () => ({
    onOpenModal,
    onCloseModal,
  }));

  return (
    <div
      className={cn(
        `absolute top-[100px] right-[21px] bg-[#081824] w-[406px] border border-[#202230] rounded-[20px] py-6`,
        display ? 'block' : 'hidden',
      )}
    >
      <div className="flex justify-end items-center px-4">
        <div className="text-[#A1AFBA] text-[14px] mr-1">
          {account.substring(0, 4) +
            '...' +
            account.substring(account.length - 4, account.length)}
        </div>
        <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
      </div>

      <div className="relative w-[20px] h-[20px]">
        <div className="w-[20px] h-[20px] bg-[#081824] rotate-45 absolute top-[-66px] left-[250px] border-t border-l border-[#202230]" />
      </div>

      <div>
        <div className="flex justify-center mt-[47px]">
          <CreateMyriaWalletIcon className="text-[#9AC9E3]" size={64} />
        </div>

        <div className="text-white text-center text-[24px] font-bold mt-6">
          Welcome to Myria
        </div>

        <div className="text-[#A1AFBA] text-[14px] px-[20px] mt-6">
          <p>To purchase NFTs on Myria, create a Myria L2 Wallet.</p>
          <p className="mt-3">
            By creating your Myria L2 wallet and using Myria, you agree to our
            <span className="text-[#F5B941]">Terms of Service</span> and{' '}
            <span className="text-[#F5B941]">Privacy Policy</span>.
          </p>
        </div>

        <div className="flex justify-between px-[24px] mt-[173px]">
          <button
            onClick={onCloseModal}
            className="uppercase text-white bg-transparent font-bold text-[14px] py-[9px] px-[35px] border border-[#A1AFBA] rounded-[8px]"
          >
            Cancel
          </button>
          <button
            onClick={onSendRequest}
            className="py-[9px] px-[26px] flex justify-center items-center text-[#040B10] text-[14px] font-bold bg-[#F5B941] rounded-[8px] uppercase"
          >
            agree and sign
          </button>
        </div>
      </div>
    </div>
  );
});
export default CreateMyriaWalletModal;
