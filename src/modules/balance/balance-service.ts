import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { BalanceServiceInterface } from './balance-service.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { BalanceEntity } from './balance.entity.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import CreateBalanceDto from './dto/create-balance.dto.js';
import UpdateBalanceDto from './dto/update-balance.dto.js';
import { DEFAULT_BALANCE_COUNT } from './balance.const.js';
import { BalanceQueryParams } from './types/balance-query-params.js';
import { getSortOptionsForCreatedAt } from '../../core/helpers/index.js';

@injectable()
export default class BalanceService implements BalanceServiceInterface{
  constructor(
    @inject(AppComponent.BalanceModel) private readonly balanceModel: types.ModelType<BalanceEntity>,

  ) {}

  public async exists(trainingId: MongoId): Promise<boolean> {
    return this.balanceModel.exists({ training: trainingId }).then((v) => v !== null);
  }

  public async create(dto: CreateBalanceDto, userId: MongoId, trainingId: MongoId): Promise<DocumentType<BalanceEntity>> {
    const result = await this.balanceModel.create({...dto, user: userId, training: trainingId});
    return await result.populate({ path: 'training', populate: { path: 'trainer' } });
  }

  public async updateBalance(dto: UpdateBalanceDto, trainingId: MongoId): Promise<DocumentType<BalanceEntity> | null> {
    const { availableQuantity } = dto;
    const existingBalance = await this.balanceModel
      .findOne({ training: trainingId })
      .populate({ path: 'training', populate: { path: 'trainer' } });

    if (existingBalance) {
      existingBalance.availableQuantity = availableQuantity;
      await existingBalance.save();
      return existingBalance;
    }

    return null;
  }

  public async findByUserId(userId: MongoId, query: BalanceQueryParams): Promise<DocumentType<BalanceEntity>[]>{
    const balanceLimit = Math.min(query?.limit || DEFAULT_BALANCE_COUNT, DEFAULT_BALANCE_COUNT);
    const page = query?.page || 1;
    const skip = (page - 1) * balanceLimit;

    const sort = getSortOptionsForCreatedAt(query.sortDirection);

    const balance = await this.balanceModel
      .find({ user: userId})
      .sort(sort)
      .skip(skip)
      .limit(balanceLimit)
      .populate({ path: 'training', populate: { path: 'trainer' } });

    return balance;
  }

  public async deleteBalance(trainingId: MongoId): Promise<void> {
    await this.balanceModel.deleteOne({ training: trainingId }).exec();
  }
}
