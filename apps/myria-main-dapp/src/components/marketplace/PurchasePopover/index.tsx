import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import Button from 'src/components/core/Button';
import CartIcon from 'src/components/icons/CartIcon';
import CompleteIcon from 'src/components/icons/CompleteIcon';
import DAOIcon from 'src/components/icons/DAOIcon';
import ProgressIcon from 'src/components/icons/ProgressIcon';
interface IProp {
  currentPrice: string;
  onCloseMessage: () => void;
  onConfirm: () => void;
}

const TIMEOUT: number = 5000;

const PurchasePopover: React.FC<IProp> = ({ currentPrice, onCloseMessage, onConfirm }) => {
  const [isProgressPurchase, setIsProgressPurchase] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const InProgressPurchase = () => {
    setIsProgressPurchase(true);
    setTimeout(() => {
      setIsCompleted(true);
      onConfirm();
      setIsProgressPurchase(false);
    }, TIMEOUT);
  };

  return (
    <div className="p-8">
      {!isCompleted ? (
        <div className="text-white mt-[20px]">
          <div className="flex flex-col justify-center items-center">
            <CartIcon size={64} />
            <h3 className="font-medium text-[24px] mt-[24px]">
              <Trans>Complete checkout</Trans>
            </h3>
            <p className="font-normal mt-[16px] text-base/9">
              <Trans>Ultra rare Vector Prime Sigil</Trans>
            </p>
          </div>
          <div className="bg-base/2 p-4 rounded-[8px] text-[16px] mt-[32px]">
            <div className="flex justify-between">
              <span className="text-base/9">
                <Trans>Amount</Trans>
              </span>
              <div className="flex items-center">
                <DAOIcon />
                <span>{currentPrice}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[162px]">
            <Button onClick={onCloseMessage} loading={false} className="btn-lg my-8 border w-[120px] h-[50px]">
              <Trans>CANCEL</Trans>
            </Button>
            {isProgressPurchase ? (
              <Button disabled className="btn-lg bg-base/8 my-8 w-[120px] h-[50px]">
                <ProgressIcon size={23} />
              </Button>
            ) : (
              <Button
                className="btn-lg btn-primary my-8 w-[120px] h-[50px]"
                onClick={InProgressPurchase}>
                <Trans>CONFIRM</Trans>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-white mt-[20px]">
          <div className="flex flex-col justify-center items-center">
            <CompleteIcon size={64} />
            <h3 className="font-medium text-[24px] mt-[24px]">
              <Trans>Purchase Successful</Trans>
            </h3>
            <p className="font-normal mt-[16px] text-base/9">
              <Trans>Ultra rare Vector Prime Sigil</Trans>
            </p>
          </div>
          <div className="bg-base/2 p-4 rounded-[8px] text-[16px] mt-[32px]">
            <div className="flex justify-between">
              <span className="text-base/9">
                <Trans>Amount</Trans>
              </span>
              <div className="flex items-center">
                <DAOIcon />
                <span>{currentPrice}</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-base/9">
                <Trans>Transaction History</Trans>
              </span>
              <span className="text-primary/6">
                <Trans>View</Trans>
              </span>
            </div>
          </div>
          <div className="w-full mt-[162px]">
            <Button
              loading={false}
              className="btn-lg btn-primary my-8 border w-full"
              onClick={onCloseMessage}>
              <Trans>OK</Trans>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PurchasePopover;
