import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { Public } from 'src/auth/decorators/is-public.decorator';
import { CreateTaskDto } from './dto/task/create-task.dto';

@Controller('tasklist')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Public()
  @Post('/task')
  async createTask(@Body() data: CreateTaskDto) {
    return await this.taskListService.createTask(data);
  }

  @Public()
  @Patch('/task/:id')
  async updateTask(@Param('id') id: number, @Body() data: CreateTaskDto) {
    return await this.taskListService.updateTask(id, data);
  }

  @Public()
  @Get('/task')
  async getAllTasks() {
    return await this.taskListService.getAllTasks();
  }

  @Public()
  @Delete('/task/:id')
  async deleteTaskById(@Param('id') id: number) {
    return await this.taskListService.deleteTask(id);
  }
}
