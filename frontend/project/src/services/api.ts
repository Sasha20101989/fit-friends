
import axios, {AxiosInstance, AxiosError, AxiosResponse} from 'axios';
import {Token, getAccessToken, getRefreshToken, updateAccessToken} from './token';
import { APIRoute } from '../const';
import { RefreshData } from '../types/auth-data.js';
import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';

const BACKEND_URL = 'http://localhost:4000';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.FORBIDDEN]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

type ParsedResponse = {
  errorMessage: string;
  status: number;
  statusText: string;
}

function parseResponse(response: AxiosResponse): ParsedResponse {
  const errorMatch: RegExpMatchArray | null = response.data.match(/Error: (.+)<br>/);
  const errorMessage = errorMatch ? errorMatch[1].split('<br>')[0] : 'Unknown Error';

  return {
    errorMessage,
    status: response.status,
    statusText: response.statusText,
  };
}

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

  async function handleExpiredTokenError(error: AxiosError<{error: string}>) {
    if (error.response && shouldDisplayError(error.response)) {
      const parsedResponse: ParsedResponse = parseResponse(error.response);
      if (parsedResponse.errorMessage === 'JWTExpired') {
        toast.warn(parsedResponse.errorMessage);

        const refreshToken = getRefreshToken();

        if (refreshToken) {
          try {
            const response = await axios.post<Token.Access>(
              `${BACKEND_URL}${APIRoute.RefreshToken}`,
              { refreshToken }
            );

            updateAccessToken(response.data);

            const accessToken = getAccessToken();

            if (error.config && accessToken) {
              error.config.headers['Authorization'] = `Bearer ${accessToken}`;
              return api(error.config);
            }
          } catch (refreshError) {
            handleRefreshError(refreshError as AxiosError<{error: string}>);
          }
        }
      }else if(parsedResponse.status === StatusCodes.NOT_FOUND){
        toast.warn(parsedResponse.errorMessage);
      }
    }
  }

  function handleRefreshError(refreshError: AxiosError<{error: string}>) {
    const responseError = refreshError as AxiosError<{error: string}>;
    if (responseError.response && shouldDisplayError(responseError.response)) {
      const parsedResponse: ParsedResponse = parseResponse(responseError.response);
      if (parsedResponse.errorMessage === 'Invalid Refresh Token') {
        toast.warn(parsedResponse.errorMessage);
        document.cookie = `${Token.Access}=; path=/;`;
        localStorage.removeItem(Token.Refresh);
      }
    }
  }

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{error: string}>) => {
      await handleExpiredTokenError(error);
    }
  );

  return api;
};
