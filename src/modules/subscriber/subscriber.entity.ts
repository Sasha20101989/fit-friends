
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface SubscriberEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'subscribers'
  },
  options: {
    allowMixed: 0
  }
})

export class SubscriberEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public user!: Ref<UserEntity>;

  @prop({ required: true })
  public text!: string;
}

export const SubscriberModel = getModelForClass(SubscriberEntity);
