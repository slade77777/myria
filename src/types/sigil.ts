export type UserInfo = {
  user_id: string;
  alliance: string;
  alias: string;
  credits: number;
  date_registered: number;
  href: string;
};

export type Reward = {
  reward_id: number;
  title: string;
  description: string;
  image_url: string;
  credits_required: number;
  status: 'claimed' | 'claimable' | 'locked' | 'in_progress';
  progress_percentage?: number;
};

export type Mission = {
  mission_id:
    | 'MYRIA_ACCOUNT'
    | 'JOIN_DISCORD'
    | 'SHARE_TWITTER'
    | 'INVITE_FRIEND'
    | 'DAILY_DISCORD_MESSAGE'
    | 'FIRST_DISCORD_MESSAGE'
    | 'SHARE_IDEA_DISCORD'
    | 'VOTE_ON_LORE_DISCORD'
    | 'SPACE_LORD_ROLE_DISCORD';
  status: 'locked' | 'completed' | 'available';
  title: string;
  description: string;
  credits: number;
  earned_credits: number;
  repetition_limit: null | number;
  repetition_text: null | 'Unlimited' | 'Daily';
  completed: boolean;
  trackGA4?: () => void;
};

export type AllianceInfo = {
  id: AllianceName;
  img: string;
  name: string;
}
export type AllianceName = "equinox" | "federation" | "vector_prime" 
export type RarityType = 'common' | 'rare' | 'ultra_rare' | 'epic' | 'celestial'