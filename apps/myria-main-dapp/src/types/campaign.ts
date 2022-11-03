export interface CampaignResponseType<T> {
  status: string;
  data: T;
}

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
  userId: string;
  username: string;
  email: string;
  referrerId: number;
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
  userId: number;
  campaignId: number;
  referrerId: null;
  earnedPoints: number;
  availablePoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterCampaignPayload {
  userId: number;
  campaignId: number;
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
  socialUserId: string;
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
