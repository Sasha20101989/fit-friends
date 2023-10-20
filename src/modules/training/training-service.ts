import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { TrainingServiceInterface } from './training-service.interface.js';
import { TrainingEntity } from './training.entity.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';

@injectable()
export default class TrainingService implements TrainingServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.TrainingModel) private readonly trainingModel: types.ModelType<TrainingEntity>
    ){}

    public async exists(documentId: string): Promise<boolean> {
      return this.trainingModel.exists({ _id: documentId }).then((v) => v !== null);
    }

    public async create(dto: CreateTrainingDto): Promise<DocumentType<TrainingEntity>> {
      const training = await this.trainingModel.create(dto);
      this.logger.info(`New training created: ${dto.name}`);
      return training;
    }

    public getTrainingDetails(trainingId: string): Promise<DocumentType<TrainingEntity> | null> {
      return this.trainingModel
      .findById(trainingId)
      .populate(['trainer'])
      .exec();
    }
}
