import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "accept": "application/json",
        "Content-type": "application/json"
    },
    withCredentials: true,
});


// apiClient.interceptors.request.use(
//     async function (config) {
//         // Todo: get cached token
//         const token = "";
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     function (error) {
//         return error;
//     },
// );

export default apiClient;