import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../database/prismaService';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCardDto) {
    const activityListId = Number(data.activitiesListId);

    if (!activityListId) {
      return { message: 'Activity List does not exist' };
    }

    const activityListExists = await this.prisma.activitiesList.findFirst({
      where: { id: activityListId },
    });

    if (!activityListExists) {
      return { message: 'Activity List does not exist' };
    }

    await this.prisma.card.create({ data: data });

    return 'Card created successfully';
  }

  async update(id: number, data: UpdateCardDto) {
    const cardId = Number(id);
    const activitiesListId = Number(data.activitiesListId);

    if (!cardId || !activitiesListId) {
      return { message: 'Activity List does not exist' };
    }
    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId, activitiesListId: activitiesListId },
    });

    if (!cardExists) {
      return { message: 'Activity List does not exist' };
    }

    await this.prisma.card.update({
      where: { id: cardId },
      data: data,
    });

    return 'Card updated successfully';
  }

  async getAll() {
    return await this.prisma.card.findMany({ include: { tasklist: true } });
  }

  async delete(id: number, activitiesId: number) {
    const cardId = Number(id);
    const activitiesListId = Number(activitiesId);

    if (!cardId || !activitiesListId) {
      return { message: 'Activity List does not exist' };
    }

    const cardExists = await this.prisma.card.findFirst({
      where: { id: cardId, activitiesListId: activitiesListId },
    });

    if (!cardExists) {
      return { message: 'Activity List does not exist' };
    }

    try {
      await this.prisma.$transaction([
        this.prisma.task.deleteMany({
          where: { TaskList: { cardId: cardId } },
        }),
        this.prisma.taskList.deleteMany({ where: { cardId: cardId } }),
        this.prisma.card.delete({ where: { id: cardId } }),
      ]);
      return 'Card deleted successfully';
    } catch (error) {
      return { message: 'Error deleting card' };
    }
  }
}
