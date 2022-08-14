const ETHER_HOST = 'https://etherscan.io';
const GOERLI_ETHER_HOST = 'https://goerli.etherscan.io';
const ROPSTEN_ETHER_HOST = 'https://ropsten.etherscan.io';

export const EXPLORE_LINKS = {
  [1]: {
    address: `${ETHER_HOST}/address`,
    transaction: `${ETHER_HOST}/tx`
  },
  [5]: {
    address: `${GOERLI_ETHER_HOST}/address`,
    transaction: `${GOERLI_ETHER_HOST}/tx`
  },
  [3]: {
    address: `${ROPSTEN_ETHER_HOST}/address`,
    transaction: `${ROPSTEN_ETHER_HOST}/tx`
  }
};
