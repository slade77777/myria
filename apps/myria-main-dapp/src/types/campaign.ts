import { SplitSignature } from 'myria-core-sdk/dist/types';
export interface CampaignResponseType<T> {
  status: string;
  data: T;
}
export type RegisterData = {
  starkKey: string;
  walletAddress?: string;
  userId?: string;
  username?: string;
  referrerId?: string | null;
  email?: string;
  signature?: SplitSignature;
};

export type Task = {
  callToAction: string;
  pk: string;
  repetitionLimit: number;
  sk: string;
  starsValue: number;
  taskDescription: number;
  taskId: string;
  taskStatus: string;
  taskTitle: string;
  totalStars: number;
};

export type Ticket = {
  pk: string;
  purchaseDate: string;
  sk: string;
  ticketNumber: number;
  ticketStatus: string;
  ticketType: string;
  weekNumber: number;
};

export type UserAirDop = {
  availableStars: number;
  createdAt: string;
  currentWeekTickets: Ticket[];
  earnedStars: number;
  pk: string;
  referredPurchases: string[];
  referredUsers: string[];
  sk: string;
  tasks: Task[];
  date_registered?: Date;
  updatedAt: string;
  ticketCount: number;
  ticketPrice: number;
  walletAddress: string;
};

export type MyriaUser = {
  user_id: number;
  wallet_id: string;
};
export interface MissionProgressType {
  userId: number;
  campaignId: number;
  missionId: number;
  code: string;
  earnedPoints: number;
  performedTimes: number;
  remainingAction: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  missionCampaign: {
    campaignId: number;
    missionId: number;
    code: string;
    title: string;
    description: string;
    actionTitle: string;
    point: number;
    channelId: null;
    repetitionType: string;
    repetitionLimit: number;
    order: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserType {
  id: number;
  starkKey: string;
  accountId: null;
  walletAddress: string;
  email: string;
  verifiedAt: null;
  username: string;
  referrerId: null;
  allianceId: number;
  earnedPoints: number;
  availablePoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignType {
  id: number;
  code: string;
  name: string;
  status: string;
  startedAt: string;
  endedAt: string;
  createdAt: string;
  updatedAt: string;
  missionProgress: MissionProgressType[];
}

export interface RewardType {
  id: number;
  campaignId: number;
  name: string;
  metadata: null;
  allianceIds: {
    2: string;
  };
  imageUrl: null;
  description: string;
  threshold: number;
  point: number;
  detail: string;
  status: string;
  type: string;
  expiredDate: null;
  createdAt: string;
  updatedAt: string;
  rewardStatus: string;
}

export interface CampaignDetailResponse {
  id: number;
  code: string;
  name: string;
  status: string;
  startedAt: string;
  endedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignPayload {
  code: string;
  name: string;
  status: string;
  startedAt: string;
  endedAt: string;
}

export interface SocialCampaignPayload {
  socialUserId: string;
  provider: string;
  channelId: string;
  missionCode: string;
}

export interface TwitterCampaignPayload {
  walletAddress: string;
  missionCode: string;
}

export interface UserCampaignResponse extends UserType {}

export interface RegisterUserCampaignPayload {
  starkKey: string;
  walletAddress: string;
  accountId: string;
  username: string | undefined;
  email: string | undefined;
  referrerId?: number;
}

export interface RegisterUserCampaignResponse extends UserType {}

export interface RegisterUserL2WalletPayload {
  starkKey: string;
  walletAddress: string;
  accountId: string;
  username: string;
  email: string;
  referrerId: number;
  signature: {
    r: string;
    s: string;
  };
}

export interface RegisterUserL2WalletResponse {}

export interface UserAlliancesResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  imageUrl: null;
  createdAt: string;
  updatedAt: string;
}

export interface MissionCompletePayload {
  campaignId: number;
  missionId: number;
}

export interface MissionCompleteResponse {
  userId: string;
  campaignId: string;
  referrerId: null;
  earnedPoints: number;
  availablePoints: number;
  wallet_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterCampaignPayload {
  userId: string;
  campaignId: string;
}

export interface RegisterCampaignResponse {
  userId: number;
  campaignId: number;
  referrerId: null;
  earnedPoints: number;
  availablePoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserAlliancePayload {
  allianceId: number;
}

export interface UpdateUserAllianceResponse extends UserType {}

export interface VerifyEmailOfUserResponse extends UserType {}

export interface UserByWalletAddressResponse {}

export interface UserProfileCampaignResponse {
  userId: number;
  campaignId: number;
  referrerId: null;
  earnedPoints: number;
  availablePoints: number;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  campaign: CampaignType;
  rewards: RewardType[];
}

export interface ListAlliancesResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  imageUrl: null;
  createdAt: string;
  updatedAt: string;
}

export interface RewardByCampaignIdResponse {}

export interface RewardClaimDiscordPayload {
  userId: number | undefined;
  discordAccessCode: string;
  campaignCode: string;
  missionCode: string;
}

export interface RewardClaimDiscordResponse {}

export interface RewardUserClaimPayload {
  rewardId: number;
  userId: number;
}

export interface RewardUserClaimResponse {}
