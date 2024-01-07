import { InternalAxiosRequestConfig } from 'axios';
import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';
import { ApplicationError } from '../types/application-error.enum';
import { ValidationErrorField } from '../types/error';

export interface CustomError {
  response?: CustomResponse;
  message?: string;
  config: InternalAxiosRequestConfig;
}

export interface CustomResponse {
  status: number;
  statusText: string;
  data: CustomResponseData;
}

export interface CustomResponseData {
  details: ValidationErrorField[];
  error: string;
  errorType: ApplicationError;
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
  JWSSignatureVerificationFailed = 'JWSSignatureVerificationFailed',
  InvalidRefreshToken = 'Invalid Refresh Token',
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.CONFLICT]: true,
  [StatusCodes.EXPECTATION_FAILED]: true,
};

export const shouldDisplayError = (response: CustomResponse) => !!StatusCodeMapping[response.status];

export interface ParsedResponse {
  errorMessage: string;
}
