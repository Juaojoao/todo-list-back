import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CardEntity } from '../entities/card.entity';

export class CreateCardDto extends CardEntity {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  activitiesListId: number;
}
