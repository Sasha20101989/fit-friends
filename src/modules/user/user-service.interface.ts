import { DocumentType } from '@typegoose/typegoose';

import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import LoginUserDto from './dto/login-user.dto.js';
import { MongoId } from '../../types/mongo-id.type.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { VerifyUserResponse } from './response/verify-user.response.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<VerifyUserResponse>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<VerifyUserResponse | null>;
  updateById(userId: MongoId, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
}
