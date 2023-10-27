
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

import { Notification } from '../../types/notification.type.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface NotificationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'notification'
  },
  options: {
    allowMixed: 0
  }
})

export class NotificationEntity extends defaultClasses.TimeStamps implements Notification {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, ref: BalanceEntity })
  public balance!: Ref<BalanceEntity[]>;

  constructor(notificationData: CreateNotificationDto) {
    super();

    this.name = notificationData.name;
  }

  public async setPassword(password: string, _saltRounds: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
  }

  public getPassword() {
    return this.password;
  }

  public async verifyPassword(password: string) {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    }
    return false;
  }

  public AddFriend(friendId: string) {
    if (!this.friends.includes(friendId)) {
      this.friends.push(friendId);
    }
  }
}

export const NotificationModel = getModelForClass(NotificationEntity);
