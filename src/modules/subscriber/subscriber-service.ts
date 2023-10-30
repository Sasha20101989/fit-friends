
import {DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ModelType } from '@typegoose/typegoose/lib/types.js';

import { SubscriberServiceInterface } from './subscriber-service.interface.js';
import { SubscriberEntity } from './subscriber.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { MongoId } from '../../types/mongo-id.type.js';

@injectable()
export default class SubscriberService implements SubscriberServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.SubscriberModel) private readonly subscriberModel: ModelType<SubscriberEntity>
  ){}

  public async create(userId: MongoId, trainerId: MongoId): Promise<DocumentType<SubscriberEntity>> {
    const newSubscriber = await this.subscriberModel.create({user: userId, trainer: trainerId});
    this.logger.info('Subscriber created.');
    return newSubscriber.populate(['user', 'trainer']);
  }

  public async destroy(userId: MongoId, trainerId: MongoId): Promise<void> {
    await this.subscriberModel.deleteOne({ user: userId, trainer: trainerId });
  }

  public async exists(userId: MongoId, trainerId: MongoId): Promise<boolean> {
    return await this.subscriberModel.exists({ user: userId, trainer: trainerId }).then((v) => v !== null);
  }

  public async findByTrainerId(trainerId: MongoId): Promise<DocumentType<SubscriberEntity>[]> {
    return await this.subscriberModel.find({ trainer: trainerId }).populate(['user', 'trainer']);
  }
}
