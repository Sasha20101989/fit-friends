import { Expose } from 'class-transformer';

export default class AccessTokenRdo {
  @Expose()
  public accessToken!: string;
}
