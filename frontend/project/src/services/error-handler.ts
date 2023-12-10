import { InternalAxiosRequestConfig } from 'axios';
import {StatusCodes} from 'http-status-codes';

export interface CustomError {
  response?: CustomResponse;
  message?: string;
  config: InternalAxiosRequestConfig;
}

export interface CustomResponse {
  status: number;
  data?: CustomResponseData[];
}

export interface CustomResponseData {
  target: {
    description: string;
    trainingLevel: string;
    gender: string;
    workoutTypes: string[];
    personalTraining: boolean;
    name: string;
  };
  value: string;
  property: string;
  children: never[];
  constraints: {
    matches: string;
  };
}

export function parseResponse(response: CustomResponse): ParsedResponse | undefined {
  if (typeof response.data === 'string') {
    const parsedData = response.data as string;
    const errorMatch: RegExpMatchArray | null = parsedData.match(/Error: (.+)<br>/);
    const errorMessage = errorMatch ? errorMatch[1].split('<br>')[0] : 'Unknown Error';

    return { errorMessage };
  }
}

export enum ApiErrorType {
  JWTExpired = 'JWTExpired',
  InvalidRefreshToken = 'Invalid Refresh Token',
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.FORBIDDEN]: true
};

export const shouldDisplayError = (response: CustomResponse) => !!StatusCodeMapping[response.status];

export interface ParsedResponse {
  errorMessage: string;
}
