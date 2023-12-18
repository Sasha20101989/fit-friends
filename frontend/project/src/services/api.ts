
import axios, {AxiosInstance} from 'axios';
import {Token, getAccessToken, getRefreshToken, updateAccessToken} from './token';
import { APIRoute } from '../const';
import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';
import { ApiErrorType, CustomError, ParsedResponse, parseResponse, shouldDisplayError, showToast } from './error-handler';

const BACKEND_URL = 'http://localhost:4000';
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

  async function handleExpiredTokenError(error: CustomError) {
    if (error.response && shouldDisplayError(error.response)) {
      const parsedResponse: ParsedResponse | undefined = parseResponse(error.response);
      if(parsedResponse){
        if (parsedResponse.errorMessage === ApiErrorType.JWTExpired) {
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
              handleRefreshError(refreshError as CustomError);
            }
          }
        }else{
          toast.warn(parsedResponse.errorMessage);
        }
      }
    }
  }

  function handleRefreshError(refreshError: CustomError) {
    if (refreshError.response && shouldDisplayError(refreshError.response)) {
      const parsedResponse: ParsedResponse | undefined = parseResponse(refreshError.response);
      if (parsedResponse?.errorMessage === ApiErrorType.InvalidRefreshToken) {
        toast.warn(parsedResponse.errorMessage);
        document.cookie = `${Token.Access}=; path=/;`;
        localStorage.removeItem(Token.Refresh);
      }
    }
  }

  api.interceptors.response.use(
    (response) => response,
    async (error: CustomError) => {
      if(error.response){
        if (error.response.status !== StatusCodes.UNAUTHORIZED &&
          error.response.status !== StatusCodes.CONFLICT &&
          error.response.status !== StatusCodes.NOT_FOUND &&
          error.response.data
        ) {
          const matchesValues = error.response.data.map((item) => item.constraints);

          matchesValues.forEach((matchesValue) => {
            showToast(matchesValue);
          });
          return api(error.response);
        } else {
          await handleExpiredTokenError(error);
        }
      }
    }
  );

  return api;
};
