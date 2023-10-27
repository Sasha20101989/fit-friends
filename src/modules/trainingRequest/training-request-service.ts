import { RequestType } from './../../types/request-type.enum';

import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { TrainingRequestServiceInterface } from './training-request-service.interface.js';
import { TrainingRequestEntity } from './training-request.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateTrainingRequestDto from './dto/create-training-request.dto.js';
import { MongoId } from '../../types/mongo-id.type.js';
import UpdateTrainingRequestDto from './dto/update-training-request.dto.js';
import { RequestStatus } from '../../types/request-status.enum.js';

@injectable()
export default class TrainingRequestService implements TrainingRequestServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.TrainingRequestModel) private readonly trainingRequestModel: types.ModelType<TrainingRequestEntity>
    ){}

  public async updateStatus(dto: UpdateTrainingRequestDto, requestId: MongoId): Promise<DocumentType<TrainingRequestEntity> | null> {
    const existingRequest = await this.trainingRequestModel
      .findById({_id: requestId})
      .populate(['user', 'initiator']);

    if(existingRequest){
      if(dto.status === existingRequest.status){
        return existingRequest;
      }

      const updatedRequest = await this.trainingRequestModel
        .findByIdAndUpdate(requestId, dto, {new: true})
        .populate(['user', 'initiator'])
        .exec();

      return updatedRequest;
    }

    return null;
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.trainingRequestModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public existsRequestByType(initiatorId: MongoId, userId: MongoId, requestType: RequestType): Promise<boolean> {
    return this.trainingRequestModel.exists({initiator: initiatorId, user: userId, requestType: requestType}).then((v) => v !== null);
  }

  public async create(dto: CreateTrainingRequestDto, initiatorId: MongoId, userId: MongoId, requestStatus: RequestStatus): Promise<DocumentType<TrainingRequestEntity>> {
    const request = await this.trainingRequestModel.create({...dto, initiator: initiatorId, user: userId, status: requestStatus});
    this.logger.info('Request created')
    return await request.populate(['user', 'initiator']);
  }
}
