import { IProviderInfo } from '../../helpers';

// @ts-ignore
import Web3DefaultLogo from '../logos/web3-default.svg';
// @ts-ignore
import MetaMaskLogo from '../logos/metamask.svg';
// @ts-ignore
import SafeLogo from '../logos/safe.svg';
// @ts-ignore
import NiftyWalletLogo from '../logos/niftyWallet.png';
// @ts-ignore
import TrustLogo from '../logos/trust.svg';
// @ts-ignore
import DapperLogo from '../logos/dapper.png';
// @ts-ignore
import CoinbaseLogo from '../logos/coinbase.svg';
// @ts-ignore
import CipherLogo from '../logos/cipher.svg';
// @ts-ignore
import imTokenLogo from '../logos/imtoken.svg';
// @ts-ignore
import StatusLogo from '../logos/status.svg';
// @ts-ignore
import TokenaryLogo from '../logos/tokenary.png';
// @ts-ignore
import OperaLogo from '../logos/opera.svg';
// @ts-ignore
import FrameLogo from '../logos/frame.svg';
// @ts-ignore
import LiqualityLogo from '../logos/liquality.png';
// @ts-ignore
import MathWalletLogo from '../logos/mathwallet.png';
// @ts-ignore
import RWalletLogo from '../logos/rwallet.svg';
// @ts-ignore
import BitpieLogo from '../logos/bitpie.svg';
// @ts-ignore
import XDEFILogo from '../logos/xdefi.svg';
// @ts-ignore
import CeloExtensionWalletLogo from '../logos/celoExtensionWallet.svg';

export const FALLBACK: IProviderInfo = {
  id: 'injected',
  name: 'Web3',
  logo: Web3DefaultLogo.src,
  type: 'injected',
  check: 'isWeb3'
};

export const METAMASK: IProviderInfo = {
  id: 'injected',
  name: 'MetaMask',
  logo: MetaMaskLogo.src,
  type: 'injected',
  check: 'isMetaMask'
};

export const SAFE: IProviderInfo = {
  id: 'injected',
  name: 'Safe',
  logo: SafeLogo.src,
  type: 'injected',
  check: 'isSafe'
};

export const NIFTY: IProviderInfo = {
  id: 'injected',
  name: 'Nifty',
  logo: NiftyWalletLogo.src,
  type: 'injected',
  check: 'isNiftyWallet'
};

export const DAPPER: IProviderInfo = {
  id: 'injected',
  name: 'Dapper',
  logo: DapperLogo.src,
  type: 'injected',
  check: 'isDapper'
};

export const OPERA: IProviderInfo = {
  id: 'injected',
  name: 'Opera',
  logo: OperaLogo.src,
  type: 'injected',
  check: 'isOpera'
};

export const TRUST: IProviderInfo = {
  id: 'injected',
  name: 'Trust',
  logo: TrustLogo.src,
  type: 'injected',
  check: 'isTrust'
};

export const COINBASE: IProviderInfo = {
  id: 'injected',
  name: 'Coinbase',
  logo: CoinbaseLogo.src,
  type: 'injected',
  check: 'isToshi'
};

export const CIPHER: IProviderInfo = {
  id: 'injected',
  name: 'Cipher',
  logo: CipherLogo.src,
  type: 'injected',
  check: 'isCipher'
};

export const IMTOKEN: IProviderInfo = {
  id: 'injected',
  name: 'imToken',
  logo: imTokenLogo.src,
  type: 'injected',
  check: 'isImToken'
};

export const STATUS: IProviderInfo = {
  id: 'injected',
  name: 'Status',
  logo: StatusLogo.src,
  type: 'injected',
  check: 'isStatus'
};

export const TOKENARY: IProviderInfo = {
  id: 'injected',
  name: 'Tokenary',
  logo: TokenaryLogo.src,
  type: 'injected',
  check: 'isTokenary'
};

export const FRAMEINJECTED: IProviderInfo = {
  id: 'injected',
  name: 'Frame',
  logo: FrameLogo.src,
  type: 'injected',
  check: 'isFrame'
};

export const LIQUALITY: IProviderInfo = {
  id: 'injected',
  name: 'Liquality',
  logo: LiqualityLogo.src,
  type: 'injected',
  check: 'isLiquality'
};

export const MATHWALLET: IProviderInfo = {
  id: 'injected',
  name: 'Math Wallet',
  logo: MathWalletLogo.src,
  type: 'injected',
  check: 'isMathWallet'
};

export const RWALLET: IProviderInfo = {
  id: 'injected',
  name: 'rWallet',
  logo: RWalletLogo.src,
  type: 'injected',
  check: 'isRWallet'
};

export const XDEFI: IProviderInfo = {
  id: 'injected',
  name: 'XDEFI',
  logo: XDEFILogo.src,
  type: 'injected',
  check: '__XDEFI'
};

export const BITPIE: IProviderInfo = {
  id: 'injected',
  name: 'Bitpie',
  logo: BitpieLogo.src,
  type: 'injected',
  check: 'isBitpie'
};

export const CELOINJECTED: IProviderInfo = {
  id: 'injected',
  name: 'Celo extension wallet',
  logo: CeloExtensionWalletLogo.src,
  type: 'injected',
  check: 'isCelo'
};
