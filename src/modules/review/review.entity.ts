
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { TrainingEntity } from '../training/training.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface ReviewEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'reviews'
  },
  options: {
    allowMixed: 0
  }
})

export class ReviewEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public user!: Ref<UserEntity[]>;

  @prop({ required: true, ref: TrainingEntity })
  public training!: Ref<TrainingEntity>;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public text!: string;
}

export const ReviewModel = getModelForClass(ReviewEntity);
