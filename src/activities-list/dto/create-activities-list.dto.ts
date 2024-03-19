import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ActivitiesListEntity } from '../entities/activities-list.entity';

export class CreateActivitiesListDto extends ActivitiesListEntity {
  @IsString()
  name: string;
}
