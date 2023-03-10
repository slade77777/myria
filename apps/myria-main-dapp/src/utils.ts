import { t } from '@lingui/macro';
import { BigNumber, ethers } from 'ethers';
import { AssetDetailsResponse } from 'myria-core-sdk';
import { EXPLORE_LINKS } from './services/common-ethers';
import { AllianceInfo, AllianceName, RarityType } from './types/sigil';
import Big from 'big.js';
import moment from 'moment';

const FORMAT_PRICE = 1000000;
export const FORMAT_DATE = 'ddd Do MMM YYYY';
export const FORMAT_DATE_BY_AIRDROP = 'DD MMM YYYY';
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

  return amountPrice >= 1 ? amountPrice.toFixed(4) : amountPrice.toFixed(Number(lenghtPrice));
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

export const validatePassword = (password?: string) => {
  if (!password) return undefined;

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

export const validatedImageAssets = (url: string | null | undefined, assetDetails: any) => {
  const imagesDefault = '/images/marketplace/collection-2-bg.png';
  if (!url && !assetDetails?.metadataOptional && !assetDetails?.metadataOptional?.image) {
    return imagesDefault;
  } else if (assetDetails?.metadataOptional && assetDetails?.metadataOptional?.image) {
    return assetDetails?.metadataOptional?.image;
  }
  return url;
};

export const getRarityColor = (rarity: RarityType) => {
  switch (rarity) {
    case 'Common':
      return '#A9A6B1';
    case 'Rare':
      return '#A9CB68';
    case 'Ultra Rare':
      return '#4FA6B9';
    case 'Epic':
      return '#D191E1';
    case 'Celestial':
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
        name: 'Equinox',
        img: '/images/nodes/insignia/alliance_sigilC.png'
      };
    case 'federation':
      return {
        id: allianceId,
        name: 'Federation',
        img: '/images/nodes/insignia/alliance_sigilA.png'
      };
    case 'vector_prime':
      return {
        id: allianceId,
        name: 'Vector Prime',
        img: '/images/nodes/insignia/alliance_sigilB.png'
      };
  }
};
export const getBaseExploreLink = (
  type: 'address' | 'transaction' = 'address',
  networkId: number
) => {
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

export const getItemsPagination = (pages: any[]): { items: any[]; totalItem: number } => {
  if (!pages?.length || pages.length === 0) {
    return {
      items: [],
      totalItem: 0
    };
  }

  const items = pages.reduce(
    (
      acc: any[],
      page: {
        data: {
          items: AssetDetailsResponse[];
        };
      }
    ) => {
      return [...acc, ...(page?.data?.items || [])];
    },
    []
  );
  const totalItem = pages[0].data?.meta.totalItems;

  return { items, totalItem };
};
export function capitalizeFirstLetter(str: string = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateResolution() {
  if (typeof window === 'undefined') return false;
  var mobile = [
    'iphone',
    'android',
    'blackberry',
    'nokia',
    'opera mini',
    'windows mobile',
    'windows phone',
    'iemobile'
  ];
  for (var i in mobile)
    if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
  return false;
}

export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export const toFormat = (big: Big, dp?: number, isExponential?: boolean, ts = ',', ds = '.') => {
  if (big.gt(Big(0)) && dp !== undefined && dp > 0 && big.lt(Big(`1e-${dp}`))) {
    return `${Big(`1e-${dp}`).toFixed()}`;
  }
  const temp = !isExponential || Big(1e21).gt(big) ? big.toFixed(dp, 0) : big.toExponential(dp, 0);
  const arr = temp.replace(/\.0+(?=$|e)/, '').split('.');
  if (arr[1]) {
    arr[1] = arr[1].replace(/0+($|e)/, '');
  }
  arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ts);
  return arr.join(ds);
};

export const roundingNumber = (amount: string, currency?: string, isAfter = true, decimal = 4) => {
  try {
    const value = toFormat(Big(amount), decimal, true);
    if (!currency) return value;
    return isAfter ? `${value} ${currency}` : `${currency} ${value}`;
  } catch (err) {
    return '';
  }
};

export const generateUUID = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};

export const utilTaskId = {
  verifyEmail: 'VERIFY_EMAIL',
  joinDiscord: 'JOIN_DISCORD',
  followMyriaTwitter: 'FOLLOW_TWITTER',
  followBrendanTwitter: 'FOLLOW_BRENDAN',
  inviteFriends: 'INVITE_FRIEND',
  dailyLogAndPostDiscord: 'DAILY_DISCORD_MESSAGE',
  sharePostTwitter: 'SHARE_TWITTER',
  reachLevelDiscord: 'DISCORD_STAR_LORD'
};

export const getLinkMission = (paramTaskId: string, homePage: string) => {
  //Check utilTaskId to return link
  switch (paramTaskId) {
    case utilTaskId.followMyriaTwitter:
      return `https://twitter.com/intent/follow?screen_name=Myria`;

    case utilTaskId.dailyLogAndPostDiscord:
      return `https://discord.com/channels/${process.env.NEXT_PUBLIC_CAMPAIGN_SERVER_ID}/${process.env.NEXT_PUBLIC_CAMPAIGN_CHANNEL_ID}`;

    case utilTaskId.followBrendanTwitter:
      return `https://twitter.com/intent/follow?screen_name=brendan_duhamel`;

    case utilTaskId.sharePostTwitter:
      const content = `@Myria, the leading #Web3 gaming ecosystem, with over 1 million users, is celebrating the $MYRIA token launch and the Alliance Keys NFT Airdrop! 🚀
Complete the most basic missions to win your Alliance Key NFT with in-game utility. 🤩
✅ Find out how here`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${homePage}`;

    case utilTaskId.joinDiscord:
      return `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CAMPAIGN_DISCORD_CLIENT_ID}&redirect_uri=${homePage}&response_type=code&scope=identify%20guilds.join`;

    case utilTaskId.reachLevelDiscord:
      return `https://discord.com/channels/${process.env.NEXT_PUBLIC_CAMPAIGN_SERVER_ID}/${process.env.NEXT_PUBLIC_CAMPAIGN_CHANNEL_ID}`;

    default:
      return `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CAMPAIGN_DISCORD_CLIENT_ID}&redirect_uri=${homePage}&response_type=code&scope=identify%20guilds.join`;
  }
};
export const campaignCode = 'AIR_DROP';
export const REWARD_TYPE = {
  OFF_CHAIN_ASSET: 'OFF_CHAIN',
  ON_CHAIN_ASSET: 'ON_CHAIN_ASSET'
};
export const REWARD_STATUS = {
  LOCKED: 'LOCKED',
  AVAILABLE: 'AVAILABLE',
  CLAIMED: 'CLAIMED'
};

export const REWARD_IMG_DEFAULT = {
  default: '/images/Common.png',
  commonKey: '/images/Federation_Common_Key.svg',
  rareFragmentKey1: '/images/Federation_Rare_Fragment_1.svg',
  rareFragmentKey2: '/images/Federation_Rare_Fragment_2.svg',
  ultraRareFragmentKey1: '/images/Federation_Ultra_fragment_1.svg',
  ultraRareFragmentKey2: '/images/Federation_Ultra_fragment_2.svg',
  ultraRareFragmentKey3: '/images/Federation_Ultra_fragment_3.svg'
};

export const rewardsDefaultImg = '/images/Common.png';
interface I_REPETITION_TYPE {
  ONCE: string;
  UNLIMITED: string;
  DAILY: string;
}

export const REPETITION_TYPE: I_REPETITION_TYPE = {
  ONCE: 'ONCE',
  UNLIMITED: 'UNLIMITED',
  DAILY: 'DAILY'
};

export function formatTimeSecond(time: number, format?: string) {
  return moment.utc(time * 1000).format(format || 'HH:mm');
}
