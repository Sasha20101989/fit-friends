import axios, {AxiosInstance} from 'axios';
import {getToken} from './token';

const BACKEND_URL = 'http://localhost:4000';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (config.headers) {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
