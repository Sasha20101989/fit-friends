import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import { TrainingEntity } from '../training/training.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface BalanceEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'balances'
  }
})

export class BalanceEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public user!: string;

  @prop({ required: true, ref: TrainingEntity })
  public training!: Ref<TrainingEntity>;

  @prop({ required: true })
  public availableQuantity!: number;
}

export const BalanceModel = getModelForClass(BalanceEntity);

