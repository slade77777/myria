import { campaignApiClient } from '../client';

const callCampaignHealthCheck = () => {
  return campaignApiClient.get('/healthCheck');
};

export { callCampaignHealthCheck };
