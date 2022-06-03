import { useCallback, useEffect, useMemo, useState } from 'react';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { Trans } from '@lingui/macro';
import ETH from 'src/components/icons/ETHIcon';
import Modal from 'src/components/Modal';
import { formatTransferTxRequest, transferEth } from 'src/lib/eth';
import { useWalletContext } from 'src/context/wallet';
import { BigNumber, ethers } from 'ethers';
import { useMutation, useQuery } from 'react-query';
import Button from 'src/components/core/Button';
import InfoIcon from 'src/components/icons/InfoIcon';
// import { useWalletContext } from 'src/context/wallet';

const ModalPurchase = ({
  balance,
  quantity,
  open,
  onClose,
  onPurchaseComplete
}: {
  balance: string | undefined;
  quantity: number | 0;
  open: boolean;
  onClose: () => void;
  onPurchaseComplete?: (tx: string) => void;
}) => {
  const [txRequest, setTxRequest] = useState<TransactionRequest>();
  const { providerApi, address } = useWalletContext();

  const { mutate, isLoading: isPurchasing } = useMutation(async () => {
    if (txRequest && providerApi) {
      const res = await transferEth(providerApi?.getSigner(), txRequest);
      const tx = await res.wait();
      console.log(tx);

      onPurchaseComplete?.(tx.transactionHash);
      return tx;
    }
  });

  // const qty = 3;
  const priceEth = 1839.04;
  const unitNodeEth = 1.5;
  const totalPrice = Math.max(quantity * unitNodeEth, 0);
  const isInsufficientBalance = totalPrice > Number(balance);

  const buildTransferRequest = useCallback(async () => {
    if (providerApi && address) {
      setTxRequest(
        await formatTransferTxRequest(
          providerApi,
          quantity / 100,
          address,
          process.env.NEXT_PUBLIC_NODE_RECIEVER_ADDRESS as string,
          Number(process.env.NEXT_PUBLIC_NODE_GAS_LIMIT)
        )
      );
    }
  }, [quantity, providerApi, address]);

  const onPurchase = useCallback(async () => {
    mutate();
  }, [mutate]);

  const button = useMemo(() => {
    let className = 'btn-primary';
    let label = 'Purchase now';

    if (isInsufficientBalance) {
      className = 'bg-[#4B5563] text-[#9CA3AF]';
      label = 'INSUFFICIENT FUND';
    }

    if (isPurchasing) {
      className = 'bg-[#4B5563] text-[#9CA3AF]';
      label = 'PROCESSING';
    }

    return (
      <Button
        className={`btn-lg justify-end ${className}`}
        onClick={onPurchase}
        loading={isPurchasing}
        disabled={isPurchasing || isInsufficientBalance}>
        <Trans>{label}</Trans>
      </Button>
    );
  }, [isInsufficientBalance, isPurchasing, onPurchase]);

  useEffect(() => {
    buildTransferRequest();
  }, [buildTransferRequest]);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content
        title="Complete your purchase"
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:max-w-[832px]">
        <div className=" p-8">
          <div className="mt-10 mb-4 flex justify-between">
            <div>
              <p className="heading-list">
                <Trans>Myria Founder’s Node</Trans>
              </p>
              <p className="body-sm text-light">
                <Trans>Quantity: {quantity}</Trans>
              </p>
            </div>
            <div>
              <div className="flex items-center justify-end">
                <ETH />
                <p className="heading-md ml-2">{totalPrice}</p>
              </div>
              <p className="body-sm text-right text-light">~${quantity * priceEth}</p>
            </div>
          </div>

          <div className="mb-[56px] flex justify-between border-t border-white border-opacity-10 pt-4">
            <div className="">
              <p className="heading-list">
                <Trans>Transaction fee</Trans>
              </p>
            </div>
            <div>
              <div className="flex items-center justify-end">
                <ETH /> <p className="heading-list ml-2">{totalPrice}</p>
              </div>
              <p className="body-sm text-right text-light">~${quantity * priceEth}</p>
            </div>
          </div>
        </div>

        <section className="bg-[#050E15] p-8">
          <div className="mb-3 flex justify-between">
            <p className="heading-list">
              <Trans>Total</Trans>
            </p>
            <div>
              <div className="flex items-center justify-end">
                <ETH />
                <p className="heading-md ml-2">{totalPrice}</p>
              </div>
              <p className="body-sm text-right text-light">~${quantity * priceEth}</p>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <span className="mb-1 text-[16px] font-normal text-[#A1AFBA]">
                <Trans>Wallet balance</Trans>
              </span>
              <div className="flex">
                <ETH />
                <p className="body-sm ml-2 flex-1 text-light">
                  <Trans>{balance} ETH</Trans>
                </p>
              </div>
            </div>

            {button}
          </div>
          <div
            className="flex items-center rounded-lg py-4 px-3"
            style={{
              border: isPurchasing ? 'solid 1px rgba(154, 201, 227, 0.2)' : 'none',
              background: 'rgba(154, 201, 227, 0.1)',
              transition: 'all 0.1s',
              ...(!isPurchasing ? {
                overflow: 'hidden',
                padding: '0px',
                height: '0px'
              } : {})
            }}>
            <div className='w-4 h-4 text-[#9AC9E3] mr-2'>
              <InfoIcon />
            </div>
            <span className="text-[12px] font-normal text-[#9AC9E3]">
              <Trans>
                Your purchase is being processed, please do not refresh or close your browser{' '}
              </Trans>
            </span>
          </div>
        </section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalPurchase;
