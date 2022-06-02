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
// import { useWalletContext } from 'src/context/wallet';

const ModalPurchase = ({
  balance,
  quantity,
  open,
  onClose
}: {
  balance: string | undefined;
  quantity: number | 0;
  open: boolean;
  onClose: () => void;
}) => {
  const [txRequest, setTxRequest] = useState<TransactionRequest>();
  const { providerApi, address } = useWalletContext();

  const { mutate, isLoading: isPurchasing } = useMutation(async () => {
    if (txRequest && providerApi) {
      const res = await transferEth(providerApi?.getSigner(), txRequest);
      const tx = await res.wait();
      console.log(tx);
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
          quantity / 10,
          address,
          process.env.NEXT_PUBLIC_NODE_RECIEVER_ADDRESS as string,
          process.env.NEXT_PUBLIC_NODE_GAS_LIMIT as string
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
        disabled={isPurchasing || isInsufficientBalance}
      >
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
          {true && (
            <div
              className="flex items-center rounded-lg py-4 px-3"
              style={{
                border: isPurchasing ? 'solid 1px rgba(154, 201, 227, 0.2)' : 'none',
                background: 'rgba(154, 201, 227, 0.1)',
                transition: 'all 0.1s',
                ...(!isPurchasing && {
                  overflow: 'hidden',
                  padding: '0px',
                  height: '0px',
                })
              }}>
              <svg
                className="mr-2"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.00016 0.333008C3.32683 0.333008 0.333496 3.32634 0.333496 6.99967C0.333496 10.673 3.32683 13.6663 7.00016 13.6663C10.6735 13.6663 13.6668 10.673 13.6668 6.99967C13.6668 3.32634 10.6735 0.333008 7.00016 0.333008ZM6.50016 4.33301C6.50016 4.05967 6.72683 3.83301 7.00016 3.83301C7.2735 3.83301 7.50016 4.05967 7.50016 4.33301V7.66634C7.50016 7.93967 7.2735 8.16634 7.00016 8.16634C6.72683 8.16634 6.50016 7.93967 6.50016 7.66634V4.33301ZM7.6135 9.91967C7.58016 10.0063 7.5335 10.073 7.4735 10.1397C7.40683 10.1997 7.3335 10.2463 7.2535 10.2797C7.1735 10.313 7.08683 10.333 7.00016 10.333C6.9135 10.333 6.82683 10.313 6.74683 10.2797C6.66683 10.2463 6.5935 10.1997 6.52683 10.1397C6.46683 10.073 6.42016 10.0063 6.38683 9.91967C6.3535 9.83967 6.3335 9.75301 6.3335 9.66634C6.3335 9.57967 6.3535 9.49301 6.38683 9.41301C6.42016 9.33301 6.46683 9.25968 6.52683 9.19301C6.5935 9.13301 6.66683 9.08634 6.74683 9.05301C6.90683 8.98634 7.0935 8.98634 7.2535 9.05301C7.3335 9.08634 7.40683 9.13301 7.4735 9.19301C7.5335 9.25968 7.58016 9.33301 7.6135 9.41301C7.64683 9.49301 7.66683 9.57967 7.66683 9.66634C7.66683 9.75301 7.64683 9.83967 7.6135 9.91967Z"
                  fill="#9AC9E3"
                />
              </svg>
              <span className="text-[12px] font-normal text-[#9AC9E3]">
                <Trans>
                  Your purchase is being processed, please do not refresh or close your browser{' '}
                </Trans>
              </span>
            </div>
          )}
        </section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalPurchase;
