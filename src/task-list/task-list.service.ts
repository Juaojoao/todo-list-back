import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task/create-task.dto';
import { PrismaService } from 'src/database/prismaService';
import { UpdateTaskDto } from './dto/task/update-task.dto';

@Injectable()
export class TaskListService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    return await this.prisma.task.create({ data: data });
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    const taskId = Number(id);

    const taskExists = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!taskExists) {
      return {
        messege: 'task not found',
      };
    }

    return await this.prisma.task.update({
      where: { id: taskId },
      data: data,
    });
  }

  async getAllTasks() {
    return await this.prisma.task.findMany();
  }

  async deleteTask(id: number) {
    const taskId = Number(id);

    const taskExists = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!taskExists) {
      return {
        messege: 'task not found',
      };
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return { messege: 'Task deleted Successfuly' };
  }
}
