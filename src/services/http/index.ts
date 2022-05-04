import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  async function (config) {
    // MOCK token
    if (config.headers) {
      config.headers.Authorization = 'a8792317-dd49-4ae9-b874-5803c74bcd50';
    }
    return config;
  },
  function (error) {
    return error;
  }
);

export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common.Authorization = token;
};

export default apiClient;
