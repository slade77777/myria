import { Trans } from '@lingui/macro';
import React, { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'src/components/core/Button';
import CartIcon from 'src/components/icons/CartIcon';
import CompleteIcon from 'src/components/icons/CompleteIcon';
import DAOIcon from 'src/components/icons/DAOIcon';
import ProgressIcon from 'src/components/icons/ProgressIcon';
import { PurchaseStatus } from 'src/types/marketplace';
import FailedIcon from 'src/components/icons/FailedIcon';
interface IProp {
  assetBuy: {
    name: string;
    price: string;
  };
  onCloseMessage: () => void;
  onConfirm: () => Promise<any>;
}
interface ButtonProps {
  onCloseMessage: () => void;
  isProgressPurchase: boolean;
  onConfirm: () => void;
}

const PurchasePopover: FC<IProp> = ({ assetBuy, onCloseMessage, onConfirm }) => {
  const [isProgressPurchase, setIsProgressPurchase] = useState<boolean>(false);
  const [statusPurchase, setStatusPurchase] = useState<PurchaseStatus>(PurchaseStatus.CHECK);

  const elementContent = useMemo(() => {
    // function purchase
    const onPurchase = () => {
      setIsProgressPurchase(true);
      onConfirm()
        .then((val) => {
          // success
          setStatusPurchase(PurchaseStatus.SUCCESS);
        })
        .catch((e) => {
          // failed
          setStatusPurchase(PurchaseStatus.FAIL);
        })
        .finally(() => {
          // stop loading
          setIsProgressPurchase(false);
        });
    };

    // UI SUCCESS
    if (statusPurchase === PurchaseStatus.SUCCESS) {
      return {
        title: (
          <span className="text-[24px]">
            <Trans>Purchase Successful!</Trans>
          </span>
        ),
        assetName: (
          <span className="text-[14px]">
            You have purchased <span className="text-base/10">{assetBuy.name}</span>
          </span>
        ),
        icon: <CompleteIcon size={64} />,
        action: (
          <Button
            loading={false}
            className="btn-lg btn-primary my-8 w-full border"
            onClick={()=>{
              onCloseMessage();
            }}>
            <Trans>OK</Trans>
          </Button>
        ),
        history: (
          <div className="mt-2 flex justify-between">
            <span>
              <Trans>Transaction History</Trans>
            </span>
            <div
              onClick={() => {
                toast('This function is not ready yet!');
              }}
              className="text-primary/6 cursor-pointer">
              <Trans>View</Trans>
            </div>
          </div>
        )
      };
    }

    // UI FAILED
    if (statusPurchase === PurchaseStatus.FAIL) {
      return {
        title: (
          <span className="text-[24px]">
            <Trans>Purchase Failed!</Trans>
          </span>
        ),
        assetName: (
          <span className="text-[14px]">Your deposit could not be completed due to an error.</span>
        ),
        icon: <FailedIcon size={64} />,
        action: (
          <Button
            loading={false}
            className="btn-lg btn-primary my-8 w-full border"
            onClick={onCloseMessage}>
            <Trans>Retry</Trans>
          </Button>
        ),
        history: (
          <div className="mt-2 flex justify-between">
            <span>
              <Trans>Transaction History</Trans>
            </span>
            <div
              onClick={() => {
                toast('This function is not ready yet!');
              }}
              className="text-primary/6 cursor-pointer">
              <Trans>View</Trans>
            </div>
          </div>
        )
      };
    }
    // UI CHECKOUT
    return {
      title: (
        <span className="text-[24px]">
          <Trans>Complete checkout</Trans>
        </span>
      ),
      assetName: <span className="text-[14px]">Item {assetBuy.name}</span>,
      icon: <CartIcon color="#9AC9E3" size={64} />,
      action: (
        <ActionButtonCheckout
          onConfirm={onPurchase}
          onCloseMessage={onCloseMessage}
          isProgressPurchase={isProgressPurchase}
        />
      )
    };
  }, [assetBuy.name, isProgressPurchase, onCloseMessage, onConfirm, statusPurchase]);

  return (
    <div className="p-8">
      <div className="mt-[20px] text-white">
        <div className="flex flex-col items-center justify-center">
          {elementContent.icon}
          <h3 className="mt-[24px] text-[24px] font-medium">{elementContent.title}</h3>
          <p className="text-base/9 mt-[16px] font-normal">{elementContent.assetName}</p>
        </div>
        <div className="bg-base/2/[.5] text-base/9/[.6] mt-[32px] rounded-[8px] p-4 text-[16px]">
          <div className="flex justify-between">
            <span>
              <Trans>Amount</Trans>
            </span>
            <div className="flex items-center text-white">
              <DAOIcon />
              <span>{assetBuy.price}</span>
            </div>
          </div>
          {elementContent.history}
        </div>
        <div className="mt-[162px] flex justify-between">{elementContent.action}</div>
      </div>
    </div>
  );
};
export default PurchasePopover;

const ActionButtonCheckout: FC<ButtonProps> = ({
  onCloseMessage,
  isProgressPurchase,
  onConfirm
}) => {
  return (
    <>
      <Button
        onClick={onCloseMessage}
        loading={false}
        className="btn-lg my-8 h-[50px] w-[120px] border">
        <Trans>CANCEL</Trans>
      </Button>
      {isProgressPurchase ? (
        <Button disabled className="btn-lg bg-base/8 my-8 h-[50px] w-[120px]">
          <ProgressIcon size={23} />
        </Button>
      ) : (
        <Button className="btn-lg btn-primary my-8 h-[50px] w-[120px]" onClick={onConfirm}>
          <Trans>CONFIRM</Trans>
        </Button>
      )}
    </>
  );
};
