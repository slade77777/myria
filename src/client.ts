import axios, { AxiosError } from "axios";
export interface IResponseError {
    httpCode: number | undefined;
    errors: [{ code: string; title: string; detail: string }]
}

const apiClient = axios.create({
    baseURL: 'https://dev.myriaverse-api.myria.com/v1/',
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

export function mapError(error: AxiosError): IResponseError {
    return {
        httpCode: error.response?.status,
        errors: error.response?.data.errors ?? []
    };
}

export default apiClient;