import axios from 'axios';

import {NETWORK} from '~/constants/network';
import {logInfo} from '~/utils/Logger';

const axiosInstance = axios.create({
    baseURL: NETWORK.BASE_URL,
    timeout: NETWORK.REQUEST_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async config => {
        logInfo('*** request URL', config.url);
        logInfo('*** request', config.data);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    async response => {
        logInfo('*** response', JSON.stringify(response.data));
        return response.data;
    },
    async error => {
        logInfo('*** response error', error.response);
        return Promise.reject(error?.response);
    },
);

export default axiosInstance;
