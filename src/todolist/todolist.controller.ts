import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodoList } from './dto/create-todolist.dto';
import { CheckList } from './entities/checklist.entity';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  // Task

  @Post('/task/create/post')
  async create(@Body() data: CreateTodoList) {
    return this.todolistService.createTodoList(data);
  }

  @Get('/task/find/:taskId')
  async find(@Param('taskId') taskId: number) {
    return this.todolistService.findTodoListById(taskId);
  }

  @Put('/task/update/post/:taskId')
  async update(@Param('taskId') taskId: number, @Body() data: CreateTodoList) {
    return this.todolistService.updateTodoList(taskId, data);
  }

  @Patch('/task/archive/:taskId')
  async archiveTask(@Param('taskId') taskId: number) {
    return this.todolistService.archiveTask(taskId);
  }

  // CheckList

  @Post('/create/checklist')
  async createCheckList(@Body() data: CheckList) {
    return this.todolistService.createChecklistItem(data);
  }

  @Put('/checklist/update/:taskId/:itemId')
  async updateCheckList(
    @Param('taskId') taskId: number,
    @Param('itemId') itemId: number,
    @Body() data: CheckList,
  ) {
    return this.todolistService.updatecheckListItem(taskId, itemId, data);
  }

  @Delete('/checklist/delete/:taskId/:itemId')
  async deleteChecklistItem(
    @Param('taskId') taskId: number,
    @Param('itemId') itemId: number,
  ) {
    return this.todolistService.deleteChecklistItem(taskId, itemId);
  }
}
