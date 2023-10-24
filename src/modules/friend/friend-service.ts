import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';

import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { FriendServiceInterface } from './friend-service.interface.js';
import { FriendEntity } from './friend.entity.js';
import CreateFriendDto from './dto/create-friend.dto.js';

@injectable()
export default class FriendService implements FriendServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.FriendModel) private readonly friendModel: ModelType<FriendEntity>
    ){}

  public async exists(documentId: string): Promise<boolean> {
    return this.friendModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async create(dto: CreateFriendDto): Promise<DocumentType<FriendEntity>> {
    const friend = await this.friendModel.create(dto);

    this.logger.info(`New friend created: ${friend.user}`);
    return friend;
  }
}
