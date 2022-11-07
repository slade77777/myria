import {
  CampaignDetailResponse,
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
  return await campaignApiClient.get('/healthCheck');
};

/**
 * CampaignsDetailById
 * @Returns
 */
const reqGetCampaignsDetailById = async (
  campaignId: number
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.get(`/campaigns/${campaignId}`);
};

/**
 * CampaignsDetailByCode
 * @Returns
 */
const reqGetCampaignsDetailByCode = async (
  campaignCode: string
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.get(`/campaigns/code/${campaignCode}`);
};

/**
 * CreateCampaigns
 * @Returns
 */
const reqCreateCampaigns = async (
  payload: CreateCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.post(`/campaigns`, payload);
};

/**
 * createSocialCampaigns
 * @Returns
 */
const reqCreateSocialCampaigns = async (
  payload: SocialCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.post(`/campaigns/social-event`, payload);
};

/**
 * createTwitterCampaigns
 * @Returns
 */
const reqCreateTwitterCampaigns = async (
  payload: TwitterCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.post(`/campaigns/twitter-events`, payload);
};

/**
 * Get User by Id
 * @Returns
 */
const reqGetUserCampaigns = async (
  userId: number
): Promise<CampaignResponseType<UserCampaignResponse>> => {
  return await campaignApiClient.get(`/users/${userId}`);
};

/**
 * Get User Campaign by StarkKey
 * @Returns
 */
const reqGetUserCampaignsByStarkKey = async (
  starkKey: number
): Promise<CampaignResponseType<UserCampaignResponse>> => {
  return await campaignApiClient.get(`/users/stark-key/${starkKey}`);
};

/**
 * register User
 * @Returns
 */
const reqRegisterUserCampaign = async (
  payload: RegisterUserCampaignPayload
): Promise<CampaignResponseType<RegisterUserCampaignResponse>> => {
  return await campaignApiClient.post(`/users`, payload);
};

/**
 *  Alliances Of User
 * @Returns
 */
const reqGetUserAlliances = async (
  walletAddress: string
): Promise<CampaignResponseType<UserAlliancesResponse>> => {
  return await campaignApiClient.get(`/users/wallet-address/${walletAddress}`);
};

/**
 * register User L2 Wallet
 * @Returns
 */
const reqRegisterUserL2Wallet = async (
  payload: RegisterUserL2WalletPayload
): Promise<CampaignResponseType<RegisterUserL2WalletResponse>> => {
  return await campaignApiClient.post(`/users/l2/wallet`, payload);
};

/**
 * missionComplete
 * @Returns
 */
const reqMissionComplete = async (
  userId: number,
  payload: MissionCompletePayload
): Promise<CampaignResponseType<MissionCompleteResponse>> => {
  return await campaignApiClient.patch(`/users/${userId}/completed-mission`, payload);
};

/**
 * register Campaign
 * @Returns
 */
const reqRegisterCampaign = async (
  payload: RegisterCampaignPayload
): Promise<CampaignResponseType<MissionCompleteResponse>> => {
  return await campaignApiClient.post(`/users/register-campaign`, payload);
};

/**
 * Update alliances of user
 * @Returns
 */
const reqUpdateUserAlliance = async (
  userId: number,
  payload: UpdateUserAlliancePayload
): Promise<CampaignResponseType<UpdateUserAllianceResponse>> => {
  return await campaignApiClient.patch(`/users/${userId}/alliances`, payload);
};

/**
 * Verify Email Of User
 * @Returns
 */
const reqVerifyEmailOfUser = async (
  userId: number,
  missionCode: string
): Promise<CampaignResponseType<UpdateUserAllianceResponse>> => {
  return await campaignApiClient.patch(`/users/${userId}/verify-email`, missionCode);
};

/**
 * getUserByWalletAddress
 * @Returns
 */
const reqGetUserByWalletAddress = async (
  walletAddress: string
): Promise<CampaignResponseType<UserType>> => {
  return await campaignApiClient.get(`/users/wallet-address/${walletAddress}`);
};

/**
 * getUserProfileCampaign
 * @Returns
 */
const reqGetUserProfileCampaign = async (
  userId: string,
  campaignId: string
): Promise<CampaignResponseType<UserProfileCampaignResponse>> => {
  return await campaignApiClient.get(`/users/${userId}/campaign-id/${campaignId}`);
};

/**
 * getListAlliances
 * @Returns
 */
const reqGetListAlliances = async (): Promise<CampaignResponseType<ListAlliancesResponse>> => {
  return await campaignApiClient.get(`/alliances`);
};

/**
 * getRewardByCampaignId
 * @Returns
 */
const reqGetRewardByCampaignId = async (
  campaignId: string
): Promise<CampaignResponseType<RewardByCampaignIdResponse>> => {
  return await campaignApiClient.get(`/campaign-id/${campaignId}`);
};

/**
 * rewardClaimDiscord
 * @Returns
 */
const reqRewardClaimDiscord = async (
  payload: RewardClaimDiscordPayload
): Promise<CampaignResponseType<RewardClaimDiscordResponse>> => {
  return await campaignApiClient.post(`/rewards/discord/claim`, payload);
};

/**
 * rewardUserClaim
 * @Returns
 */
const reqRewardUserClaim = async (
  payload: RewardUserClaimPayload
): Promise<CampaignResponseType<RewardUserClaimResponse>> => {
  const result = await campaignApiClient.post(`/rewards/user-claim`, payload);
  return result.data;
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
