import { IsNotEmpty } from "class-validator";

export default class CreateFriendDto {
  @IsNotEmpty({ message: 'User is required' })
  public user!: string;
}
