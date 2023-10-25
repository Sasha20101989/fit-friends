import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { BalanceServiceInterface } from './balance-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { BalanceEntity } from './balance.entity.js';
import { MongoId } from '../../types/mongo-id.type.js';
import CreateBalanceDto from './dto/create-balance.dto.js';
import UpdateBalanceDto from './dto/update-balance.dto.js';

@injectable()
export default class BalanceService implements BalanceServiceInterface{
  constructor(
    @inject(AppComponent.BalanceModel) private readonly balanceModel: types.ModelType<BalanceEntity>,

  ) {}

  public async exists(trainingId: MongoId): Promise<boolean> {
    return this.balanceModel.exists({ training: trainingId }).then((v) => v !== null);
  }

  public async create(dto: CreateBalanceDto, userId: MongoId): Promise<DocumentType<BalanceEntity>> {
    const result = await this.balanceModel.create({...dto, user: userId});
    return result;
  }

  public async updateBalance(dto: UpdateBalanceDto): Promise<DocumentType<BalanceEntity> | null> {
    const { training, availableQuantity } = dto;
    const existingBalance = await this.balanceModel.findOne({ training: training });

    if (existingBalance) {
      existingBalance.availableQuantity = availableQuantity;
      await existingBalance.save();
      return existingBalance;
    }

    return null;
  }

  public async findByUserId(userId: MongoId): Promise<DocumentType<BalanceEntity>[]>{
    const balance = await this.balanceModel.find({ user: userId}).populate('training');
    return balance;
  }

  public async deleteBalance(trainingId: MongoId): Promise<void> {
    await this.balanceModel.deleteOne({ training: trainingId }).exec();
  }
}
