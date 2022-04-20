import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://myriaverse-api-accounts-staging-696385717.us-east-1.elb.amazonaws.com/api/v0.1.0',
    timeout: 1000,
    headers: {
        "accept": "application/json",
        "Content-type": "application/json"
    }
});


apiClient.interceptors.request.use(
    async function (config) {
        // Todo: get cached token
        const token = "";
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return error;
    },
);

export default apiClient;