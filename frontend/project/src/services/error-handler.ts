import request from 'axios';
import {toast} from 'react-toastify';
import {ErrorType, ValidationErrorField} from '../types/error';
import {HTTP_CODE} from '../const';
import { CustomResponse } from './error-handler.co.js';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    const customResponse: CustomResponse = response;

    switch (customResponse.status) {
      case HTTP_CODE.BAD_REQUEST:
        (customResponse.data.details.length !== 0)
          ? customResponse.data.details
            .forEach(
              (detail: ValidationErrorField) =>
                detail.messages
                  .forEach(
                    (message: string) => toast.info(message),
                  ),
            )
          : toast.info(customResponse.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.info(customResponse.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(customResponse.data.error);
        break;
      case HTTP_CODE.CONFLICT:
        toast.info(customResponse.data.error);
        break;
      case HTTP_CODE.FORBIDDEN:
        toast.info(customResponse.data.error);
        break;
    }
  }
};
