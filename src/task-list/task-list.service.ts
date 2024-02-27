import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task/create-task.dto';
import { PrismaService } from '../database/prismaService';
import { UpdateTaskDto } from './dto/task/update-task.dto';
import { CreateTaskListDto } from './dto/task-list/create-task-list.dto';
import { UpdateTaskListDto } from './dto/task-list/update-task-list.dto';

@Injectable()
export class TaskListService {
  constructor(private readonly prisma: PrismaService) {}

  // Inicio Task List
  async createTaskList(data: CreateTaskListDto) {
    const cardId = Number(data.cardId);

    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId },
    });

    if (!cardExists) {
      return {
        messege: 'Card does not exist',
      };
    }

    await this.prisma.taskList.create({ data: data });

    return 'Task List created Successfuly';
  }

  async updateTaskList(id: number, data: UpdateTaskListDto) {
    const taskListId = Number(id);
    const cardId = Number(data.cardId);

    if (!taskListId || !cardId) {
      return {
        messege: 'Card or Task List not found',
      };
    }

    const taskListExists = await this.prisma.taskList.findFirst({
      where: { id: taskListId, cardId: cardId },
    });

    if (!taskListExists) {
      return {
        messege: 'Task List not found',
      };
    }

    await this.prisma.taskList.update({
      where: { id: taskListId },
      data: data,
    });

    return 'Task List updated Successfuly';
  }

  async getAllTaskList() {
    return await this.prisma.taskList.findMany();
  }

  async deleteTaskList(id: number, cardId: number) {
    const taskListId = Number(id);
    const cardUid = Number(cardId);

    if (!taskListId || !cardId) {
      return {
        messege: 'Card or Task List not found',
      };
    }

    const taskListExists = await this.prisma.taskList.findFirst({
      where: { id: taskListId, cardId: cardUid },
    });

    if (!taskListExists) {
      return {
        messege: 'task List not found',
      };
    }

    await this.prisma.taskList.delete({
      where: { id: taskListId },
    });

    return 'Task List deleted Successfuly';
  }
  // Fim Task List

  // Inicio Task
  async createTask(data: CreateTaskDto) {
    const taskListId = Number(data.taskListId);

    const taskListExists = await this.prisma.taskList.findFirst({
      where: { id: taskListId },
    });

    if (!taskListExists) {
      return {
        messege: 'task list does not exist',
      };
    }

    await this.prisma.task.create({ data: data });

    return 'Task created Successfuly';
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    const taskId = Number(id);
    const taskListId = Number(data.taskListId);

    if (!taskListId || !taskId) {
      return {
        messege: 'Task not found',
      };
    }

    const taskExists = await this.prisma.task.findFirst({
      where: { id: taskId, taskListId: taskListId },
    });

    if (!taskExists) {
      return {
        messege: 'task not found',
      };
    }

    await this.prisma.task.update({
      where: { id: taskId },
      data: data,
    });

    return 'Task updated Successfuly';
  }

  async getAllTasks() {
    return await this.prisma.task.findMany();
  }

  async deleteTask(id: number, taskListId: number) {
    const taskId = Number(id);
    const taskListUid = Number(taskListId);

    if (!taskListUid || !taskId) {
      return {
        messege: 'Task or task List not found',
      };
    }

    const taskExists = await this.prisma.task.findFirst({
      where: { id: taskId, taskListId: taskListUid },
    });

    if (!taskExists) {
      return {
        messege: 'Task or task List not found',
      };
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return 'Task deleted Successfuly';
  }
  // Fim task
}
