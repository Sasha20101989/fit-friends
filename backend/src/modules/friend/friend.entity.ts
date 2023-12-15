import typegoose, { DocumentType, Ref, defaultClasses } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface FriendEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'friends'
  },
  options: {
    allowMixed: 0
  }
})

export class FriendEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public user!: Ref<UserEntity>;

  @prop({ required: true, ref: UserEntity })
  public friends!: Ref<UserEntity>[];

  public AddFriend(newFriend: DocumentType<UserEntity>) {
    const isNewFriendInList = this.friends.some((friend) => friend._id.equals(newFriend._id));

    if (!isNewFriendInList) {
      this.friends.push(newFriend);
    }
  }
}

export const FriendModel = getModelForClass(FriendEntity);
