import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/common/app-component.enum.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { UserEntity } from '../user/user.entity.js';
import { DEFAULT_FRIEND_COUNT } from './friend.const.js';
import { FriendQueryParams } from './types/friend-query-params.js';
import { getSortOptionsForCreatedAt } from '../../core/helpers/index.js';

@injectable()
export default class FriendService implements FriendServiceInterface {
  constructor(
    @inject(AppComponent.UserModel) private readonly userModel: ModelType<UserEntity>
  ){}

  public async delete(userId: MongoId, friendId: MongoId): Promise<void> {
    const user = await this.findById(userId);
    if (user) {
      const friendIndex = user.friends.indexOf(friendId);

      if (friendIndex !== -1) {
        user.friends.splice(friendIndex, 1);
        await user.save();
      }
    }
  }

  public async findById(userId: MongoId): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findById(userId).exec();
  }

  public async find(userId: MongoId, query: FriendQueryParams): Promise<DocumentType<UserEntity>[]> {
    const friendLimit = Math.min(query?.limit || DEFAULT_FRIEND_COUNT, DEFAULT_FRIEND_COUNT);
    const page = query?.page || 1;
    const skip = (page - 1) * friendLimit;
    const user = await this.findById(userId);

    if (!user) {
      return [];
    }

    const sort = getSortOptionsForCreatedAt(query.sortDirection);

    const friendIds = user.friends;
    const friends = await this.userModel
      .find({ _id: { $in: friendIds } })
      .sort(sort)
      .skip(skip)
      .limit(friendLimit)
      .exec();

    return friends;
  }

  public async exists(userId: MongoId, friendId: MongoId): Promise<boolean> {
    const user = await this.findById(userId);
    return user !== null && user.friends.includes(friendId);
  }

  public async create(userId: MongoId, friendId: MongoId): Promise<DocumentType<UserEntity> | null>{
    const user = await this.findById(userId);

    if (user) {
      user.AddFriend(friendId);
      await user.save();
    }

    return user;
  }
}
