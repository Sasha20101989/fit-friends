import { DocumentType } from '@typegoose/typegoose';

import CreateTrainerDto from './dto/create-trainer.dto.js';
import { TrainerEntity } from './trainer.entity.js';

export interface TrainerServiceInterface {
  create(dto: CreateTrainerDto, salt: string): Promise<DocumentType<TrainerEntity>>;
  findByEmail(email: string): Promise<DocumentType<TrainerEntity> | null>;
  findOrCreate(dto: CreateTrainerDto, salt: string): Promise<DocumentType<TrainerEntity>>;
  exists(documentId: string): Promise<boolean>;
}
