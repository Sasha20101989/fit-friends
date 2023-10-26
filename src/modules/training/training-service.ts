import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { TrainingServiceInterface } from './training-service.interface.js';
import { TrainingEntity } from './training.entity.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { MongoId } from '../../types/mongo-id.type.js';
import UpdateTrainingDto from './dto/update-training.dto.js';
import { TrainingQueryParams } from '../../types/training-query-params.js';

type TrainingFilter = {
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  rating?: number;
  workoutDuration?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
  calories?: { $gte?: number; $lte?: number };
}

@injectable()
export default class TrainingService implements TrainingServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.TrainingModel) private readonly trainingModel: types.ModelType<TrainingEntity>
    ){}

  public async exists(trainingId: MongoId): Promise<boolean> {
    return this.trainingModel.exists({ _id: trainingId }).then((v) => v !== null);
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

  public async update(trainingId: MongoId, dto: UpdateTrainingDto): Promise<DocumentType<TrainingEntity> | null> {
    return this.trainingModel
      .findByIdAndUpdate(trainingId, dto, {new: true})
      .populate(['trainer'])
      .exec();
  }

  public async GetAllTrainings(query: TrainingQueryParams): Promise<DocumentType<TrainingEntity>[]>{
    const filter: TrainingFilter = {};

    if (query.minPrice !== undefined) {
      filter.price = { $gte: query.minPrice };
    }

    if (query.maxPrice !== undefined) {
      if (!filter.price) {
        filter.price = {};
      }
      filter.price.$lte = query.maxPrice;
    }

    if (query.minCalories !== undefined) {
      filter.calories = { $gte: query.minCalories };
    }

    if (query.maxCalories !== undefined) {
      if (!filter.calories) {
        filter.calories = {};
      }
      filter.calories.$lte = query.maxCalories;
    }

    if (query.rating !== undefined) {
      filter.rating = query.rating;
    }

    if (query.workoutDuration) {
      const workoutTypesArray = query.workoutDuration.toString().toLowerCase().split(',').map(type => type.trim());
      filter.workoutDuration = { $in: workoutTypesArray };
    }

    const trainings = await this.trainingModel.find(filter).populate('trainer');
    return trainings;
  }

  public async findByTrainerId(trainerId: string): Promise<DocumentType<TrainingEntity>[]> {
    return this.trainingModel.find({ trainer: trainerId }).populate('trainer');
  }
}
