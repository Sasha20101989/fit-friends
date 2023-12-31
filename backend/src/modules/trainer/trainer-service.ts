import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import type { TokenServiceInterface } from '../token/token-service.interface.js';
import type { TrainerServiceInterface } from './trainer-service.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { PASSWORD_CONSTRAINTS } from '.././user/user.const.js';
import { TrainerEntity } from './trainer.entity.js';
import CreateTrainerDto from './dto/create-trainer.dto.js';
import { VerifyUserResponse } from '../user/response/verify-user.response.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import UpdateTrainerDto from './dto/update-trainer.dto.js';


@injectable()
export default class TrainerService implements TrainerServiceInterface {
  constructor(
    @inject(AppComponent.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
    @inject(AppComponent.TrainerModel) private readonly trainerModel: types.ModelType<TrainerEntity>
  ) {}

  public async create(dto: CreateTrainerDto, saltRounds: number): Promise<VerifyUserResponse<TrainerEntity>> {
    if (dto.password.length < PASSWORD_CONSTRAINTS.MIN_LENGTH || dto.password.length > PASSWORD_CONSTRAINTS.MAX_LENGTH) {
      throw new Error(`Password should be between ${PASSWORD_CONSTRAINTS.MIN_LENGTH} and ${PASSWORD_CONSTRAINTS.MAX_LENGTH} characters.`);
    }

    const trainer = new TrainerEntity(dto);
    await trainer.setPassword(dto.password, saltRounds);

    const trainerResult = await this.trainerModel.create(trainer);

    const tokens = this.tokenService.generateTokens({...dto, id: trainerResult.id, role: trainerResult.role});
    await this.tokenService.saveRefreshToken(trainerResult.id, tokens.refreshToken);

    return {user: trainerResult, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
  }

  public async findByEmail(email: string): Promise<DocumentType<TrainerEntity> | null> {
    return await this.trainerModel.findOne({email});
  }

  public async findById(trainerId: string): Promise<DocumentType<TrainerEntity> | null> {
    return await this.trainerModel.findById(trainerId);
  }

  public async exists(documentId: string): Promise<boolean> {
    return await this.trainerModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async updateById(trainerId: MongoId, dto: UpdateTrainerDto): Promise<DocumentType<TrainerEntity> | null> {
    return await this.trainerModel
      .findByIdAndUpdate(trainerId, dto, {new: true})
      .exec();
  }
}
