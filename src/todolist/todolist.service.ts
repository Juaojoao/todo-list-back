import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { CreateTodoList } from './dto/create-todolist.dto';
import { CheckList } from './entities/checklist.entity';

@Injectable()
export class TodolistService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodoList(data: CreateTodoList) {
    const todoList = await this.prisma.post.create({
      data: data,
    });

    return todoList;
  }

  async createChecklistItem(data: CheckList) {
    const newItem = await this.prisma.checklist.create({
      data: data,
    });

    return newItem;
  }

  async findTodoListById(taskId: number) {
    const taskAlreadyExists = await this.prisma.post.findFirst({
      where: {
        id: Number(taskId),
      },
    });

    if (!taskAlreadyExists) {
      throw new Error('Task not found');
    }

    const todoList = await this.prisma.post.findFirst({
      where: {
        id: Number(taskId),
      },
      include: {
        checklist: true,
      },
    });

    return todoList;
  }

  async updateTodoList(taskId: number, data: CreateTodoList) {
    const taskAlreadyExists = await this.prisma.post.findFirst({
      where: {
        id: Number(taskId),
      },
    });

    if (!taskAlreadyExists) {
      throw new Error('Task not found');
    }

    const todoList = await this.prisma.post.update({
      where: {
        id: Number(taskId),
      },
      data: data,
    });

    return todoList;
  }

  async updatecheckListItem(taskId: number, itemId, data: CheckList) {
    const taskAlreadyExists = await this.prisma.post.findFirst({
      where: {
        id: Number(taskId),
      },
    });

    const itemAlreadyExists = await this.prisma.checklist.findFirst({
      where: {
        id: Number(itemId),
      },
    });

    if (!taskAlreadyExists || !itemAlreadyExists) {
      throw new Error('Task or item not found');
    }

    const checkList = await this.prisma.post.update({
      where: {
        id: Number(taskId),
      },
      data: {
        checklist: {
          update: [
            {
              where: {
                id: Number(itemId),
              },
              data: data,
            },
          ],
        },
      },
      include: {
        checklist: true,
      },
    });

    return checkList;
  }

  async archiveTask(taskId: number) {
    const taskAlreadyExists = await this.prisma.post.findFirst({
      where: {
        id: Number(taskId),
      },
    });

    if (!taskAlreadyExists) {
      throw new Error('Task not found');
    }

    const archivedTask = await this.prisma.post.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: true,
      },
    });

    return archivedTask;
  }

  async deleteChecklistItem(taskId: number, itemId: number) {
    const taskAlreadyExists = await this.prisma.post.findFirst({
      where: {
        id: Number(taskId),
      },
    });

    const itemAlreadyExists = await this.prisma.checklist.findFirst({
      where: {
        id: Number(itemId),
      },
    });

    if (!taskAlreadyExists || !itemAlreadyExists) {
      throw new Error('Task or item not found');
    }

    await this.prisma.checklist.delete({
      where: {
        id: Number(itemId),
        taskId: Number(taskId),
      },
    });

    return 'Item deleted successfully';
  }
}
