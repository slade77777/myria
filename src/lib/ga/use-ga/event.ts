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

type Campaign = 'Sigil'

export type EventDefined = {
  'Discord Button Clicked': {
    game_name?: string;
    button_location: ButtonLocation;
  },
  'Twitter Button Clicked': {
    game_name?: string;
    button_location: ButtonLocation;
  },
  'Join Now Selected': {
    campaign: Campaign;
  },
  'Sign In Selected': {
    campaign: Campaign;
  },
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
  }
};
