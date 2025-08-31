import axios from 'axios';

export const API_URL = import.meta.env.VITE_RIFFN_API || "http://localhost:5000";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // This is the new line
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

        // If the error is 401 and it's not a refresh token request
        if (error.response.status === 401 && originalRequest.url !== '/auth/refresh-token') {
            // If a refresh is already in progress, add to queue
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
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
                        const newToken = res.data.token; // Assuming the new token is returned in res.data.token
                        // You might not need to set the token in headers here since it's an HTTP-only cookie.
                        // The browser will automatically send the new 'jwt' cookie with subsequent requests.
                        processQueue(null, newToken);
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        resolve(api(originalRequest));
                    })
                    .catch(err => {
                        processQueue(err);
                        // Redirect to login or handle logout
                        window.location = '/login'; // Or your specific logout route
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
