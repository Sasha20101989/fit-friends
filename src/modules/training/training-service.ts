import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { TrainingServiceInterface } from './training-service.interface.js';
import { TrainingEntity } from './training.entity.js';
import CreateTrainingDto from './dto/create-training.dto.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import UpdateTrainingDto from './dto/update-training.dto.js';
import { TrainingQueryParams } from './types/training-query-params.js';
import { SubscriberServiceInterface } from '../subscriber/subscriber-service.interface.js';
import { Subscriber } from '../subscriber/types/subscriber.interface.js';
import { RabbitRouting } from '../../types/rabbit-routing.enum.js';
import { RabbitClientInterface } from '../../core/rabbit-client/rabit-client.interface.js';
import { User } from '../user/types/user.interface.js';
import { Sorting } from '../../types/sorting.enum.js';
import { WorkoutDuration } from '../../types/workout-duration.enum.js';

type TrainingFilter = {
  trainer: string;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  rating?: number;
  workoutDuration?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
  calories?: { $gte?: number; $lte?: number };
  workoutType?: { $in: string[] };
  sortByPrice?: Sorting;
}

@injectable()
export default class TrainingService implements TrainingServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.TrainingModel) private readonly trainingModel: types.ModelType<TrainingEntity>,
    @inject(AppComponent.SubscriberServiceInterface) private readonly subscriberService: SubscriberServiceInterface,
    @inject(AppComponent.RabbitClientInterface) private readonly rabbitClient: RabbitClientInterface
  ){}

  public async exists(trainingId: MongoId): Promise<boolean> {
    return await this.trainingModel.exists({ _id: trainingId }).then((v) => v !== null);
  }

  public async create(dto: CreateTrainingDto): Promise<DocumentType<TrainingEntity>> {
    const training = await this.trainingModel.create(dto);
    this.logger.info(`New training created: ${dto.name}`);

    return training.populate(['trainer']);
  }

  public async getTrainingDetails(trainingId: string): Promise<DocumentType<TrainingEntity> | null> {
    return await this.trainingModel.findOne({ _id: trainingId}).populate(['trainer']);
  }

  public async update(trainingId: MongoId, dto: UpdateTrainingDto): Promise<DocumentType<TrainingEntity> | null> {
    return await this.trainingModel
      .findByIdAndUpdate(trainingId, dto, {new: true})
      .populate(['trainer'])
      .exec();
  }

  public async find(query: TrainingQueryParams, trainerId: MongoId): Promise<DocumentType<TrainingEntity>[]>{
    const filter: TrainingFilter = { trainer: trainerId };
    const sort: { [key: string]: Sorting } = {};

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
      const rating = parseInt(query.rating, 10);
      if(Number.isInteger(rating) && rating >= 0 && rating <= 5){
        filter.rating = rating;
      }
    }

    if (query.workoutDuration) {
      const workoutDurationsArray = query.workoutDuration.toString().toLowerCase().split(',').map((duration) => duration.trim());

      const durationFilters: { [key in WorkoutDuration]: string } = {
        [WorkoutDuration.Short]: WorkoutDuration.Short,
        [WorkoutDuration.Medium]: WorkoutDuration.Medium,
        [WorkoutDuration.Long]: WorkoutDuration.Long,
        [WorkoutDuration.ExtraLong]: WorkoutDuration.ExtraLong,
      };

      const filterValues = workoutDurationsArray
        .filter((selectedDuration) => durationFilters[selectedDuration as WorkoutDuration])
        .map((selectedDuration) => durationFilters[selectedDuration as WorkoutDuration]);

      filter.workoutDuration = { $in: filterValues };
    }

    if (query.workoutType) {
      const workoutTypesArray = query.workoutType.toString().toLowerCase().split(',').map((type) => type.trim());
      filter.workoutType = { $in: workoutTypesArray };
    }

    let queryResult = this.trainingModel.find(filter).populate('trainer');

    if (query.sortByPrice) {
      if (query.sortByPrice === Sorting.Ascending) {
        sort['price'] = Sorting.Ascending;
      } else {
        sort['price'] = Sorting.Descending;
      }

      queryResult = queryResult.sort(sort);
    }

    const trainings = await queryResult;
    return trainings;
  }

  public async findByTrainerId(trainerId: MongoId): Promise<DocumentType<TrainingEntity>[]> {
    return await this.trainingModel.find({ trainer: trainerId }).populate('trainer');
  }

  public async findById(documentId: MongoId): Promise<DocumentType<TrainingEntity> | null> {
    return await this.trainingModel.findOne({ _id: documentId }).populate('trainer');
  }

  public async sendTrainingNotifications(trainerId: string, training: DocumentType<TrainingEntity>): Promise<void>{
    const subscribes = await this.subscriberService.findByTrainerId(trainerId);
    const users: User[] = subscribes.map((subscribe) => {
      return subscribe.user as User;
    });

    for (const user of users) {
      const notification: Subscriber = {
        user: user,
        text: `New training created: ${training.name}`,
      };

      await this.rabbitClient.produce(RabbitRouting.AddTraining, notification);
    }
  }
}
