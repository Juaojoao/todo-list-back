import { TodoList } from 'src/todolist/entities/todolist.entity';
import {
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoList extends TodoList {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  authorId: number;
}
