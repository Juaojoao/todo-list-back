import { IsNumber, IsString } from 'class-validator';
import { FrameEntity } from '../entities/frame.entity';

export class CreateFrameDto extends FrameEntity {
  @IsString()
  name: string;

  @IsNumber()
  userId: number;
}
