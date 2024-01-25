import { IsNumber, IsString, IsDate } from 'class-validator';
import { CreateTaskListEntity } from 'src/task-list/entities/task-list.entity';

export class CreateTaskListDto extends CreateTaskListEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  cardId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
