import { ethers } from 'ethers';

export async function transferEth(
  provider: ethers.providers.Web3Provider,
  amount: number,
  fromAddress: string,
  toAddress: string
) {
  throw 'not implemented';
}

export async function getEstimatedGasPrice(provider: ethers.providers.Web3Provider) {
  return provider.getGasPrice();
}
