import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const timeout = 60000;
import get from 'lodash/get';
import { web3Modal } from './context/wallet';
import { localStorageKeys } from './configs';

export const createService = (baseURL?: string, headers?: object): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, headers));
};

const baseConfig = (baseURL?: string, headers?: object) => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-type': 'application/json',
      ...headers
    },
    withCredentials: true,
    timeout
  };
};

const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const statusCode = get(error, 'response.status');
      if (statusCode === 401) {
        if (localStorage?.getItem(localStorageKeys.walletAddress)) {
          web3Modal?.clearCachedProvider();
          localStorage.removeItem(localStorageKeys.walletAddress);
          localStorage.removeItem(localStorageKeys.starkKey);
          localStorage.removeItem(localStorageKeys.userCampaignId);
        }
      }
      return Promise.reject(get(error, 'response.data.message') || get(error, 'message'));
    }
  );
  return instance;
};
