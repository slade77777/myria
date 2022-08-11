export type SubPageName = 'For Gamers' | 'For Developers';
export type PageName =
  | 'Home'
  | 'Ecosystem'
  | 'Game'
  | 'Nodes'
  | 'Store'
  | 'Our Vision'
  | 'Our Team'
  | 'Myria Studio'
  | 'Career'
  | 'Our Solution'
  | 'Game Detail'
  | 'Sigil'
  | 'Inventory'
  | 'Unknown';
type ButtonLocation =
  | 'Pop-up'
  | 'Footer'
  | 'Top Bar'
  | 'Top Button'
  | 'Banner'
  | 'Community Links'
  | 'Game';

export type BasedParams = {
  page_title: string;
  page_location: string;
  subpage_name: SubPageName;
  page_name: PageName;
};

export type Campaign =
  | 'Sigil'
  | 'Sigil Minting'
  | 'Nodes'
  | 'AB de Villers'
  | 'B2C Marketplace'
  | 'B2B';

export type NFTItemAction =
  | 'MKP Item Buy Now Selected'
  | 'MKP Check Out Confirmed'
  | 'MKP Check Out Canceled'
  | 'MKP Item Listing Confirmed'
  | 'MKP Item Listing Completed'
  | 'MKP Item Unlisting Selected'
  | 'MKP Item Listing Modify Selected'
  | 'MKP Item Unlisting Completed'
  | 'MKP Item Listing Modify Completed';

export type NFTItemNoPriceAction = 'MKP Item Listing Selected' | 'MKP Item Withdrawal Selected';

export type WalletMarketPlaceAction =
  | 'Wallet Deposit Selected'
  | 'Wallet Deposit Completed'
  | 'Wallet Deposit Failed'
  | 'Wallet Withdraw Selected'
  | 'Wallet Withdraw Completed'
  | 'Wallet Withdraw Failed'
  | 'Wallet Transaction History Selected';

export type NFTItemWithdrawAction =
  | 'NFT Withdraw Selected'
  | 'NFT Withdraw Completed'
  | 'NFT Withdraw Failed';

type NFTItemTrack = {
  myria_id?: string;
  wallet_address?: string;
  collection_name?: string;
  collection_author?: string;
  item_name: string;
  item_id: string;
};

type WalletActionTrack = {
  myria_id?: string;
  wallet_address: string;
  L2_wallet_address: string;
  amount_eth: number;
  amount_usd: number;
  balance_usd?: number;
  balance_eth?: number;
};

type NFTItemWithdrawTrack = {
  myria_id?: string;
  wallet_address?: string;
  L2_wallet_address: string;
  item_name: string;
  item_id: string;
};

type NFTItemTrackWithPrice = {
  myria_id?: string;
  wallet_address?: string;
  collection_name?: string;
  collection_author?: string;
  item_name: string;
  item_id: string;
  item_owner: string;
  item_price_eth?: number;
  item_price_usd?: number;
};

export type EventDefined = {
  'B2B Discord Button Clicked': {
    campaign?: string;
  };
  'B2B Contact Form Submitted': {
    campaign?: string;
    name: string;
    email: string;
    company: string;
    website: string;
    company_size: string;
    current_chain: string;
    project_info: string;
  };
  'B2B Start Building Selected': {
    campaign?: string;
  };
  'B2B Contact Sales Selected': {
    campaign?: string;
  };
  'Discord Button Clicked': {
    game_name?: string;
    button_location: ButtonLocation;
    page_name?: string;
  };
  'Twitter Button Clicked': {
    game_name?: string;
    button_location: ButtonLocation;
    page_name?: string;
  };
  'Instagram Button Clicked': {
    game_name?: string;
    button_location: ButtonLocation;
    page_name?: string;
  };
  'Medium Button Clicked': {
    game_name?: string;
    button_location: ButtonLocation;
    page_name?: string;
  };
  'Join Now Selected': {
    campaign: Campaign;
  };
  'Sign In Selected': {
    campaign: Campaign;
  };
  'Connect Wallet Selected': {
    campaign: Campaign;
  };
  'Install Metamask Clicked': {};
  'Sound Toggled': {
    sound_on: boolean;
    campaign: Campaign;
  };
  'Alliance Selected': {
    campaign: Campaign;
    alliance_name: string;
  };
  'Alliance Joined': {
    campaign: Campaign;
    alliance_name: string;
  };
  'Wallet Connected': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
  };
  'Wallet Disconnected': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
  };
  'Sigil Login Completed': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    wallet_address: string;
    alliance_name: string;
    sigil_alias: string;
    credits: string;
    date_registered: string;
  };
  'Mint Reward Selected': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
    l2_wallet_address: string;
  };
  'Mint Now Selected': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
    l2_wallet_address: string;
  };

  'Minting Completed': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
    l2_wallet_address: string;
  };
  'L2 Wallet Registration Selected': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
    l2_wallet_address: string;
  };
  'L2 Wallet Registered': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
    l2_wallet_address: string;
  };
  'Account Sign-up Clicked': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
  };
  'Account Sign-up Completed': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
  };
  'Sigil Discord Button Clicked': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
  };
  'Discord Button Completed': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    discord_username: string;
    discord_id: string;
    wallet_address: string;
  };
  'Invite Friend Button Clicked': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
  };
  'Invite Link Copied': {
    campaign: Campaign;
    myria_id?: string;
    myria_username: string;
    user_email: string;
    wallet_address: string;
  };
  'Sigil Credit Updated': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
    task_name: string;
    credit_amount: number;
    total_credit: number;
  };
  'Reward Claim Selected': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
    reward_name: string;
    credit_amount: number;
  };
  'Reward Claimed': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
    reward_name: string;
    credit_amount: number;
  };
  'Reward Share Completed': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
    reward_name: string;
    credit_amount: number;
  };
  'Sigil Inventory Viewed': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
  };
  'Chest Claimed': {
    campaign: Campaign;
    myria_id?: string;
    wallet_address: string;
    item_list: string;
    credit_amount: number;
  };
  'Hero Banner Clicked': {
    campaign: Campaign;
  };
  'Email Subscribed': {
    campaign: Campaign;
    user_email: string;
  };
  'Buy A Node Button Clicked': {
    campaign: Campaign;
  };
  'Node Order Updated': {
    campaign: Campaign;
    wallet_address?: string;
    node_quantity: number;
  };
  'Node Order Placed': {
    campaign: Campaign;
    wallet_address?: string;
    node_quantity: number;
    order_status: 'Completed' | 'Error';
    error_details?: string;
  };
  'Node Order Purchased': {
    campaign: Campaign;
    wallet_address?: string;
    node_quantity: number;
    order_status: 'Completed' | 'Error';
    eth_total_amount: number;
    usd_total_amount: number;
    error_details?: string;
  };
  'Node Order Completed': {
    campaign: Campaign;
    wallet_address?: string;
    node_quantity: number;
    eth_total_amount: number;
    usd_total_amount: number;
  };
  'MKP Collection Selected': {
    myria_id?: string;
    wallet_address?: string;
    collection_name: string;
    collection_author: string;
  };
  'MKP Item Selected': NFTItemTrack;
  'MKP Item Buy Now Selected': NFTItemTrackWithPrice;
  'MKP Check Out Confirmed': NFTItemTrackWithPrice;
  'MKP Check Out Canceled': NFTItemTrackWithPrice;
  'MKP Purchase Completed': NFTItemTrackWithPrice & { trx_url: string };
  'MKP Item Listing Selected': NFTItemTrack;
  'MKP Item Listing Confirmed': NFTItemTrackWithPrice;
  'MKP Item Listing Completed': NFTItemTrackWithPrice;
  'MKP Item Unlisting Selected': NFTItemTrackWithPrice;
  'MKP Item Listing Modify Selected': NFTItemTrackWithPrice;
  'MKP Item Listing Modify Completed': NFTItemTrackWithPrice & {
    old_price_eth: number;
    old_price_usd: number;
  };
  'MKP Item Unlisting Completed': NFTItemTrackWithPrice;
  'MKP Item Withdrawal Selected': NFTItemTrack;
  'MKP Connect to Buy Selected': {
    collection_name?: string;
    collection_author?: string;
    item_name: string;
    item_id: string;
  };
  'Wallet Deposit Selected': WalletActionTrack;
  'Wallet Deposit Completed': WalletActionTrack & {
    trx_url?: string;
  };
  'Wallet Deposit Failed': WalletActionTrack & {
    error_code?: string;
  };
  'Wallet Withdraw Selected': WalletActionTrack;
  'Wallet Withdraw Completed': WalletActionTrack & {
    trx_url?: string;
  };
  'Wallet Withdraw Failed': WalletActionTrack & {
    error_code?: string;
  };
  'NFT Withdraw Selected': NFTItemWithdrawTrack;
  'NFT Withdraw Completed': NFTItemWithdrawTrack & { trx_url?: string };
  'Wallet Transaction History Selected': WalletActionTrack & {
    trx_url?: string;
  };
};

export const forceGAStringParam = (t?: string) => (t ? `_${t}` : '');
