import { Card as PrismaCard } from '@prisma/client';
export class CardEntity implements PrismaCard {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  activitiesListId: number;
}
