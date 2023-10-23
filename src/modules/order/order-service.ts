import {DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OrderServiceInterface } from './order-service.interface.js';
import { OrderEntity } from './order.entity.js';
import CreateOrderDto from './dto/create-order.dto.js';
import { TrainerEntity } from '../trainer/trainer.entity.js';
import { TrainingEntity } from '../training/training.entity.js';

@injectable()
export default class OrderService implements OrderServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OrderModel) private readonly orderModel: ModelType<OrderEntity>,
    @inject(AppComponent.TrainerModel) private readonly trainerModel: ModelType<TrainerEntity>,
    @inject(AppComponent.TrainingModel) private readonly trainingModel: ModelType<TrainingEntity>,
    ){}

  public async create(dto: CreateOrderDto): Promise<DocumentType<OrderEntity>> {
    const order = await this.orderModel.create(dto);
    this.logger.info(`New order created: ${dto.purchaseType}`);
    return order;
  }

  // public async findByTrainerId(trainerId: string): Promise<DocumentType<TrainingEntity>[]> {
  //   const trainer = await this.trainerModel.findOne({ _id: trainerId }).exec();

  //   const orders = await this.orderModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'trainings',
  //         localField: 'training',
  //         foreignField: '_id',
  //         as: 'trainingInfo',
  //       },
  //     },
  //     {
  //       $match: {
  //         'trainingInfo.trainer': trainer?._id,
  //       },
  //     },
  //   ]).exec();

  //   await this.orderModel.populate(orders, {path: 'training'});

  //   const trainings = orders.map(order => order.training);

  //   await this.trainingModel.populate(trainings, {path: 'trainer'});

  //   return trainings;
  // }



  public async findByTrainerId(trainerId: string): Promise<object[]> {
    const trainer = await this.trainerModel.findOne({ _id: trainerId }).exec();
    const trainingInfoList = [];

    if (trainer) {
        const trainings = await this.trainingModel.find({ trainer: trainer._id }).populate('trainer').exec();

        for (const training of trainings) {
            const orders = await this.orderModel.find({ training: training._id }).populate('training').exec();
            const purchasedQuantity = orders.reduce((total, order) => total + order.quantity, 0);
            const totalSalesAmount = orders.reduce((total, order) => total + order.totalAmount, 0);
            const trainingInfo = { ...training.toObject(), purchasedQuantity, totalSalesAmount };
            trainingInfoList.push(trainingInfo);
        }
    }

    return trainingInfoList;
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.orderModel.exists({ _id: documentId }).then((v) => v !== null);
  }
}
