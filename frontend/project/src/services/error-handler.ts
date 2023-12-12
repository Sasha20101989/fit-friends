import { InternalAxiosRequestConfig } from 'axios';
import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';

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
  constraints: AnyObject;
}

interface AnyObject {
  [key: string]: string;
}

export function showToast<T extends AnyObject>(obj: T): void {
  let message = '';

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      message += `${key}: ${value} `;
    }
  }

  if (message.trim() !== '') {
    toast.warn<string>(message.trim());
  }
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
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.CONFLICT]: true,
};

export const shouldDisplayError = (response: CustomResponse) => !!StatusCodeMapping[response.status];

export interface ParsedResponse {
  errorMessage: string;
}
