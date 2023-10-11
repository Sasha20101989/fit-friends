import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { UserEntity } from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import type {UserServiceInterface} from './user-service.interface.js';
import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import { PASSWORD_CONSTRAINTS } from './user.const.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);

    if (dto.password.length < PASSWORD_CONSTRAINTS.MIN_LENGTH || dto.password.length > PASSWORD_CONSTRAINTS.MAX_LENGTH) {
      throw new Error(`Password should be between ${PASSWORD_CONSTRAINTS.MIN_LENGTH} and ${PASSWORD_CONSTRAINTS.MAX_LENGTH} characters.`);
    }

    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email} and name ${user.name}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.userModel.exists({ _id: documentId }).then((v) => v !== null);
  }
}
