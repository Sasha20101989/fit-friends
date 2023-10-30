import { DocumentType } from '@typegoose/typegoose';

import CreateTrainerDto from './dto/create-trainer.dto.js';
import { TrainerEntity } from './trainer.entity.js';
import { VerifyUserResponse } from '../user/response/verify-user.response.js';
import CreateUserDto from '../user/dto/create-user.dto.js';

export interface TrainerServiceInterface {
  create(dto: CreateUserDto | CreateTrainerDto, saltRounds: number): Promise<VerifyUserResponse<TrainerEntity>>;
  findByEmail(email: string): Promise<DocumentType<TrainerEntity> | null>;
  findById(trainerId: string): Promise<DocumentType<TrainerEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
