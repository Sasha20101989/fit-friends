import { DocumentType } from "@typegoose/typegoose";
import CreateFriendDto from "./dto/create-friend.dto.js";
import { FriendEntity } from "./friend.entity.js";

export interface FriendServiceInterface{
  exists(documentId: string): Promise<boolean>;
  create(dto: CreateFriendDto): Promise<DocumentType<FriendEntity>>;
}
