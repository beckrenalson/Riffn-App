import axios from 'axios';

export const API_URL = import.meta.env.VITE_RIFFN_API || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL + '/api',
  withCredentials: true, // If your API uses cookies/sessions
});

export const USERS_ENDPOINT = `/users`;
export const INSTRUMENTS_ENDPOINT = `/instruments`;
export const SUBGENRES_ENDPOINT = `/subgenres`;

export default api;
