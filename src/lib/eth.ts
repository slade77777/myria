import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumberish, ethers, Signer } from 'ethers';
import { ReaderProvider } from 'src/context/wallet';

export async function formatTransferTxRequest(
  provider: ReaderProvider,
  amountInEther: number,
  sender: string,
  to: string,
  gasLimit: BigNumberish
): Promise<TransactionRequest> {
  const gasPrice = await provider.getGasPrice();
  const nonce = await provider.getTransactionCount(sender, 'latest');

  return {
    from: sender,
    to,
    gasPrice,
    gasLimit,
    nonce,
    value: ethers.utils.parseEther(amountInEther.toString())
  };
}


export async function transferEth(
    signer: Signer,
    txRequest: TransactionRequest
  ): Promise<TransactionResponse> {
    return signer.sendTransaction(txRequest);
  }