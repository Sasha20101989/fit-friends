import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { TrainerServiceInterface } from './trainer-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { PASSWORD_CONSTRAINTS } from '.././user/user.const.js';
import { TrainerEntity } from './trainer.entity.js';
import CreateTrainerDto from './dto/create-trainer.dto.js';

@injectable()
export default class TrainerService implements TrainerServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.TrainerModel) private readonly trainerModel: types.ModelType<TrainerEntity>
  ) {}

  public async create(dto: CreateTrainerDto, salt: string): Promise<DocumentType<TrainerEntity>> {
    const trainer = new TrainerEntity(dto);

    if (dto.password.length < PASSWORD_CONSTRAINTS.MIN_LENGTH || dto.password.length > PASSWORD_CONSTRAINTS.MAX_LENGTH) {
      throw new Error(`Password should be between ${PASSWORD_CONSTRAINTS.MIN_LENGTH} and ${PASSWORD_CONSTRAINTS.MAX_LENGTH} characters.`);
    }

    trainer.setPassword(dto.password, salt);

    const result = await this.trainerModel.create(trainer);
    this.logger.info(`New trainer created: ${trainer.email} and name ${trainer.name}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<TrainerEntity> | null> {
    return this.trainerModel.findOne({email});
  }

  public async findOrCreate(dto: CreateTrainerDto, salt: string): Promise<DocumentType<TrainerEntity>> {
    const existedTrainer = await this.findByEmail(dto.email);

    if (existedTrainer) {
      return existedTrainer;
    }

    return this.create(dto, salt);
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.trainerModel.exists({ _id: documentId }).then((v) => v !== null);
  }
}
