import axios from "axios";

const apiClient = axios.create({
 baseURL: 'https://api.myria.com',
});

export default apiClient;