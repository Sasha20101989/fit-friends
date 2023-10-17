import { DocumentType } from '@typegoose/typegoose';

export type VerifyUserResponse<T> = {
  user: DocumentType<T> | null;
  accessToken: string;
  refreshToken: string;
};
