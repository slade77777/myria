import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import get from 'lodash/get';
import { web3Modal } from './context/wallet';
import { localStorageKeys } from './configs';

const timeout = 60000;

export const createService = (baseURL?: string, headers?: object): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, headers));
};

const baseConfig = (baseURL?: string, headers?: object) => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache',
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
      const prevRequest = error?.config;
      if (statusCode === 401 && prevRequest.url !== '/accounts/token') {
        const refreshToken = localStorage.getItem(localStorageKeys.refreshToken);
        if (refreshToken) {
          try {
            await instance.get('/accounts/token');
            return instance(prevRequest);
          } catch (e) {
            clearStorage();
            throw new Error('Cannot refresh token');
          }
        } else {
          clearStorage();
        }
      }
      return Promise.reject(get(error, 'response.data.message') || get(error, 'message'));
    }
  );
  return instance;
};

export function clearStorage() {
  web3Modal?.clearCachedProvider();
  localStorage.removeItem(localStorageKeys.walletAddress);
  localStorage.removeItem(localStorageKeys.starkKey);
  localStorage.removeItem(localStorageKeys.userCampaignId);
  localStorage.removeItem(localStorageKeys.refreshToken);
}
