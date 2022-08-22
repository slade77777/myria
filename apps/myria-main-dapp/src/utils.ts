import { t } from '@lingui/macro';
import { BigNumber, ethers } from 'ethers';
import { EXPLORE_LINKS } from './services/common-ethers';
import { getNetworkId } from './services/myriaCoreSdk';
import { AllianceInfo, AllianceName, RarityType } from './types/sigil';

const FORMAT_PRICE = 1000000;
export const FORMAT_DATE = 'ddd Do MMM YYYY';
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en').format(num);
};
export const formatNumber2digits = (num: number) => {
  return Number(num).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
export const formatPrice = (amountPrice: number) => {
  if (!amountPrice) return `0.00`;
  let lenghtPrice;
  if (amountPrice.toString().includes('-')) {
    const splitPrice = amountPrice.toString().split('-');
    lenghtPrice = splitPrice[1];
  } else {
    lenghtPrice = amountPrice.toString().length - 2;
  }

  return amountPrice >= 1
    ? formatNumber2digits(amountPrice)
    : amountPrice.toFixed(Number(lenghtPrice));
};
export const formatUSDPrice = (amountPrice: number) => {
  if (!amountPrice) return `0.00`;
  if (amountPrice >= 1) return formatNumber2digits(amountPrice);
  return `${Math.round(amountPrice * FORMAT_PRICE) / FORMAT_PRICE}`;
};
export const paddingX = 'px-6 md:px-12 xl:px-16';
export const negativeMarginXSm = '-mx-6';
export const negativeMarginXMd = 'md:-mx-12';
export const negativeMarginXXl = 'xl:-mx-16';
export const isMobile = () => process.browser && screen && screen.width <= 480;

export const validatePassword = (password: string) => {
  if (!/^.{8,}$/.test(password)) {
    return t`Password must have at least 8 characters—the more characters, the better`;
  }

  if (!/[a-z].*[A-Z]|[A-Z].*[a-z]/.test(password)) {
    return t`Password must have both uppercase and lowercase letters`;
  }

  if (!/\d/.test(password) || !/[a-zA-Z]/g.test(password)) {
    return t`Password must be mixture of letters and numbers`;
  }

  if (/^[a-zA-Z0-9]*$/.test(password)) {
    return t`Password must contain at least one special character`;
  }

  return undefined;
};

export function convertWeiToEth(amount: string): string {
  const balance = BigNumber.from(amount);
  return ethers.utils.formatEther(balance);
}

export const validatedImage = (url: string | null | undefined) => {
  const imagesDefault = '/images/marketplace/collection-2-bg.png';
  if (!url) {
    return imagesDefault;
  }
  return url;
};

export const getRarityColor = (rarity: RarityType) => {
  switch (rarity) {
    case 'common':
      return '#A9A6B1';
    case 'rare':
      return '#A9CB68';
    case 'ultra_rare':
      return '#4FA6B9';
    case 'epic':
      return '#D191E1';
    case 'celestial':
      return '#CBE352';
    default:
      return '#A9A6B1';
  }
};

export const getAllianceInfo = (allianceId: AllianceName): AllianceInfo => {
  switch (allianceId) {
    case 'equinox':
      return {
        id: allianceId,
        name: 'EQUINOX',
        img: '/images/nodes/insignia/alliance_sigilC.png'
      };
    case 'federation':
      return {
        id: allianceId,
        name: 'FEDERATION',
        img: '/images/nodes/insignia/alliance_sigilA.png'
      };
    case 'vector_prime':
      return {
        id: allianceId,
        name: 'VECTOR PRIME',
        img: '/images/nodes/insignia/alliance_sigilB.png'
      };
  }
};
const getBaseExploreLink = (type: 'address' | 'transaction' = 'address', networkId: number) => {
  if (type === 'address') {
    return EXPLORE_LINKS[networkId as keyof typeof EXPLORE_LINKS]?.address;
  } else {
    return EXPLORE_LINKS[networkId as keyof typeof EXPLORE_LINKS]?.transaction;
  }
};
export const getExplorerForAddress = (
  ContractAddress: string,
  networkId: number,
  type?: 'address' | 'transaction'
) => {
  const baseEtherLink = getBaseExploreLink(type, networkId);
  const etherLink = `${baseEtherLink}/${ContractAddress}`;
  return etherLink;
};

export const truncateAddress = (
  string: string,
  firstSymbols: number = 4,
  lastSymbols: number = 4
) => {
  let abbreviationAddress = '';
  if (string) {
    abbreviationAddress =
      string.substring(0, firstSymbols) +
      '...' +
      string.substring(string.length - lastSymbols, string.length);
    return abbreviationAddress;
  }
  return abbreviationAddress;
};
export function hexifyKey(key: string) {
  return `0x${key}`;
}

export function capitalizeFirstLetter(str: string = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateResolution() {
  if (typeof window === 'undefined') return false;
  const widthScreen = window.screen.width;
  if (widthScreen < 768) {
    return true;
  }
  return false;
}
