
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

import { Notify } from '../../types/notify.type.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface NotifyEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'notify'
  },
  options: {
    allowMixed: 0
  }
})

export class NotifyEntity extends defaultClasses.TimeStamps implements Notify {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, ref: BalanceEntity })
  public balance!: Ref<BalanceEntity[]>;

  constructor(notifyData: CreateNotifyDto) {
    super();

    this.name = notifyData.name;
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

export const NotifyModel = getModelForClass(NotifyEntity);
