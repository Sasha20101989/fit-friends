import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/common/app-component.enum.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import { MongoId } from '../../types/common/mongo-id.type.js';
import { UserEntity } from '../user/user.entity.js';
import { DEFAULT_FRIEND_COUNT } from './friend.const.js';
import { FriendQueryParams } from './types/friend-query-params.js';
import { getSortOptionsForCreatedAt } from '../../core/helpers/index.js';
import { FriendEntity } from './friend.entity.js';

@injectable()
export default class FriendService implements FriendServiceInterface {
  constructor(
    @inject(AppComponent.UserModel) private readonly userModel: ModelType<UserEntity>,
    @inject(AppComponent.FriendModel) private readonly friendModel: ModelType<FriendEntity>
  ){}

  public async delete(userId: MongoId, friendId: MongoId): Promise<void> {
    const userData = await this.findById(userId);

    if (userData) {
      const friendIndex = userData.friends.findIndex((userFriend) => userFriend._id.equals(friendId));

      if (friendIndex !== -1) {
        userData.friends.splice(friendIndex, 1);
        await userData.save();
      }
    }
  }

  public async findById(userId: MongoId): Promise<DocumentType<FriendEntity> | null> {
    return await this.friendModel.findOne({user: userId}).exec();
  }

  public async find(userId: MongoId, query: FriendQueryParams): Promise<DocumentType<UserEntity>[]> {
    const friendLimit = Math.min(query?.limit || DEFAULT_FRIEND_COUNT, DEFAULT_FRIEND_COUNT);
    const page = query?.page || 1;
    const skip = (page - 1) * friendLimit;
    const userData = await this.findById(userId);

    if (!userData) {
      return [];
    }

    const sort = getSortOptionsForCreatedAt(query.createdAtDirection);

    const friendIds = Object.values(userData.friends);
    const friends = await this.userModel
      .find({ _id: { $in: friendIds } })
      .sort(sort)
      .skip(skip)
      .limit(friendLimit)
      .exec();

    return friends;
  }

  public async exists(userId: MongoId, friendId: MongoId): Promise<boolean> {
    const userData = await this.findById(userId);
    const friend = await this.userModel.findOne({ _id: friendId});

    if (userData && friend) {
      return userData.friends.some((userFriend) => userFriend._id.equals(friend._id));
    }

    return false;
  }

  public async create(userId: MongoId, friendId: MongoId): Promise<DocumentType<FriendEntity> | null>{
    let userData = await this.findById(userId);
    let friendData = await this.findById(friendId);

    if (!userData) {
      const newUserData = await this.friendModel.create({ user: userId });
      await newUserData.save();
      userData = newUserData;
    }

    if (!friendData) {
      const newFriendData = await this.friendModel.create({ user: friendId });
      await newFriendData.save();
      friendData = newFriendData;
    }

    const user = await this.userModel.findOne({ _id: userId });
    const friend = await this.userModel.findOne({ _id: friendId});

    if (userData && friendData && user && friend) {
      userData.AddFriend(friend);
      await userData.save();

      friendData.AddFriend(user);
      await friendData.save();
    }

    return userData.populate('friends');
  }
}
