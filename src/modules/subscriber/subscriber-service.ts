
import {DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ModelType } from '@typegoose/typegoose/lib/types.js';

import { SubscriberServiceInterface } from './subscriber-service.interface.js';
import { SubscriberEntity } from './subscriber.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateSubscriberDto from './dto/create-subscriber.dto.js';

@injectable()
export default class SubscriberService implements SubscriberServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.SubscriberModel) private readonly subscriberModel: ModelType<SubscriberEntity>
  ){}

  public async create(dto: CreateSubscriberDto): Promise<DocumentType<SubscriberEntity>> {
    const newSubscriber = this.subscriberModel.create(dto);
    this.logger.info('Subscriber created.');
    return newSubscriber;
  }

  public async destroy(id: string): Promise<void> {
    await this.subscriberModel.deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<DocumentType<SubscriberEntity> | null> {
    return await this.subscriberModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: SubscriberEntity): Promise<DocumentType<SubscriberEntity> | null> {
    return await this.subscriberModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<DocumentType<SubscriberEntity> | null> {
    return await this.subscriberModel
      .findOne({ email })
      .exec()
  }
}
