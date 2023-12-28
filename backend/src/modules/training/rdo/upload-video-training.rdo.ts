import { Expose } from 'class-transformer';

export class UploadTrainingVideoRdo {
  @Expose()
  public video!: string;
}
