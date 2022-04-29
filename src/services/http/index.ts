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
      config.headers.Authorization = '2789bb16-6e89-4d67-a841-3cd883fe140a';
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
