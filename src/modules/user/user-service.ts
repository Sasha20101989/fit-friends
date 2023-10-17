import {DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import type { MongoId } from '../../types/mongo-id.type.js';
import type {UserServiceInterface} from './user-service.interface.js';
import type { TokenServiceInterface } from '../token/token-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { UserEntity } from './user.entity.js';
import { PASSWORD_CONSTRAINTS } from './user.const.js';
import LoginUserDto from './dto/login-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import CreateUserDto from './dto/create-user.dto.js';
import { VerifyUserResponse } from './response/verify-user.response.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(AppComponent.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
  ) {}

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

  public async refresh(refreshToken: string, dto: LoginUserDto): Promise<VerifyUserResponse<UserEntity> | null>{
    if(!refreshToken){
      return null;
    }
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);

    if(!userData || !tokenFromDb){
      return null;
    }

    const user = await this.findByEmail(userData.email);

    if(!user){
      return null;
    }

    const tokens = this.tokenService.generateTokens({...dto, id: user.id, role: user.role});
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
  }

  public async create(dto: CreateUserDto, salt: string): Promise<VerifyUserResponse<UserEntity>> {
    if (dto.password.length < PASSWORD_CONSTRAINTS.MIN_LENGTH || dto.password.length > PASSWORD_CONSTRAINTS.MAX_LENGTH) {
      throw new Error(`Password should be between ${PASSWORD_CONSTRAINTS.MIN_LENGTH} and ${PASSWORD_CONSTRAINTS.MAX_LENGTH} characters.`);
    }

    const user = new UserEntity(dto);
    await user.setPassword(dto.password, salt);

    const userResult = await this.userModel.create(user);

    const tokens = this.tokenService.generateTokens({...dto, id: userResult.id, role: userResult.role});
    await this.tokenService.saveToken(userResult.id, tokens.refreshToken);

    return {user: userResult, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.userModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async verifyUser(dto: LoginUserDto): Promise<VerifyUserResponse<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    const ifPasswordVerified = await user.verifyPassword(dto.password);

    if (ifPasswordVerified) {

      const tokens = this.tokenService.generateTokens({...dto, id: user.id, role: user.role});
      await this.tokenService.saveToken(user.id, tokens.refreshToken);

      return {user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
    }

    return null;
  }
}
