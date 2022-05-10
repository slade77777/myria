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

export default apiClient;