import { IsNotEmpty } from "class-validator";

export default class CreateFriendDto {
  @IsNotEmpty({ message: 'Friend Id is required' })
  public friendId!: string;
}
