import { RequestType } from './types/request-type.enum';

import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { RequestServiceInterface } from './request-service.interface.js';
import { RequestEntity } from './request.entity.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateRequestDto from './dto/create-request.dto.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import UpdateRequestDto from './dto/update-request.dto.js';
import { RequestStatus } from './types/request-status.enum.js';

@injectable()
export default class RequestService implements RequestServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.RequestModel) private readonly requestModel: types.ModelType<RequestEntity>
  ){}

  public async findByUserId(userId: string): Promise<DocumentType<RequestEntity>[]> {
    return await this.requestModel
      .find({ user: userId})
      .populate(['user', 'initiator']);
  }

  public async updateStatus(dto: UpdateRequestDto, requestId: MongoId): Promise<DocumentType<RequestEntity> | null> {
    const existingRequest = await this.requestModel
      .findOne({_id: requestId})
      .populate(['user', 'initiator']);

    if(existingRequest){
      if(dto.status === existingRequest.status){
        return existingRequest;
      }

      const updatedRequest = await this.requestModel
        .findByIdAndUpdate(requestId, dto, {new: true})
        .populate(['user', 'initiator'])
        .exec();

      return updatedRequest;
    }

    return null;
  }

  public async exists(documentId: string): Promise<boolean> {
    return await this.requestModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async existsRequestByType(initiatorId: MongoId, userId: MongoId, requestType: RequestType): Promise<boolean> {
    return await this.requestModel.exists({initiator: initiatorId, user: userId, requestType: requestType}).then((v) => v !== null);
  }

  public async create(dto: CreateRequestDto, initiatorId: MongoId, userId: MongoId, requestStatus: RequestStatus): Promise<DocumentType<RequestEntity>> {
    const request = await this.requestModel.create({
      ...dto,
      initiator: initiatorId,
      user: userId,
      status: requestStatus,
    });

    this.logger.info('Request created');
    return await request.populate(['initiator', 'user']);
  }
}
