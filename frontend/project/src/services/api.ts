
import axios, {AxiosInstance} from 'axios';
import request from 'axios';
import {Token, getAccessToken, getRefreshToken, updateAccessToken} from './token';
import { errorHandle } from './error-handler';
import { ApiErrorType, CustomResponse, shouldDisplayError } from './error-handler.co';
import { APIRoute } from '../const';

export const BACKEND_URL = 'http://localhost:3333';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getAccessToken();

      if (config.headers) {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (request.isAxiosError(error)) {
        if (error.response && shouldDisplayError(error.response)) {
          const customResponse: CustomResponse = error.response;

          if(customResponse.data.error === ApiErrorType.JWTExpired){
            errorHandle(error);

            const refreshToken = getRefreshToken();
            if (refreshToken) {
              try {
                const response = await axios.post<Token.Access>(
                  `${BACKEND_URL}${APIRoute.RefreshToken}`,
                  { refreshToken }
                );

                updateAccessToken(response.data);

                if (error.config) {
                  const accessToken = getAccessToken();

                  error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                  return api.request(error.config);
                }
              } catch (refreshError) {
                if (request.isAxiosError(refreshError)) {
                  if (refreshError.config) {
                    if (refreshError.response && shouldDisplayError(refreshError.response)) {
                      const customRefreshResponse: CustomResponse = refreshError.response;

                      if(customRefreshResponse.data.error === ApiErrorType.InvalidRefreshToken){
                        document.cookie = `${Token.Access}=; path=/;`;
                        localStorage.removeItem(Token.Refresh);
                      }
                    }
                    return api.request(refreshError.config);
                  }
                }
              }
            }
          } else {
            errorHandle(error);
          }
        }
      }
    }
  );

  return api;
};
