import {DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import type { MongoId } from '../../types/common/mongo-id.type.js';
import type {UserServiceInterface} from './user-service.interface.js';
import type { TokenServiceInterface } from '../token/token-service.interface.js';
import type { UserQueryParams } from './types/user-query-params.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { UserEntity } from './user.entity.js';
import { DEFAULT_USER_COUNT, PASSWORD_CONSTRAINTS } from './user.const.js';
import LoginUserDto from './dto/refresh-token.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import CreateUserDto from './dto/create-user.dto.js';
import { VerifyUserResponse } from './response/verify-user.response.js';
import { Sorting } from '../../types/sorting.enum.js';
import { Role } from '../../types/role.enum.js';
import { UserFilter } from './types/user-filter.type.js';
import { TrainerEntity } from '../trainer/trainer.entity.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { applyLocationFilter, applyTrainingLevelFilter, applyWorkoutTypeFilter, getSortOptionsForCreatedAt } from '../../core/helpers/index.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.UserModel) private readonly userModel: ModelType<UserEntity>,
    @inject(AppComponent.TrainerModel) private readonly trainerModel: ModelType<TrainerEntity>,
    @inject(AppComponent.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
  ) {}

  public async findUserOrTrainerById(userId: string): Promise<DocumentType<UserEntity> | DocumentType<TrainerEntity> | null> {
    const foundedUser = await this.userModel.findOne({ _id: userId});
    if(foundedUser?.role === Role.User){
      return foundedUser;
    }

    return await this.trainerModel.findOne({ _id: userId});
  }

  public async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeToken(refreshToken);
  }

  public async updateById(userId: MongoId, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    const filteredBody = { ...dto };
    delete filteredBody.role;
    delete filteredBody.email;
    delete filteredBody.password;

    return this.userModel
      .findByIdAndUpdate(userId, filteredBody, {new: true})
      .exec();
  }

  public async refreshAccessToken(refreshToken: string): Promise<string | null>{
    if(!refreshToken){
      return null;
    }
    const decodedRefreshToken = await this.tokenService.decodeRefreshToken(refreshToken);

    if(!decodedRefreshToken){
      return null;
    }

    return this.tokenService.updateAccessToken(decodedRefreshToken);
  }

  public async create(dto: CreateUserDto, saltRounds: number): Promise<VerifyUserResponse<UserEntity>> {
    if (dto.password.length < PASSWORD_CONSTRAINTS.MIN_LENGTH || dto.password.length > PASSWORD_CONSTRAINTS.MAX_LENGTH) {
      throw new Error(`Password should be between ${PASSWORD_CONSTRAINTS.MIN_LENGTH} and ${PASSWORD_CONSTRAINTS.MAX_LENGTH} characters.`);
    }

    const user = new UserEntity(dto);
    await user.setPassword(dto.password, saltRounds);

    const userResult = await this.userModel.create(user);

    const tokens = this.tokenService.generateTokens({...dto, id: userResult.id, role: userResult.role});
    await this.tokenService.saveRefreshToken(userResult.id, tokens.refreshToken);

    return {user: userResult, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.userModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async verifyUser(dto: LoginUserDto): Promise<VerifyUserResponse<UserEntity> | null> {
    if(!dto.email || !dto.password){
      return null;
    }

    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    const ifPasswordVerified = await user.verifyPassword(dto.password);

    if (ifPasswordVerified) {

      const tokens = this.tokenService.generateTokens({...dto, id: user.id, role: user.role});
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

      return {user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
    }

    return null;
  }

  public async GetAllUsers(query: UserQueryParams): Promise<DocumentType<UserEntity>[]>{
    const filter: UserFilter = {};
    let sort: { [key: string]: Sorting } = {};
    const userLimit = Math.min(query.limit || DEFAULT_USER_COUNT, DEFAULT_USER_COUNT);
    const page = query.page || 1;
    const skip = (page - 1) * userLimit;

    applyLocationFilter(query, filter);
    applyWorkoutTypeFilter(query, filter);
    applyTrainingLevelFilter(query, filter);

    if (query.sortBy && Object.values(Role).includes(query.sortBy)) {
      sort['role'] = (query.sortBy === Role.User) ? Sorting.Ascending : Sorting.Descending;
    } else {
      sort = getSortOptionsForCreatedAt(query.createdAtDirection);
    }

    const users = await this.userModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(userLimit);
    return users;
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ _id: userId});
  }
}
