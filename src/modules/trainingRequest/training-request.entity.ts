
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';

import { RequestStatus } from './types/request-status.enum.js';
import { RequestType } from './types/request-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { TrainerEntity } from '../trainer/trainer.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface TrainingRequestEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'requests'
  },
  options: {
    allowMixed: 0
  }
})

export class TrainingRequestEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public initiator!: Ref<UserEntity>;

  @prop({ required: true, ref: () => UserEntity })
  public user!: Ref<UserEntity> | Ref<TrainerEntity>;

  @prop({ required: true })
  public status!: RequestStatus;

  @prop({ required: true })
  public requestType!: RequestType;
}

export const TrainingRequestModel = getModelForClass(TrainingRequestEntity);
