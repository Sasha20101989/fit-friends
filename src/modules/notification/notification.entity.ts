
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { NotificationType } from '../../types/notification-type.type.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface NotificationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'notifications'
  },
  options: {
    allowMixed: 0
  }
})

export class NotificationEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public user!: Ref<UserEntity>;

  @prop({ required: true })
  public text!: string;

  @prop({ required: true })
  public type!: NotificationType;
}

export const NotificationModel = getModelForClass(NotificationEntity);
