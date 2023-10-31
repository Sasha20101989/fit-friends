import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';

import { PaymentMethod } from './types/payment-method.enum.js';
import { PurchaseType } from './types/purchase-type.enum.js';
import { TrainingEntity } from '../training/training.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface OrderEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'orders'
  },
  options: {
    allowMixed: 0
  }
})

export class OrderEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public purchaseType!: PurchaseType;

  @prop({ ref: TrainingEntity, required: true })
  public training!: Ref<TrainingEntity>;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public totalAmount!: number;

  @prop({ required: true })
  public paymentMethod!: PaymentMethod;
}

export const OrderModel = getModelForClass(OrderEntity);
