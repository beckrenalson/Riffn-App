import axios from 'axios';

export const API_URL = import.meta.env.VITE_RIFFN_API || "http://localhost:5000";

const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Skip refresh for auth endpoints
        const skipRefresh = originalRequest.url.includes('/auth/login') ||
            originalRequest.url.includes('/auth/register') ||
            originalRequest.url.includes('/auth/users/passkey-login-challenge');

        if (skipRefresh) {
            return Promise.reject(error);
        }

        // If the error is 401 and it's not a refresh token request
        if (error.response.status === 401 && originalRequest.url !== '/auth/refresh-token') {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            isRefreshing = true;

            return new Promise((resolve, reject) => {
                api.post('/auth/refresh-token')
                    .then(res => {
                        const newToken = res.data.token;
                        processQueue(null, newToken);
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        resolve(api(originalRequest));
                    })
                    .catch(err => {
                        processQueue(err);
                        window.location = '/login'; // Redirect to login
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export const USERS_ENDPOINT = `/users`;
export const INSTRUMENTS_ENDPOINT = `/instruments`;
export const SUBGENRES_ENDPOINT = `/subgenres`;

export default api;
