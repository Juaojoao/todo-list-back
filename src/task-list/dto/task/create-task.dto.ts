import { IsNumber, IsString } from 'class-validator';
import { CreateTaskEntity } from '../../../task-list/entities/task.entity';

export class CreateTaskDto extends CreateTaskEntity {
  @IsString()
  name: string;

  @IsNumber()
  taskListId: number;
}
