import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://dev.myriaverse-api.nonprod-myria.com/v1',
    timeout: 10000,
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