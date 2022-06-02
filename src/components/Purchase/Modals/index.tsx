import { useCallback, useEffect, useState } from 'react';
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

  const { mutate,  isLoading } = useMutation(async () => {
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

  const buildTransferRequest = useCallback(async () => {
    if (providerApi && address) {
      setTxRequest(
        await formatTransferTxRequest(
          providerApi,
          quantity / 10,
          address,
          process.env.NEXT_NODE_RECIEVER_ADDRESS as string,
          process.env.NEXT_NODE_GAS_LIMIT as string
        )
      );
    }
  }, [quantity, balance, open, providerApi]);

  useEffect(() => {
    buildTransferRequest();
  }, [buildTransferRequest]);

  const onPurchase = async () => {
    mutate();
  };
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
                <p className="heading-md ml-2">{quantity * unitNodeEth}</p>
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
                <ETH /> <p className="heading-list ml-2">{quantity * unitNodeEth}</p>
              </div>
              <p className="body-sm text-right text-light">~${quantity * priceEth}</p>
            </div>
          </div>
        </div>

        <section className="bg-[#050E15] p-8">
          <div className="flex justify-between">
            <p className="heading-list">
              <Trans>Total</Trans>
            </p>
            <div>
              <div className="flex items-center justify-end">
                <ETH />
                <p className="heading-md ml-2">{quantity * unitNodeEth}</p>
              </div>
              <p className="body-sm text-right text-light">~${quantity * priceEth}</p>
            </div>
          </div>
          <div className="mt-1 flex">
            <p className="body-sm flex-1 text-light">
              <Trans>{balance} ETH</Trans>
            </p>
            <Button className="btn-lg btn-primary mt-2 justify-end" onClick={onPurchase} loading={isLoading}>
              <Trans>Purchase now</Trans>
            </Button>
          </div>
        </section>
      </Modal.Content>
    </Modal>
  );
};

export default ModalPurchase;
