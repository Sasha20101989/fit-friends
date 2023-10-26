
import typegoose, { defaultClasses } from '@typegoose/typegoose';

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
  @prop({ required: true })
  public user!: string;

  @prop({ required: true })
  public training!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public text!: string;
}

export const ReviewModel = getModelForClass(ReviewEntity);
