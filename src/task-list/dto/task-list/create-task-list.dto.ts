import { IsNumber, IsString, IsOptional } from 'class-validator';
import { CreateTaskListEntity } from '../../../task-list/entities/task-list.entity';

export class CreateTaskListDto extends CreateTaskListEntity {
  @IsString()
  name: string;

  @IsNumber()
  cardId: number;
}
