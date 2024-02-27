import { IsNumber, IsString, IsOptional } from 'class-validator';
import { CreateTaskListEntity } from '../../../task-list/entities/task-list.entity';

export class CreateTaskListDto extends CreateTaskListEntity {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  cardId: number;
}
