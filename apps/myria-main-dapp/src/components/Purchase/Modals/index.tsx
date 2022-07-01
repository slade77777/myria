import { TransactionRequest } from '@ethersproject/abstract-provider';
import { Trans } from '@lingui/macro';
import { BigNumber, ethers, utils } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'src/components/core/Button';
import ETH from 'src/components/icons/ETHIcon';
import InfoIcon from 'src/components/icons/InfoIcon';
import Modal from 'src/components/Modal';
import { useWalletContext } from 'src/context/wallet';
import { formatTransferTxRequest, transferEth } from 'src/lib/eth';
import { formatCurrency } from 'src/lib/formatter';
import { useGA4 } from 'src/lib/ga';

export type PurchaseInformationProps = {
  quantity: number,
  totalPriceEth: number,
  totalPriceUsd: number,
  toAddress: string,
  transactionId: string, // TODO
  nonce: string, // TODO
}

const ModalPurchase = ({
  data,
  open,
  onClose,
  onPurchaseComplete
}: {
  data: PurchaseInformationProps;
  open: boolean;
  onClose: () => void;
  onPurchaseComplete?: (tx: string) => void;
}) => {
  const { readerProviderApi, signerProviderApi,address, balance } = useWalletContext();
  const {quantity, totalPriceEth, totalPriceUsd, transactionId, nonce, toAddress} = data;
  const { event } = useGA4();

  const isInsufficientBalance = utils
    .parseEther(totalPriceEth.toString())
    .gt(balance ?? BigNumber.from(0));

  const { data: txRequest } = useQuery<TransactionRequest | undefined>(
    ['tx-transfer-request', totalPriceEth, address, open, isInsufficientBalance, toAddress],
    async () => {
      // this never happens due to line 53 but just by pass ts check
      // TODO: check if useQuery has some ts supports
      if (!address || !readerProviderApi  || isInsufficientBalance) {
        return;
      }
      return await formatTransferTxRequest(
        readerProviderApi,
        totalPriceEth,
        address,
        toAddress,
        Number(process.env.NEXT_PUBLIC_NODE_GAS_LIMIT)
      );
    },
    {
      enabled: !!address && !!readerProviderApi && !isInsufficientBalance
    }
  );

  const { mutateAsync: handleTransferETH, isLoading: isPurchasing } = useMutation(async () => {
    if (txRequest && signerProviderApi) {
      const res = await transferEth(signerProviderApi?.getSigner(), txRequest);
      const tx = await res.wait();

      return tx.transactionHash;
    }
    throw new Error('Missing params');
  });

  // submit purchase
  const { mutateAsync: submitPurchase, isLoading: isSubmiting } = useMutation(async ({ txHash, nonce, transactionId}: { txHash: string; nonce: string; transactionId: string }) => {
    if (txHash && nonce && transactionId) {
      await (new Promise((resolve) => {
        setTimeout(() => {
          console.log('Submited', { txHash, nonce, transactionId });
          resolve(txHash);
        }, 2000);
      }));

      onPurchaseComplete?.(txHash);
    } else {
      throw new Error('Missing params');
    }
  });

  const trackPurchase = useCallback((error?: string) => {
    event('Node Order Purchased', {
      campaign: 'Nodes',
      wallet_address: address,
      node_quantity: quantity,
      order_status: error ? 'Error' : 'Completed',
      eth_total_amount: totalPriceEth,
      usd_total_amount: totalPriceUsd,
      error_details: error
    })
  }, [])

  const onPurchase = useCallback(async () => {
    try {

      const txHash = await handleTransferETH();

      if (!txHash) {
        trackPurchase('Empty transaction hash')
        throw new Error("Empty transaction hash");
      }
      trackPurchase();
      await submitPurchase({ txHash, nonce, transactionId });
      event('Node Order Completed', {
        campaign: 'Nodes',
        wallet_address: address,
        node_quantity: quantity,
        eth_total_amount: totalPriceEth,
        usd_total_amount: totalPriceUsd,
      })
      toast.success('Purchase completed');
    } catch (e) {
      toast.error('Purchase uncompleted');
    }
  }, [handleTransferETH, submitPurchase, nonce, transactionId]);


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
        loading={isPurchasing || isSubmiting}
        disabled={isPurchasing || isSubmiting || isInsufficientBalance}>
        {label}
      </Button>
    );
  }, [isInsufficientBalance, isPurchasing, isSubmiting, onPurchase]);

  return (
    <Modal open={open} onOpenChange={(isPurchasing || isSubmiting) ? () => null : onClose}>
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
                Quantity: {quantity}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-end">
                <ETH />
                <p className="heading-md ml-2">{totalPriceEth}</p>
              </div>
              <p className="body-sm text-right text-light">~${formatCurrency(totalPriceUsd, 2)}</p>
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
                <ETH /> <p className="heading-list ml-2">{totalPriceEth}</p>
              </div>
              <p className="body-sm text-right text-light">~${formatCurrency(totalPriceUsd, 2)}</p>
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
                <p className="heading-md ml-2">{totalPriceEth}</p>
              </div>
              <p className="body-sm text-right text-light">~${formatCurrency(totalPriceUsd, 2)}</p>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <span className="mb-1 text-[16px] font-normal text-[#A1AFBA]">
                <Trans>Wallet balance</Trans>
              </span>
              <div className="flex">
                <ETH />
                {balance && (
                  <p className="body-sm ml-2 flex-1 text-light">
                    {Number(ethers.utils.formatEther(balance)).toFixed(4)} ETH
                  </p>
                )}
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
              ...(!isPurchasing
                ? {
                    overflow: 'hidden',
                    padding: '0px',
                    height: '0px'
                  }
                : {})
            }}>
            <div className="mr-2 h-4 w-4 text-[#9AC9E3]">
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
