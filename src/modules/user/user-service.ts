import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { UserEntity } from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import type {UserServiceInterface} from './user-service.interface.js';
import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import { PASSWORD_CONSTRAINTS } from './user.const.js';
import LoginUserDto from './dto/login-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { MongoId } from '../../types/mongo-id.type.js';
import { TokenServiceInterface } from '../token/token-service.interface.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(AppComponent.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
  ) {}

  public async updateById(userId: MongoId, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async create(dto: CreateUserDto, salt: string): Promise<{user: DocumentType<UserEntity>; refreshToken: string}> {
    if (dto.password.length < PASSWORD_CONSTRAINTS.MIN_LENGTH || dto.password.length > PASSWORD_CONSTRAINTS.MAX_LENGTH) {
      throw new Error(`Password should be between ${PASSWORD_CONSTRAINTS.MIN_LENGTH} and ${PASSWORD_CONSTRAINTS.MAX_LENGTH} characters.`);
    }

    const user = new UserEntity(dto);
    await user.setPassword(dto.password, salt);

    const userResult = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email} and name ${user.name}`);

    const tokens = this.tokenService.generateTokens({...userResult});
    await this.tokenService.saveToken(userResult.id, tokens.refreshToken);

    this.logger.info(`New refresh token for user: ${userResult.id} created`);

    return {user: userResult, refreshToken: tokens.refreshToken};
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.userModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async verifyUser(dto: LoginUserDto): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    const ifPasswordVerified = await user.verifyPassword(dto.password);

    if (ifPasswordVerified) {
      return user;
    }

    return null;
  }
}
