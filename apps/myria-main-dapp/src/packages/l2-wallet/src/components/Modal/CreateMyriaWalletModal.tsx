// Import packages
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// Import components
import { ThreeDotsVerticalIcon, MyriaLogoIcon } from '../Icons';

// Import Redux
import { RootState } from '../../app/store';

type RefType = {
  onOpenModal: () => void;
  onCloseModal: () => void;
};

type Props = {
  metaMaskConnect: any;
  setWelcomeModal: any;
  setStarkKeyToLocalStorage: (starkKey: string) => void;
  isSigil?: boolean;
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
  const {
    metaMaskConnect,
    setWelcomeModal,
    setStarkKeyToLocalStorage,
    isSigil,
  } = props;
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

  const onSendRequest = () => {
    metaMaskConnect();
  };
  useImperativeHandle(ref, () => ({
    onOpenModal,
    onCloseModal,
    getModalState: () => {
      return display;
    },
  }));

  return (
    <div className={cn(display ? 'block' : 'hidden')}>
      {isSigil && (
        <div className="fixed inset-0 z-[-1] bg-[#040B10] opacity-70" />
      )}
      <div className="absolute -bottom-[30px] left-1/2 z-30 h-[20px] w-[20px] rotate-45 border-t border-l border-[#202230] bg-[#081824]" />
      <div className="absolute top-16 right-16 max-h-[80vh] w-[406px] overflow-auto rounded-[20px] border border-[#202230] bg-[#081824] py-6">
        <div className="flex items-center justify-end px-4">
          {account && (
            <div className="mr-1 text-[14px] text-[#A1AFBA]">
              {account.substring(0, 4) +
                '...' +
                account.substring(account.length - 4, account.length)}
            </div>
          )}
          <ThreeDotsVerticalIcon className="text-[#A1AFBA]" size={32} />
        </div>
        <div>
          <div className="mt-[24px] flex justify-center">
            <MyriaLogoIcon className="text-white" size={82} />
          </div>

          <div className="mt-6 text-center text-[24px] font-bold text-white">
            Welcome to Myria
          </div>

          <div className="px-2 text-center text-[16px] text-white">
            {isSigil
              ? 'Let’s get your account set up so you can mint your Sigil rewards.'
              : 'Let’s get your account set up.'}
          </div>

          <div className="mx-auto mt-[57px] w-[193px]">
            <div>
              🚀{' '}
              <span className="text-[16px] text-white">0 gas fee trading</span>
            </div>
            <div className="mt-5">
              ⚡️{' '}
              <span className="text-[16px] text-white">
                Instant transactions
              </span>
            </div>
            <div className="mt-5">
              🔒{' '}
              <span className="text-[16px] text-white">
                Secured by Ethereum{' '}
              </span>
            </div>
          </div>

          <div className="mt-[56px] px-[50px] text-center text-[12px] text-[#A1AFBA]">
            By creating your Myria L2 wallet and using Myria, you agree to our{' '}
            <span className="text-[#F5B941]">Terms of Service</span> and{' '}
            <span className="text-[#F5B941]">Privacy Policy.</span>
          </div>

          <div className="mt-[49px] flex justify-between px-[24px]">
            <button
              onClick={onCloseModal}
              className="rounded-[8px] border border-[#A1AFBA] bg-transparent py-[9px] px-[35px] text-[14px] font-bold uppercase text-white"
            >
              Cancel
            </button>
            <button
              onClick={onSendRequest}
              className="flex items-center justify-center rounded-[8px] bg-[#F5B941] py-[9px] px-[26px] text-[14px] font-bold uppercase text-[#040B10]"
            >
              agree and sign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default CreateMyriaWalletModal;
