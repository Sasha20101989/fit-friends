import { DocumentType } from '@typegoose/typegoose';

import type { UserQueryParams } from './types/user-query-params.js';
import type { MongoId } from '../../types/common/mongo-id.type.js';
import { UserEntity } from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { VerifyUserResponse } from './response/verify-user.response.js';
import CreateTrainerDto from '../trainer/dto/create-trainer.dto.js';

export interface UserServiceInterface {
  logout(refreshToken: string): Promise<void>;
  create(dto: CreateUserDto | CreateTrainerDto, saltRounds: number): Promise<VerifyUserResponse<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  verifyUser(dto: LoginUserDto, saltRounds: number): Promise<VerifyUserResponse<UserEntity> | null>;
  updateById(userId: MongoId, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  refresh(refreshToken: string, dto: LoginUserDto): Promise<VerifyUserResponse<UserEntity> | null>;
  GetAllUsers(query: UserQueryParams): Promise<DocumentType<UserEntity>[]>;
  findById(userId: MongoId): Promise<DocumentType<UserEntity> | null>;
}
