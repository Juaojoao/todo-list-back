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
import { CreateTaskDto } from './dto/task/create-task.dto';
import { CreateTaskListDto } from './dto/task-list/create-task-list.dto';
import { UpdateTaskListDto } from './dto/task-list/update-task-list.dto';

@Controller('tasklist')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  // Inicio TaskList
  @Post('/create')
  async create(@Body() data: CreateTaskListDto) {
    return await this.taskListService.createTaskList(data);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: UpdateTaskListDto) {
    return await this.taskListService.updateTaskList(id, data);
  }

  @Get('/get')
  async getAll() {
    return await this.taskListService.getAllTaskList();
  }

  @Delete('/delete/:id/:cardId')
  async delete(@Param('id') id: number, @Param('cardId') cardId: number) {
    return await this.taskListService.deleteTaskList(id, cardId);
  }
  // Fim TaskList

  // Inicio Task
  @Post('/task/create')
  async createTask(@Body() data: CreateTaskDto) {
    return await this.taskListService.createTask(data);
  }

  @Patch('/task/update/:id')
  async updateTask(@Param('id') id: number, @Body() data: CreateTaskDto) {
    return await this.taskListService.updateTask(id, data);
  }

  @Get('/task/get')
  async getAllTasks() {
    return await this.taskListService.getAllTasks();
  }

  @Delete('/task/delete/:id/:tasklistId')
  async deleteTaskById(
    @Param('id') id: number,
    @Param('tasklistId') tasklistId: number,
  ) {
    return await this.taskListService.deleteTask(id, tasklistId);
  }
  // Fim Task
}
