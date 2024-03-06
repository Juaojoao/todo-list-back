import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { CreateFrameDto } from './dto/create-frame.dto';

@Injectable()
export class FrameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFrameDto) {
    const userId = Number(data.userId);
    if (!userId) {
      return { message: 'User does not exist' };
    }

    const userExists = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!userExists) {
      return { message: 'User does not exist' };
    }
    await this.prisma.frame.create({
      data: {
        ...data,
        userId: data.userId,
      },
    });

    return 'Frame created successfully';
  }

  async findAll() {
    return await this.prisma.frame.findMany({
      include: { activitiesList: true },
    });
  }

  async findByOwnerId(userId: number) {
    const user = Number(userId);

    if (!user) {
      return { message: 'User does not exist' };
    }

    return await this.prisma.frame.findMany({
      where: { userId: user },
      include: { activitiesList: true },
    });
  }

  async update(id: number, data: CreateFrameDto) {
    const frameId = Number(id);
    const userId = Number(data.userId);

    if (!userId || !frameId) {
      return { message: 'User or Frame does not exist' };
    }

    const frameExists = await this.prisma.frame.findFirst({
      where: { id: frameId },
    });

    if (!frameExists) {
      return { message: 'User or Frame does not exist' };
    }

    await this.prisma.frame.update({
      where: { id: frameId },
      data: {
        name: data.name,
        userId: userId,
      },
    });

    return 'Frame updated successfully';
  }

  async delete(id: number, userId: number) {
    const frameId = Number(id);
    const frameUserId = Number(userId);

    if (!frameId || !frameUserId) {
      return { message: 'User or Frame does not exist' };
    }
    const frameExists = await this.prisma.frame.findFirst({
      where: { id: frameId, userId: frameUserId },
    });

    if (!frameExists) {
      return { message: 'User or Frame does not exist' };
    }

    try {
      await this.prisma.$transaction([
        this.prisma.task.deleteMany({
          where: {
            TaskList: { Card: { ActivitiesList: { frameId: frameId } } },
          },
        }),

        this.prisma.taskList.deleteMany({
          where: { Card: { ActivitiesList: { frameId: frameId } } },
        }),

        this.prisma.card.deleteMany({
          where: { ActivitiesList: { frameId: frameId } },
        }),

        this.prisma.activitiesList.deleteMany({
          where: { frameId: frameId },
        }),

        this.prisma.frame.delete({
          where: { id: frameId },
        }),
      ]);
    } catch (error) {
      return { message: 'Frame not deleted' };
    }
  }
}
