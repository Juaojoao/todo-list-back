import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';
import { UpdateActivitiesListDto } from './dto/update-activities-list.dto';

@Injectable()
export class ActivitiesListService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, frameId }: CreateActivitiesListDto) {
    const frameIdNumber = Number(frameId);

    if (!frameIdNumber) {
      return { message: 'Frame does exists' };
    }

    const FrameExists = await this.prisma.frame.findFirst({
      where: { id: frameIdNumber },
    });

    if (!FrameExists) {
      return { message: 'Frame does exists' };
    }

    await this.prisma.activitiesList.create({
      data: {
        name: name,
        frameId: frameIdNumber,
      },
    });

    return 'Activity List created Successfully';
  }

  async update(id: number, { name }: UpdateActivitiesListDto) {
    const activitiesId = Number(id);

    if (!activitiesId) {
      return { message: 'Frame or tasklist does exist' };
    }

    const taskListExists = await this.prisma.activitiesList.findFirst({
      where: { id: activitiesId },
    });

    if (!taskListExists) {
      return { message: 'Frame or tasklist does exist' };
    }

    await this.prisma.activitiesList.update({
      where: { id: activitiesId },
      data: { name },
    });

    return 'Activity List updated Successfully';
  }

  async getAll(frameId: number) {
    const frameIdNumber = Number(frameId);

    if (!frameIdNumber) return { message: 'Frame does not exist' };

    return await this.prisma.activitiesList.findMany({
      where: { frameId: frameIdNumber },
    });
  }

  async delete(id: number) {
    const taskListId = Number(id);

    if (!taskListId) {
      return { message: 'Frame or tasklist does exist' };
    }

    const taskListExists = await this.prisma.activitiesList.findFirst({
      where: { id: taskListId },
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
