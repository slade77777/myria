import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
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