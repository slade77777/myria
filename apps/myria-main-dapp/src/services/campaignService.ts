import {
  CampaignDetailResponse,
  CampaignDiscordResponseType,
  CampaignResponseType,
  CreateCampaignPayload,
  ListAlliancesResponse,
  MissionCompletePayload,
  MissionCompleteResponse,
  RegisterCampaignPayload,
  RegisterUserCampaignPayload,
  RegisterUserCampaignResponse,
  RegisterUserL2WalletPayload,
  RegisterUserL2WalletResponse,
  RewardByCampaignIdResponse,
  RewardClaimDiscordError,
  RewardClaimDiscordPayload,
  RewardClaimDiscordResponse,
  RewardUserClaimPayload,
  RewardUserClaimResponse,
  SocialCampaignPayload,
  TwitterCampaignPayload,
  UpdateUserAlliancePayload,
  UpdateUserAllianceResponse,
  UserAlliancesResponse,
  UserCampaignResponse,
  UserProfileCampaignResponse,
  UserType
} from 'src/types/campaign';
import { campaignApiClient } from '../client';

/**
 * healthCheck
 * @Returns
 */

const callCampaignHealthCheck = async () => {
  try {
    const result = await campaignApiClient.get('/healthCheck');
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * CampaignsDetailById
 * @Returns
 */
const reqGetCampaignsDetailById = async (
  campaignId: number
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  try {
    if (!campaignId) {
      throw new Error('CampaignId is required');
    }
    const result = await campaignApiClient.get(`/campaigns/${campaignId}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * CampaignsDetailByCode
 * @Returns
 */
const reqGetCampaignsDetailByCode = async (
  campaignCode: string
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  try {
    if (!campaignCode) {
      throw new Error('CampaignCode is required');
    }
    const result = await campaignApiClient.get(`/campaigns/code/${campaignCode}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * CreateCampaigns
 * @Returns
 */
const reqCreateCampaigns = async (
  payload: CreateCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  try {
    if (!payload.code) {
      throw new Error('Code is required');
    }
    if (!payload.name) {
      throw new Error('Name is required');
    }
    if (!payload.status) {
      throw new Error('Status is required');
    }
    if (!payload.endedAt) {
      throw new Error('EndedAt is required');
    }
    if (!payload.startedAt) {
      throw new Error('StartedAt is required');
    }
    const result = await campaignApiClient.post(`/campaigns`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * createSocialCampaigns
 * @Returns
 */
const reqCreateSocialCampaigns = async (
  payload: SocialCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  try {
    if (!payload.channelId) {
      throw new Error('ChannelId is required');
    }
    if (!payload.missionCode) {
      throw new Error('MissionCode is required');
    }
    if (!payload.provider) {
      throw new Error('Provider is required');
    }
    if (!payload.socialUserId) {
      throw new Error('SocialUserId is required');
    }
    const result = await campaignApiClient.post(`/campaigns/social-event`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * createTwitterCampaigns
 * @Returns
 */
const reqCreateTwitterCampaigns = async (
  payload: TwitterCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  try {
    if (!payload.missionCode) {
      throw new Error('MissionCode is required');
    }
    if (!payload.walletAddress) {
      throw new Error('WalletAddress is required');
    }
    const result = await campaignApiClient.post(`/campaigns/twitter-events`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * Get User by Id
 * @Returns
 */
const reqGetUserCampaigns = async (
  userId: number
): Promise<CampaignResponseType<UserCampaignResponse>> => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }
    const result = await campaignApiClient.get(`/users/${userId}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * Get User Campaign by StarkKey
 * @Returns
 */
const reqGetUserCampaignsByStarkKey = async (
  starkKey: number
): Promise<CampaignResponseType<UserCampaignResponse>> => {
  try {
    if (!starkKey) {
      throw new Error('StarkKey is required');
    }
    const result = await campaignApiClient.get(`/users/stark-key/${starkKey}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * register User
 * @Returns
 */
const reqRegisterUserCampaign = async (
  payload: RegisterUserCampaignPayload
): Promise<CampaignResponseType<RegisterUserCampaignResponse>> => {
  try {
    if (!payload.starkKey) {
      throw new Error('StarkKey is required');
    }
    if (!payload.walletAddress) {
      throw new Error('WalletAddress is required');
    }
    if (!payload.accountId) {
      throw new Error('AccountId is required');
    }
    const result = await campaignApiClient.post(`/users`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 *  Alliances Of User
 * @Returns
 */
const reqGetUserAlliances = async (
  walletAddress: string
): Promise<CampaignResponseType<UserAlliancesResponse>> => {
  try {
    if (!walletAddress) {
      throw new Error('WalletAddress is required');
    }
    const result = await campaignApiClient.get(`/users/wallet-address/${walletAddress}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * register User L2 Wallet
 * @Returns
 */
const reqRegisterUserL2Wallet = async (
  payload: RegisterUserL2WalletPayload
): Promise<CampaignResponseType<RegisterUserL2WalletResponse>> => {
  try {
    if (!payload.starkKey) {
      throw new Error('StarkKey is required');
    }
    if (!payload.walletAddress) {
      throw new Error('WalletAddress is required');
    }
    if (!payload.accountId) {
      throw new Error('AccountId is required');
    }
    if (!payload.signature) {
      throw new Error('Signature is required');
    }
    const result = await campaignApiClient.post(`/users/l2/wallet`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * missionComplete
 * @Returns
 */
const reqMissionComplete = async (
  userId: number,
  payload: MissionCompletePayload
): Promise<CampaignResponseType<MissionCompleteResponse>> => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }
    if (!payload.campaignId) {
      throw new Error('CampaignId is required');
    }
    if (!payload.missionId) {
      throw new Error('MissionId is required');
    }
    const result = await campaignApiClient.patch(`/users/${userId}/completed-mission`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * register Campaign
 * @Returns
 */
const reqRegisterCampaign = async (
  payload: RegisterCampaignPayload
): Promise<CampaignResponseType<MissionCompleteResponse>> => {
  try {
    if (!payload.userId) {
      throw new Error('UserId is required');
    }
    const result = await campaignApiClient.post(`/users/register-campaign`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * Update alliances of user
 * @Returns
 */
const reqUpdateUserAlliance = async (
  userId: number,
  payload: UpdateUserAlliancePayload
): Promise<CampaignResponseType<UpdateUserAllianceResponse>> => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }
    if (!payload.allianceId) {
      throw new Error('AllianceId is required');
    }
    const result = await campaignApiClient.patch(`/users/${userId}/alliances`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * Verify Email Of User
 * @Returns
 */
const reqVerifyEmailOfUser = async (
  userId: number
): Promise<CampaignResponseType<UpdateUserAllianceResponse>> => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }
    const result = await campaignApiClient.patch(`/users/${userId}/verify-email`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * getUserByWalletAddress
 * @Returns
 */
const reqGetUserByWalletAddress = async (
  walletAddress: string,
  campaignId?: string
): Promise<CampaignResponseType<UserType>> => {
  try {
    if (!walletAddress) {
      throw new Error('WalletAddress is required');
    }
    const result = await campaignApiClient.get(`/users/wallet-address/${walletAddress}`, {
      params: { campaignId }
    });
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * getUserProfileCampaign
 * @Returns
 */
const reqGetUserProfileCampaign = async (
  userId: string,
  campaignId: string
): Promise<CampaignResponseType<UserProfileCampaignResponse>> => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }
    if (!campaignId) {
      throw new Error('CampaignId is required');
    }
    const result = await campaignApiClient.get(`/users/${userId}/campaign-id/${campaignId}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * getListAlliances
 * @Returns
 */
const reqGetListAlliances = async (): Promise<CampaignResponseType<ListAlliancesResponse>> => {
  try {
    const result = await campaignApiClient.get(`/alliances`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * getRewardByCampaignId
 * @Returns
 */
const reqGetRewardByCampaignId = async (
  campaignId: string
): Promise<CampaignResponseType<RewardByCampaignIdResponse>> => {
  try {
    if (!campaignId) {
      throw new Error('CampaignId is required');
    }
    const result = await campaignApiClient.get(`/rewards/campaign-id/${campaignId}`);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

/**
 * rewardClaimDiscord
 * @Returns
 */
const reqRewardClaimDiscord = async (
  payload: RewardClaimDiscordPayload
): Promise<CampaignDiscordResponseType<RewardClaimDiscordResponse, RewardClaimDiscordError[]>> => {
  try {
    if (!payload.campaignCode) {
      throw new Error('CampaignCode is required');
    }
    if (!payload.discordAccessCode) {
      throw new Error('Discord AccessCode is required');
    }
    if (!payload.missionCode) {
      throw new Error('Mission Code is required');
    }
    if (!payload.userId) {
      throw new Error('UserId is required');
    }
    const result = await campaignApiClient.post(`/rewards/discord/claim`, payload);
    return result.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * rewardUserClaim
 * @Returns
 */
const reqRewardUserClaim = async (
  payload: RewardUserClaimPayload
): Promise<CampaignResponseType<RewardUserClaimResponse>> => {
  try {
    if (!payload.rewardId) {
      throw new Error('RewardId is required');
    }
    if (!payload.userId) {
      throw new Error('UserId is required');
    }
    const result = await campaignApiClient.post(`/rewards/user-claim`, payload);
    return result.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
};

export {
  callCampaignHealthCheck,
  reqGetCampaignsDetailById,
  reqGetCampaignsDetailByCode,
  reqCreateCampaigns,
  reqCreateSocialCampaigns,
  reqCreateTwitterCampaigns,
  reqGetUserCampaigns,
  reqGetUserCampaignsByStarkKey,
  reqRegisterUserCampaign,
  reqRegisterUserL2Wallet,
  reqGetUserAlliances,
  reqMissionComplete,
  reqRegisterCampaign,
  reqUpdateUserAlliance,
  reqVerifyEmailOfUser,
  reqGetUserProfileCampaign,
  reqGetListAlliances,
  reqGetRewardByCampaignId,
  reqRewardClaimDiscord,
  reqRewardUserClaim,
  reqGetUserByWalletAddress
};
