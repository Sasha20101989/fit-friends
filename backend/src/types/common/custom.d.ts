import { TokenPayload } from '../token-payload.js';

declare module 'express-serve-static-core' {
  export interface Request {
    user: TokenPayload;
  }
}
