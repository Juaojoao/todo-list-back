import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTaskEntity } from '../../../task-list/entities/task.entity';

export class CreateTaskDto extends CreateTaskEntity {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsNumber()
  taskListId: number;
}
