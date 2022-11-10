import { createService } from './axios';

const Klaviyo = require('node-klaviyo');

import axios, { AxiosError } from 'axios';

const timeout = 60000;

export interface IResponseError {
  httpCode: number | undefined;
  errors: [{ code: string; title: string; detail: string }];
}

export function mapError(error: AxiosError): IResponseError {
  return {
    httpCode: error.response?.status,
    errors: error.response?.data.errors ?? []
  };
}

const apiClient = createService(process.env.NEXT_PUBLIC_API_URL);

export const noCacheApiClient = createService(process.env.NEXT_PUBLIC_API_URL, {
  'Cache-Control': 'no-cache'
});

export const salesforceAPIClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SALESFORCE_URL,
  timeout,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json'
  }
});

export const klaviyoClient = new Klaviyo({
  publicToken: process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_TOKEN,
  privateToken: process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_TOKEN
});

export const additionalApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADDITIONAL_API_URL,
  timeout,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json'
  }
});

export const campaignApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL,
  timeout,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json',
    'x-api-key': `${process.env.NEXT_PUBLIC_CAMPAIGN_API_KEY}`
  }
});

// export const devApiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_DEV_API_URL,
//   timeout,
//   headers: {
//     accept: 'application/json',
//     'Content-type': 'application/json'
//   }
// });

export default apiClient;
