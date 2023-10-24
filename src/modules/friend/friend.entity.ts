import typegoose, {  defaultClasses } from '@typegoose/typegoose';

const { prop, modelOptions, getModelForClass } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'friends'
  }
})

export class FriendEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  user!: string;
}

export const FriendModel = getModelForClass(FriendEntity);
