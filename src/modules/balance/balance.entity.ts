import typegoose, { defaultClasses } from '@typegoose/typegoose';

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

  @prop({ required: true })
  public training!: string;

  @prop({ required: true })
  public availableQuantity!: number;
}

export const BalanceModel = getModelForClass(BalanceEntity);

