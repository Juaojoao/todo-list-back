import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FrameEntity } from '../entities/frame.entity';

export class CreateFrameDto extends FrameEntity {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  userId: number;
}
