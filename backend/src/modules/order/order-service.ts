import {DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/common/app-component.enum.js';
import { OrderServiceInterface } from './order-service.interface.js';
import { OrderEntity } from './order.entity.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { Sorting } from '../../types/sorting.enum.js';
import { OrderQueryParams } from './types/order-query-params.js';
import { OrderSortingField } from './types/order-sorting-field.enum.js';
import TrainingOrderRdo from './rdo/training-order.rdo.js';
import { TrainingServiceInterface } from '../training/training-service.interface.js';
import { calculateSum } from '../../core/helpers/index.js';
import { TrainingEntity } from '../training/training.entity.js';
import { DEFAULT_ORDER_COUNT } from './order.const.js';
import { MongoId } from '../../types/common/mongo-id.type.js';

@injectable()
export default class OrderService implements OrderServiceInterface {
  constructor(
    @inject(AppComponent.OrderModel) private readonly orderModel: ModelType<OrderEntity>,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
  ){}

  public async create(dto: CreateOrderDto, training: DocumentType<TrainingEntity>, userId: MongoId): Promise<DocumentType<OrderEntity> | null> {
    const totalAmount = training.price * dto.quantity;
    const result = await this.orderModel.create({...dto, totalAmount, training: training.id, price: training.price, user: userId});
    return result.populate({ path: 'training', populate: { path: 'trainer' } });
  }

  private sortTrainingInfoList(trainingInfoList: TrainingOrderRdo[], query: OrderQueryParams): TrainingOrderRdo[] {
    const sortType = query.sortOrder || Sorting.Ascending;

    if (query.typeOrder === OrderSortingField.PurchasedQuantity) {
      trainingInfoList.sort((a, b) => {
        if (sortType === Sorting.Ascending) {
          return (a.purchasedQuantity || 0) - (b.purchasedQuantity || 0);
        } else {
          return (b.purchasedQuantity || 0) - (a.purchasedQuantity || 0);
        }
      });
    } else if (query.typeOrder === OrderSortingField.TotalSalesAmount) {
      trainingInfoList.sort((a, b) => {
        if (sortType === Sorting.Ascending) {
          return (a.totalSalesAmount || 0) - (b.totalSalesAmount || 0);
        } else {
          return (b.totalSalesAmount || 0) - (a.totalSalesAmount || 0);
        }
      });
    }
    return trainingInfoList;
  }

  public async findByTrainerId(trainerId: MongoId, query: OrderQueryParams): Promise<TrainingOrderRdo[]> {
    const trainingInfoList: TrainingOrderRdo[] = [];
    const orderLimit = Math.min(query.limit || DEFAULT_ORDER_COUNT, DEFAULT_ORDER_COUNT);
    const page = query?.page || 1;
    const skip = (page - 1) * orderLimit;

    const trainings = await this.trainingService.findByTrainerId(trainerId);

    for (const training of trainings) {
      const trainingOrders = await this.findByTrainingId(training.id);
      const purchasedQuantity = calculateSum(trainingOrders, (order) => order.quantity);
      const totalSalesAmount = calculateSum(trainingOrders, (order) => order.totalAmount);
      const trainingInfo: TrainingOrderRdo = { ...training.toObject(), purchasedQuantity, totalSalesAmount, training: training.id};
      trainingInfoList.push(trainingInfo);
    }

    if(query.typeOrder){
      const sortedTrainingInfoList: TrainingOrderRdo[] = this.sortTrainingInfoList(trainingInfoList, query);
      return sortedTrainingInfoList;
    }

    trainingInfoList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return trainingInfoList.slice(skip, skip + orderLimit);
  }

  public async exists(documentId: MongoId): Promise<boolean> {
    return await this.orderModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async findByTrainingId(trainingId: MongoId): Promise<DocumentType<OrderEntity>[]> {
    return await this.orderModel.find({ training: trainingId }).populate('training');
  }
}
