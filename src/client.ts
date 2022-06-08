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
