import {DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/common/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
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

@injectable()
export default class OrderService implements OrderServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OrderModel) private readonly orderModel: ModelType<OrderEntity>,
    @inject(AppComponent.TrainingServiceInterface) private readonly trainingService: TrainingServiceInterface,
  ){}

  public async create(dto: CreateOrderDto, training: DocumentType<TrainingEntity>): Promise<DocumentType<OrderEntity> | null> {
    const totalAmount = training.price * dto.quantity;
    const result = await this.orderModel.create({...dto, totalAmount, training: training.id, price: training.price});
    this.logger.info(`New order created: ${dto.purchaseType}`);
    return result;
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

  public async findByTrainerId(trainerId: string, query: OrderQueryParams, _limit?: number): Promise<TrainingOrderRdo[]> {
    const trainingInfoList: TrainingOrderRdo[] = [];
    const orderLimit = Math.min(query.limit || DEFAULT_ORDER_COUNT, DEFAULT_ORDER_COUNT);
    const page = query?.page || 1;
    const skip = (page - 1) * orderLimit;

    const trainings = await this.trainingService.findByTrainerId(trainerId);

    for (const training of trainings) {
      const trainingOrders = await this.findByTrainingId(training.id);
      const purchasedQuantity = calculateSum(trainingOrders, (order) => order.quantity);
      const totalSalesAmount = calculateSum(trainingOrders, (order) => order.totalAmount);
      const trainingInfo: TrainingOrderRdo = { ...training.toObject(), purchasedQuantity, totalSalesAmount };
      trainingInfoList.push(trainingInfo);
    }

    if(query.typeOrder){
      const sortedTrainingInfoList: TrainingOrderRdo[] = this.sortTrainingInfoList(trainingInfoList, query);
      return sortedTrainingInfoList;
    }

    trainingInfoList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return trainingInfoList.slice(skip, skip + orderLimit);
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.orderModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async findByTrainingId(trainingId: string): Promise<DocumentType<OrderEntity>[]> {
    return this.orderModel.find({ training: trainingId }).populate('training');
  }
}
