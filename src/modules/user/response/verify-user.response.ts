import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../user.entity.js';

export type VerifyUserResponse = {
  user: DocumentType<UserEntity> | null;
  accessToken: string;
  refreshToken: string;
};
