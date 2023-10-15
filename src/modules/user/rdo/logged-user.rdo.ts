import { Expose } from 'class-transformer';

export default class LoggedUserRdo {
  @Expose()
  public accessToken!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;
}
