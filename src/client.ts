import axios, { AxiosError } from 'axios';

export interface IResponseError {
  httpCode: number | undefined;
  errors: [{ code: string; title: string; details: string }];
}

export function mapError(error: AxiosError): IResponseError {
  return {
    httpCode: error.response?.status,
    errors: error.response?.data.errors ?? []
  };
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json'
  },
  withCredentials: true
});

export const marketplaceApiClient = axios.create({
  baseURL: "https://dev.myriacore-marketp-api.nonprod-myria.com:443",
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json',
    'x-api-key': '0f6ef89980d8abda64605dd2d4d5fd8c16919cbade0a6d79c224adb393d3ef2a'
  },
});

export const additionalApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADDITIONAL_API_URL,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json'
  }
});

export const noCacheApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  withCredentials: true
});


export default apiClient;
