import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';

const QUANTUM = '10000000000';

/**
 * // Convert ETH unit 1 to WEI
 * @param amount
 * @returns
 */
export function convertAmountToQuantizedAmount(
  amount: number | string,
): number {
  const wei = convertEthToWei(String(amount));
  return BigNumber.from(wei).div(BigNumber.from(QUANTUM)).toNumber();
}

/**
 * Convert eth to wei
 * @param amount
 * @returns
 */
export function convertEthToWei(amount: string): String {
  if (!amount || Number(amount) === 0) return '0';

  return Web3.utils.toWei(amount.toString()).toString();
}

export function convertWeiToEth(amount: string): string {
  const balance = BigNumber.from(amount);
  return ethers.utils.formatEther(balance);
}

/**
 * Convert quantized amount to eth amount
 */

export function convertQuantizedAmountToEth(amount: string): string {
  if (!amount || Number(amount) === 0) {
    return '0';
  }
  return Web3.utils.fromWei(String(Number(amount) * Number(QUANTUM)));
}
