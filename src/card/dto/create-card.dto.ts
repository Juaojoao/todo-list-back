import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CardEntity } from '../entities/card.entity';

export class CreateCardDto extends CardEntity {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  activitiesListId: number;
}
