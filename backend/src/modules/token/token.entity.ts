import typegoose, { defaultClasses, prop } from '@typegoose/typegoose';

const { modelOptions, getModelForClass } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'tokens'
  }
})

export class TokenEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public user: string;

  @prop({ required: true })
  public refreshToken: string;

  constructor(userId: string, refreshToken: string){
    super();
    this.user = userId;
    this.refreshToken = refreshToken;
  }
}

export const TokenModel = getModelForClass(TokenEntity);
