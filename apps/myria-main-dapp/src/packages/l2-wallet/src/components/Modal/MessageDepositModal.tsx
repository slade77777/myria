import cn from 'classnames';
import { CrossIcon } from '../Icons';
import WalletIcon from '../Icons/WalletIcon';

type Props = {
  isShowMessage: Boolean;
  setIsShowMessage: (arg0: Boolean) => void;
};

export default function MessageDepositModal({
  isShowMessage,
  setIsShowMessage,
}: Props) {
  const closeMessage = () => {
    setIsShowMessage(!isShowMessage);
  };

  return (
    <div className={cn(isShowMessage ? 'block' : 'hidden')}>
      <div className="bg-brand-deep-blue absolute -bottom-8 left-1/2 z-30 h-5 w-5 rotate-45 border-t border-l border-[#202230]"></div>
      <div className="bg-brand-deep-blue absolute top-16 right-16 max-h-[80vh] overflow-auto rounded-xl border border-[#202230] p-6">
        <div className="relative w-[302px]">
          <div
            className="absolute right-0 cursor-pointer"
            onClick={closeMessage}
          >
            <CrossIcon className="text-base/9" />
          </div>
          <div className="text-blue/6">
            <WalletIcon size={35} />
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold text-[#EEEBF1]">
              Your Myria Wallet
            </p>
          </div>
          <div className="text-base/9 mt-2 text-sm font-normal">
            <p>
              You can access your wallet here to view your assets and make
              deposits or withdrawals.{' '}
            </p>
          </div>
          <div className="mt-5" onClick={closeMessage}>
            <p className="text-primary/6 cursor-pointer text-sm font-medium uppercase">
              GOT IT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
