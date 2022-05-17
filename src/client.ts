import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.myria.com'
});

export const additionalApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADDITIONAL_API_URL,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json'
  }
});

export default apiClient;
