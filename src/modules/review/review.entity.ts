
import typegoose, { Ref, defaultClasses } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

import { Review } from '../../types/review.type.js';

const { prop, modelOptions, getModelForClass } = typegoose;

export interface ReviewEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'review'
  },
  options: {
    allowMixed: 0
  }
})

export class ReviewEntity extends defaultClasses.TimeStamps implements Review {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, ref: BalanceEntity })
  public balance!: Ref<BalanceEntity[]>;

  constructor(reviewData: CreateReviewDto) {
    super();

    this.name = reviewData.name;
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

export const ReviewModel = getModelForClass(ReviewEntity);
