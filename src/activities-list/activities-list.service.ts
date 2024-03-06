import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';
import { UpdateActivitiesListDto } from './dto/update-activities-list.dto';

@Injectable()
export class ActivitiesListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateActivitiesListDto) {
    const FrameExists = await this.prisma.frame.findFirst({
      where: { id: data.frameId },
    });

    if (!FrameExists) {
      return { message: 'Frame does exists' };
    }

    await this.prisma.activitiesList.create({
      data: {
        name: data.name,
        frameId: data.frameId,
      },
    });

    return 'Activity List created Successfully';
  }

  async update(id: number, data: UpdateActivitiesListDto) {
    const activitiesId = Number(id);
    const frameId = Number(data.frameId);

    if (!frameId || !activitiesId) {
      return { message: 'Frame or tasklist does exist' };
    }

    const taskListExists = await this.prisma.activitiesList.findFirst({
      where: { id: activitiesId, frameId: frameId },
    });

    if (!taskListExists) {
      return { message: 'Frame or tasklist does exist' };
    }

    await this.prisma.activitiesList.update({
      where: { id: activitiesId },
      data: {
        name: data.name,
        frameId: frameId,
      },
    });

    return 'Activity List updated Successfully';
  }

  async getAll() {
    return await this.prisma.activitiesList.findMany();
  }

  async delete(id: number, frameId: number) {
    const taskListId = Number(id);
    const frameUid = Number(frameId);

    if (!frameUid || !taskListId) {
      return { message: 'Frame or tasklist does exist' };
    }

    const taskListExists = await this.prisma.activitiesList.findFirst({
      where: { id: taskListId, frameId: frameUid },
    });

    if (!taskListExists) {
      return { message: 'Frame or tasklist does exist' };
    }

    try {
      await this.prisma.$transaction([
        this.prisma.card.deleteMany({
          where: { activitiesListId: taskListId },
        }),

        this.prisma.taskList.deleteMany({
          where: { Card: { ActivitiesList: { id: taskListId } } },
        }),

        this.prisma.task.deleteMany({
          where: { TaskList: { Card: { ActivitiesList: { id: taskListId } } } },
        }),

        this.prisma.activitiesList.delete({ where: { id: taskListId } }),
      ]);

      return 'Activity List deleted successfully';
    } catch (error) {
      console.error('Error deleting activity list:', error);
      return { message: 'Error deleting activity list' };
    }
  }
}
