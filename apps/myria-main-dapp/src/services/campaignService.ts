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
const getCampaignsDetailById = async (
  campaignId: number
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.get(`/campaigns/${campaignId}`);
};

/**
 * CampaignsDetailByCode
 * @Returns
 */
const getCampaignsDetailByCode = async (
  campaignCode: string
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.get(`/campaigns/code/${campaignCode}`);
};

/**
 * CreateCampaigns
 * @Returns
 */
const createCampaigns = async (
  payload: CreateCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.post(`/campaigns`, payload);
};

/**
 * createSocialCampaigns
 * @Returns
 */
const createSocialCampaigns = async (
  payload: SocialCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.post(`/campaigns/social-event`, payload);
};

/**
 * createTwitterCampaigns
 * @Returns
 */
const createTwitterCampaigns = async (
  payload: TwitterCampaignPayload
): Promise<CampaignResponseType<CampaignDetailResponse>> => {
  return await campaignApiClient.post(`/campaigns/twitter-events`, payload);
};

/**
 * Get User by Id
 * @Returns
 */
const getUserCampaigns = async (
  userId: number
): Promise<CampaignResponseType<UserCampaignResponse>> => {
  return await campaignApiClient.get(`/users/${userId}`);
};

/**
 * Get User Campaign by StarkKey
 * @Returns
 */
const getUserCampaignsByStarkKey = async (
  starkKey: number
): Promise<CampaignResponseType<UserCampaignResponse>> => {
  return await campaignApiClient.get(`/users/stark-key/${starkKey}`);
};

/**
 * register User
 * @Returns
 */
const registerUserCampaign = async (
  payload: RegisterUserCampaignPayload
): Promise<CampaignResponseType<RegisterUserCampaignResponse>> => {
  return await campaignApiClient.post(`/users`, payload);
};

/**
 *  Alliances Of User
 * @Returns
 */
const getUserAlliances = async (
  walletAddress: string
): Promise<CampaignResponseType<UserAlliancesResponse>> => {
  return await campaignApiClient.get(`/users/wallet-address/${walletAddress}`);
};

/**
 * register User L2 Wallet
 * @Returns
 */
const registerUserL2Wallet = async (
  payload: RegisterUserL2WalletPayload
): Promise<CampaignResponseType<RegisterUserL2WalletResponse>> => {
  return await campaignApiClient.post(`/users/l2/wallet`, payload);
};

/**
 * missionComplete
 * @Returns
 */
const missionComplete = async (
  userId: number,
  payload: MissionCompletePayload
): Promise<CampaignResponseType<MissionCompleteResponse>> => {
  return await campaignApiClient.patch(`/users/${userId}/completed-mission`, payload);
};

/**
 * register Campaign
 * @Returns
 */
const registerCampaign = async (
  payload: RegisterCampaignPayload
): Promise<CampaignResponseType<MissionCompleteResponse>> => {
  return await campaignApiClient.post(`/users/register-campaign`, payload);
};

/**
 * Update alliances of user
 * @Returns
 */
const updateUserAlliance = async (
  userId: number,
  payload: UpdateUserAlliancePayload
): Promise<CampaignResponseType<UpdateUserAllianceResponse>> => {
  return await campaignApiClient.patch(`/users/${userId}/alliances`, payload);
};

/**
 * Verify Email Of User
 * @Returns
 */
const verifyEmailOfUser = async (
  userId: number,
  missionCode: string
): Promise<CampaignResponseType<UpdateUserAllianceResponse>> => {
  return await campaignApiClient.patch(`/users/${userId}/verify-email`, missionCode);
};

/**
 * getUserByWalletAddress
 * @Returns
 */
const getUserByWalletAddress = async (
  walletAddress: string
): Promise<CampaignResponseType<UserType>> => {
  return await campaignApiClient.get(`/users/wallet-address/${walletAddress}`);
};

/**
 * getUserProfileCampaign
 * @Returns
 */
const getUserProfileCampaign = async (
  userId: string,
  campaignId: string
): Promise<CampaignResponseType<UserProfileCampaignResponse>> => {
  return await campaignApiClient.get(`/users/${userId}/campaign-id/${campaignId}`);
};

/**
 * getListAlliances
 * @Returns
 */
const getListAlliances = async (): Promise<CampaignResponseType<ListAlliancesResponse>> => {
  return await campaignApiClient.get(`/alliances`);
};

/**
 * getRewardByCampaignId
 * @Returns
 */
const getRewardByCampaignId = async (
  campaignId: string
): Promise<CampaignResponseType<RewardByCampaignIdResponse>> => {
  return await campaignApiClient.get(`/campaign-id/${campaignId}`);
};

/**
 * rewardClaimDiscord
 * @Returns
 */
const rewardClaimDiscord = async (
  payload: RewardClaimDiscordPayload
): Promise<CampaignResponseType<RewardClaimDiscordResponse>> => {
  return await campaignApiClient.post(`/rewards/discord/claim`, payload);
};

/**
 * rewardUserClaim
 * @Returns
 */
const rewardUserClaim = async (
  payload: RewardUserClaimPayload
): Promise<CampaignResponseType<RewardUserClaimResponse>> => {
  return await campaignApiClient.post(`/rewards/user-claim`, payload);
};

export {
  callCampaignHealthCheck,
  getCampaignsDetailById,
  getCampaignsDetailByCode,
  createCampaigns,
  createSocialCampaigns,
  createTwitterCampaigns,
  getUserCampaigns,
  getUserCampaignsByStarkKey,
  registerUserCampaign,
  registerUserL2Wallet,
  getUserAlliances,
  missionComplete,
  registerCampaign,
  updateUserAlliance,
  verifyEmailOfUser,
  getUserProfileCampaign,
  getListAlliances,
  getRewardByCampaignId,
  rewardClaimDiscord,
  rewardUserClaim,
  getUserByWalletAddress
};
