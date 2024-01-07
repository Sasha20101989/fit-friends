import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base-user.exception.js';

export class AccessTokenException extends BaseUserException {
  constructor(message: string) {
    super(StatusCodes.EXPECTATION_FAILED, message);
  }
}
