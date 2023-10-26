
import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { NotifyServiceInterface } from './notify-service.interface.js';
import { NotifyEntity } from './notify.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateNotifyDto from './dto/create-notify.dto.js';
import { MongoId } from './../../types/mongo-id.type';

@injectable()
export default class NotifyService implements NotifyServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.NotifyModel) private readonly notifyModel: types.ModelType<NotifyEntity>
    ){}

  public async create(dto: CreateNotifyDto, salt: string): Promise<DocumentType<NotifyEntity>> {
    throw new Error('Method not implemented.');
  }

  public async findById(notifyId: string): Promise<DocumentType<NotifyEntity> | null> {
    throw new Error('Method not implemented.');
  }

  public async exists(MongoId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
